const SHEET_PUB_ID = '2PACX-1vTMKD6c3wlb13x2T_me1HWr_C6kjaYb8C7ecrgn2pJC187CHGh_PEzYVu2g7jsSDWbt5Ol9P2qOKGdb';
const SHEET_BASE = `https://docs.google.com/spreadsheets/d/e/${SHEET_PUB_ID}/pub?output=csv`;

export const SHEET_GIDS = {
  quads: '0',
  offers: '1264719880',
  hero_slides: '2065955513',
  gallery_images: '440387018',
};

export const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTMKD6c3wlb13x2T_me1HWr_C6kjaYb8C7ecrgn2pJC187CHGh_PEzYVu2g7jsSDWbt5Ol9P2qOKGdb/pubhtml';

function parseCSV(raw) {
  const lines = raw.trim().split('\n').map((l) => l.replace(/\r/g, ''));
  if (lines.length < 2) return [];

  const parseRow = (line) => {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
        else inQuotes = !inQuotes;
      } else if (ch === ',' && !inQuotes) {
        result.push(cur.trim());
        cur = '';
      } else {
        cur += ch;
      }
    }
    result.push(cur.trim());
    return result;
  };

  const headers = parseRow(lines[0]).map((h) => h.toLowerCase().replace(/\s+/g, '_'));
  return lines.slice(1).filter((l) => l.trim()).map((line) => {
    const values = parseRow(line);
    const row = {};
    headers.forEach((h, i) => { row[h] = values[i] ?? ''; });
    return row;
  });
}

function parseBool(val, def = true) {
  if (!val) return def;
  const v = String(val).toLowerCase();
  return v !== 'false' && v !== '0' && v !== 'non' && v !== 'no';
}

const cache = {};
const CACHE_TTL = 5 * 60 * 1000;

export async function fetchSheetCSV(gid) {
  const cacheKey = gid;
  const now = Date.now();
  if (cache[cacheKey] && now - cache[cacheKey].ts < CACHE_TTL) {
    return cache[cacheKey].data;
  }

  const url = `${SHEET_BASE}&gid=${gid}`;
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Failed to fetch sheet (${res.status})`);
  const text = await res.text();
  const data = parseCSV(text);
  cache[cacheKey] = { data, ts: now };
  return data;
}

const TAG_COLOR_MAP = {
  junior: '#FFB800',
  populaire: '#FF5C00',
  sport: '#FF8A00',
  duo: '#FF5C00',
  expert: '#FF8A00',
  famille: '#FFB800',
};

export async function fetchQuadsFromSheet() {
  const rows = await fetchSheetCSV(SHEET_GIDS.quads);
  return rows
    .map((row, i) => {
      const tag = row.tag ?? 'Standard';
      const tagColor = (row.tag_color && row.tag_color.startsWith('#'))
        ? row.tag_color
        : TAG_COLOR_MAP[tag.toLowerCase()] ?? '#FF5C00';
      const price = parseInt(row.price_per_hour ?? row.price ?? '0') || 0;
      return {
        id: row.id || String(i),
        name: row.name ?? '',
        engine: row.engine ?? '',
        transmission: row.transmission || 'Manuel',
        seats: parseInt(row.seats ?? '1') || 1,
        for_who: row.for_who ?? '',
        price_per_hour: price,
        price_label: row.price_label || `${price} MAD/h`,
        tag,
        tag_color: tagColor,
        image_url: row.image_url ?? '',
        is_available: parseBool(row.is_available ?? 'true'),
        sort_order: parseInt(row.sort_order ?? String(i + 1)) || i + 1,
      };
    })
    .filter((q) => q.name && parseBool(String(q.is_available)))
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function fetchOffersFromSheet() {
  const rows = await fetchSheetCSV(SHEET_GIDS.offers);
  return rows
    .map((row, i) => ({
      id: row.id || String(i),
      title: row.title ?? '',
      duration: row.duration ?? '',
      description: row.description ?? '',
      price: row.price ?? '',
      image_url: row.image_url ?? '',
      is_popular: parseBool(row.is_popular ?? 'false', false),
      is_active: parseBool(row.is_active ?? 'true'),
      sort_order: parseInt(row.sort_order ?? String(i + 1)) || i + 1,
    }))
    .filter((o) => o.title && o.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function fetchHeroSlidesFromSheet() {
  const rows = await fetchSheetCSV(SHEET_GIDS.hero_slides);
  return rows
    .map((row, i) => ({
      id: row.id || String(i),
      image_url: row.image_url ?? '',
      position: row.position || 'center 40%',
      is_active: parseBool(row.is_active ?? 'true'),
      sort_order: parseInt(row.sort_order ?? String(i + 1)) || i + 1,
    }))
    .filter((s) => s.image_url && s.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function fetchGalleryImagesFromSheet() {
  const rows = await fetchSheetCSV(SHEET_GIDS.gallery_images);
  return rows
    .map((row, i) => ({
      id: row.id || String(i),
      image_url: row.image_url ?? '',
      alt_text: row.alt_text || 'GoQuad Tetouan',
      tall: parseBool(row.tall ?? 'false', false),
      is_active: parseBool(row.is_active ?? 'true'),
      sort_order: parseInt(row.sort_order ?? String(i + 1)) || i + 1,
    }))
    .filter((img) => img.image_url && img.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);
}
