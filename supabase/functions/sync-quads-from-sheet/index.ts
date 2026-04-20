import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const TAG_COLOR_MAP: Record<string, string> = {
  junior: "#FFB800",
  populaire: "#FF5C00",
  sport: "#FF8A00",
  duo: "#FF5C00",
  expert: "#FF8A00",
  famille: "#FFB800",
  default: "#FF5C00",
};

function resolveTagColor(tag: string, rawColor: string): string {
  if (rawColor && rawColor.startsWith("#")) return rawColor;
  return TAG_COLOR_MAP[tag.toLowerCase()] ?? TAG_COLOR_MAP.default;
}

function parseCSV(raw: string): Record<string, string>[] {
  const lines = raw.trim().split("\n").map((l) => l.replace(/\r/g, ""));
  if (lines.length < 2) return [];

  const parseRow = (line: string): string[] => {
    const result: string[] = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
        else inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        result.push(cur.trim());
        cur = "";
      } else {
        cur += ch;
      }
    }
    result.push(cur.trim());
    return result;
  };

  const headers = parseRow(lines[0]).map((h) => h.toLowerCase().replace(/\s+/g, "_"));
  return lines.slice(1).filter((l) => l.trim()).map((line) => {
    const values = parseRow(line);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => { row[h] = values[i] ?? ""; });
    return row;
  });
}

function csvUrl(baseUrl: string, gid: string): string {
  const docIdMatch = baseUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (docIdMatch) {
    return `https://docs.google.com/spreadsheets/d/${docIdMatch[1]}/export?format=csv&gid=${gid}`;
  }
  const pubIdMatch = baseUrl.match(/\/e\/([a-zA-Z0-9-_]+)/);
  if (pubIdMatch) {
    return `https://docs.google.com/spreadsheets/d/e/${pubIdMatch[1]}/pub?output=csv&gid=${gid}`;
  }
  throw new Error("Invalid Google Sheets URL");
}

function parseBool(val: string, def = true): boolean {
  if (!val) return def;
  const v = val.toLowerCase();
  return v !== "false" && v !== "0" && v !== "non" && v !== "no";
}

async function fetchCSV(url: string): Promise<Record<string, string>[]> {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`Failed to fetch CSV (${res.status}): ${url}`);
  const text = await res.text();
  return parseCSV(text);
}

async function syncQuads(supabase: ReturnType<typeof createClient>, baseUrl: string, gid: string) {
  const rows = await fetchCSV(csvUrl(baseUrl, gid));
  const quads = rows.map((row, i) => {
    const price = parseInt(row.price_per_hour ?? row.price ?? "0") || 0;
    const tag = row.tag ?? "Standard";
    return {
      name: row.name ?? "",
      engine: row.engine ?? "",
      transmission: row.transmission || "Manuel",
      seats: parseInt(row.seats ?? "1") || 1,
      for_who: row.for_who ?? "",
      price_per_hour: price,
      price_label: row.price_label || `${price} MAD/h`,
      tag,
      tag_color: resolveTagColor(tag, row.tag_color ?? ""),
      image_url: row.image_url ?? "",
      is_available: parseBool(row.is_available ?? "true"),
      sort_order: parseInt(row.sort_order ?? String(i + 1)) || i + 1,
    };
  }).filter((q) => q.name);

  await supabase.from("quads").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error } = await supabase.from("quads").insert(quads);
  if (error) throw error;
  return quads.length;
}

async function syncGallery(supabase: ReturnType<typeof createClient>, baseUrl: string, gid: string) {
  const rows = await fetchCSV(csvUrl(baseUrl, gid));
  const images = rows.map((row, i) => ({
    image_url: row.image_url ?? "",
    alt_text: row.alt_text || "GoQuad Tetouan",
    tall: parseBool(row.tall ?? "false", false),
    sort_order: parseInt(row.sort_order ?? String(i + 1)) || i + 1,
    is_active: parseBool(row.is_active ?? "true"),
  })).filter((r) => r.image_url);

  await supabase.from("gallery_images").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error } = await supabase.from("gallery_images").insert(images);
  if (error) throw error;
  return images.length;
}

async function syncHero(supabase: ReturnType<typeof createClient>, baseUrl: string, gid: string) {
  const rows = await fetchCSV(csvUrl(baseUrl, gid));
  const slides = rows.map((row, i) => ({
    image_url: row.image_url ?? "",
    position: row.position || "center 40%",
    sort_order: parseInt(row.sort_order ?? String(i + 1)) || i + 1,
    is_active: parseBool(row.is_active ?? "true"),
  })).filter((r) => r.image_url);

  await supabase.from("hero_slides").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error } = await supabase.from("hero_slides").insert(slides);
  if (error) throw error;
  return slides.length;
}

async function syncOffers(supabase: ReturnType<typeof createClient>, baseUrl: string, gid: string) {
  const rows = await fetchCSV(csvUrl(baseUrl, gid));
  const offersList = rows.map((row, i) => ({
    title: row.title ?? "",
    duration: row.duration ?? "",
    description: row.description ?? "",
    price: row.price ?? "",
    image_url: row.image_url ?? "",
    is_popular: parseBool(row.is_popular ?? "false", false),
    sort_order: parseInt(row.sort_order ?? String(i + 1)) || i + 1,
    is_active: parseBool(row.is_active ?? "true"),
  })).filter((o) => o.title);

  await supabase.from("offers").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error } = await supabase.from("offers").insert(offersList);
  if (error) throw error;
  return offersList.length;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { sheet_url, sections } = body;

    if (!sheet_url) {
      return new Response(
        JSON.stringify({ error: "sheet_url is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const toSync: Array<{ name: string; gid: string }> = sections ?? [
      { name: "quads", gid: "0" },
      { name: "offers", gid: "1264719880" },
      { name: "hero", gid: "2065955513" },
      { name: "gallery", gid: "440387018" },
    ];

    const results: Record<string, number> = {};

    for (const sec of toSync) {
      if (sec.name === "quads") results.quads = await syncQuads(supabase, sheet_url, sec.gid);
      else if (sec.name === "gallery") results.gallery = await syncGallery(supabase, sheet_url, sec.gid);
      else if (sec.name === "hero") results.hero = await syncHero(supabase, sheet_url, sec.gid);
      else if (sec.name === "offers") results.offers = await syncOffers(supabase, sheet_url, sec.gid);
    }

    return new Response(
      JSON.stringify({ success: true, synced: results }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
