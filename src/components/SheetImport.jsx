import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSpreadsheet, RefreshCw, CheckCircle, AlertCircle, X, Copy, ChevronDown, ChevronUp } from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const PREFILLED_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTMKD6c3wlb13x2T_me1HWr_C6kjaYb8C7ecrgn2pJC187CHGh_PEzYVu2g7jsSDWbt5Ol9P2qOKGdb/pubhtml';

const SHEETS = [
  {
    key: 'quads',
    label: 'quads_export — QUADS',
    color: '#FF5C00',
    gid: '0',
    columns: [
      { col: 'name', ex: 'Quad 250cc — Sport', req: true, desc: 'Nom du quad' },
      { col: 'engine', ex: '250cc', req: true, desc: 'Cylindrée moteur' },
      { col: 'transmission', ex: 'Manuel', req: false, desc: 'Manuel ou Automatique' },
      { col: 'seats', ex: '1', req: true, desc: 'Nombre de places' },
      { col: 'for_who', ex: 'Riders expérimentés', req: true, desc: 'Audience cible' },
      { col: 'price_per_hour', ex: '200', req: true, desc: 'Prix MAD (chiffre seul)' },
      { col: 'price_label', ex: '200 MAD/h', req: false, desc: 'Affichage prix (auto si vide)' },
      { col: 'tag', ex: 'Sport', req: true, desc: 'Badge: Junior, Populaire, Sport, Duo, Expert, Famille' },
      { col: 'tag_color', ex: '#FF8A00', req: false, desc: 'Couleur HEX (auto si vide)' },
      { col: 'image_url', ex: 'https://images.pexels.com/...', req: true, desc: 'URL complète de la photo' },
      { col: 'is_available', ex: 'true', req: false, desc: 'true ou false' },
      { col: 'sort_order', ex: '3', req: false, desc: "Ordre d'affichage" },
    ],
    example: 'Quad 250cc — Sport,250cc,Manuel,1,Riders expérimentés,200,200 MAD/h,Sport,#FF8A00,https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg,true,3',
  },
  {
    key: 'gallery',
    label: 'gallery_images_export — GALERIE',
    color: '#FF8A00',
    gid: '440387018',
    columns: [
      { col: 'image_url', ex: 'https://images.pexels.com/...', req: true, desc: 'URL complète de la photo' },
      { col: 'alt_text', ex: 'Quad dans le Rif', req: false, desc: 'Description alternative' },
      { col: 'tall', ex: 'true', req: false, desc: 'true = grande carte, false = petite' },
      { col: 'sort_order', ex: '1', req: false, desc: "Ordre d'affichage" },
      { col: 'is_active', ex: 'true', req: false, desc: 'true ou false' },
    ],
    example: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg,Quad Tetouan,true,1,true',
  },
  {
    key: 'hero',
    label: 'hero_slides_export — HERO',
    color: '#FFB800',
    gid: '2065955513',
    columns: [
      { col: 'image_url', ex: 'https://images.pexels.com/...?w=1600', req: true, desc: 'URL HD (largeur 1600px conseillée)' },
      { col: 'position', ex: 'center 40%', req: false, desc: 'Position CSS background: center 40%, top, bottom…' },
      { col: 'sort_order', ex: '1', req: false, desc: "Ordre des slides" },
      { col: 'is_active', ex: 'true', req: false, desc: 'true ou false' },
    ],
    example: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&w=1600,center 40%,1,true',
  },
  {
    key: 'offers',
    label: 'offers_export — OFFRES',
    color: '#FF5C00',
    gid: '1264719880',
    columns: [
      { col: 'title', ex: 'Aventure', req: true, desc: 'Nom du forfait' },
      { col: 'duration', ex: '2h', req: true, desc: 'Durée' },
      { col: 'description', ex: 'Trail complet avec guide', req: true, desc: 'Description courte' },
      { col: 'price', ex: '350 MAD', req: true, desc: 'Prix affiché' },
      { col: 'image_url', ex: 'https://images.pexels.com/...', req: true, desc: 'URL photo du forfait' },
      { col: 'is_popular', ex: 'true', req: false, desc: 'true = badge Populaire' },
      { col: 'sort_order', ex: '2', req: false, desc: "Ordre d'affichage" },
      { col: 'is_active', ex: 'true', req: false, desc: 'true ou false' },
    ],
    example: 'Aventure,2h,Trail complet avec guide,350 MAD,https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg,true,2,true',
  },
];

function SheetFormatCard({ sheet, copied, onCopy }) {
  const [open, setOpen] = useState(false);
  const headers = sheet.columns.map((c) => c.col).join(',');

  return (
    <div className="border border-white/5 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/3 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: sheet.color }} />
          <span className="font-condensed font-semibold text-sm text-textLight/70 uppercase tracking-wider">
            {sheet.label}
          </span>
        </div>
        {open ? <ChevronUp size={14} className="text-textLight/30" /> : <ChevronDown size={14} className="text-textLight/30" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/5 p-4 space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left font-condensed font-bold uppercase tracking-wider text-textLight/25 py-1.5 pr-3 whitespace-nowrap">Colonne</th>
                      <th className="text-left font-condensed font-bold uppercase tracking-wider text-textLight/25 py-1.5 pr-3">Requis</th>
                      <th className="text-left font-condensed font-bold uppercase tracking-wider text-textLight/25 py-1.5 pr-3 whitespace-nowrap">Exemple</th>
                      <th className="text-left font-condensed font-bold uppercase tracking-wider text-textLight/25 py-1.5">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sheet.columns.map((col) => (
                      <tr key={col.col} className="border-b border-white/3 hover:bg-white/2">
                        <td className="py-1.5 pr-3">
                          <code className="font-mono text-[10px] px-1.5 py-0.5 rounded" style={{ color: sheet.color, backgroundColor: `${sheet.color}15` }}>
                            {col.col}
                          </code>
                        </td>
                        <td className="py-1.5 pr-3">
                          <span className={`font-condensed font-semibold text-[10px] uppercase px-2 py-0.5 rounded-full ${col.req ? 'bg-primary/15 text-primary' : 'bg-white/5 text-textLight/30'}`}>
                            {col.req ? 'Oui' : 'Non'}
                          </span>
                        </td>
                        <td className="py-1.5 pr-3 text-textLight/40 font-mono text-[10px] whitespace-nowrap">{col.ex}</td>
                        <td className="py-1.5 text-textLight/35 text-[11px]">{col.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-dark/70 border border-white/5 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-condensed font-semibold text-[10px] uppercase tracking-widest text-textLight/30">En-têtes ligne 1</p>
                  <button
                    onClick={() => onCopy(sheet.key, headers + '\n' + sheet.example)}
                    className="flex items-center gap-1 font-condensed font-semibold text-[10px] uppercase tracking-wider transition-colors"
                    style={{ color: copied === sheet.key ? '#4ade80' : sheet.color }}
                  >
                    <Copy size={10} />
                    {copied === sheet.key ? 'Copié !' : 'Copier'}
                  </button>
                </div>
                <code className="font-mono text-[10px] text-textLight/40 break-all block leading-relaxed">{headers}</code>
                <p className="font-condensed font-semibold text-[10px] uppercase tracking-widest text-textLight/30 pt-1">Exemple ligne 2</p>
                <code className="font-mono text-[10px] text-textLight/40 break-all block leading-relaxed">{sheet.example}</code>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SheetImport({ onSuccess }) {
  const [open, setOpen] = useState(false);
  const [sheetUrl, setSheetUrl] = useState(PREFILLED_SHEET_URL);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showFormat, setShowFormat] = useState(false);
  const [copied, setCopied] = useState(null);

  const handleSync = async () => {
    if (!sheetUrl.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/sync-quads-from-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Apikey: SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          sheet_url: sheetUrl.trim(),
          sections: SHEETS.map((s) => ({ name: s.key, gid: s.gid })),
        }),
      });
      const data = await res.json();
      if (data.error) {
        setResult({ ok: false, message: data.error });
      } else {
        const counts = Object.entries(data.synced ?? {})
          .map(([k, v]) => `${v} ${k}`)
          .join(' · ');
        setResult({ ok: true, message: `Importé : ${counts}` });
        setTimeout(() => {
          setOpen(false);
          setResult(null);
          if (onSuccess) onSuccess();
        }, 2500);
      }
    } catch {
      setResult({ ok: false, message: 'Erreur réseau. Vérifiez votre connexion.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 font-condensed font-bold text-xs uppercase tracking-widest border border-primary/30 hover:border-primary hover:bg-primary/10 text-primary px-4 py-2 rounded-full transition-all duration-200"
      >
        <FileSpreadsheet size={14} />
        Importer Excel / Sheets
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            onClick={() => !loading && setOpen(false)}
          >
            <div className="absolute inset-0 bg-dark/95 backdrop-blur-lg" />
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.97 }}
              transition={{ type: 'spring', damping: 22, stiffness: 260 }}
              className="relative bg-card border border-white/8 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-card z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                    <FileSpreadsheet size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-condensed font-bold text-lg text-textLight">Importer depuis Google Sheets</h3>
                    <p className="font-body text-xs text-textLight/40">Quads · Galerie · Hero · Offres — tout en une fois</p>
                  </div>
                </div>
                <button
                  onClick={() => !loading && setOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-textLight/50 hover:text-textLight transition-all"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div className="bg-dark/50 border border-white/5 rounded-2xl p-4 space-y-3">
                  <p className="font-condensed font-semibold text-xs uppercase tracking-widest text-textLight/35">Comment préparer votre fichier</p>
                  {[
                    'Créez un Google Sheet avec 4 feuilles : Quads, Galerie, Hero, Offres (dans cet ordre)',
                    'Copiez les en-têtes exacts pour chaque feuille (voir "Format" ci-dessous)',
                    'Allez dans Fichier → Partager → Publier sur le Web → choisissez "Document entier" + CSV → Publier',
                    'Copiez le lien et collez-le ci-dessous',
                  ].map((text, n) => (
                    <div key={n} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="font-condensed font-bold text-xs text-primary">{n + 1}</span>
                      </div>
                      <p className="font-body text-sm text-textLight/55 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="font-condensed font-semibold text-xs uppercase tracking-widest text-textLight/50 block">
                    URL Google Sheets publiée
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={sheetUrl}
                      onChange={(e) => setSheetUrl(e.target.value)}
                      placeholder="https://docs.google.com/spreadsheets/d/e/..."
                      className="flex-1 bg-dark/60 border border-white/10 focus:border-primary/50 rounded-xl px-4 py-3 font-body text-sm text-textLight placeholder-textLight/20 outline-none transition-colors"
                    />
                    <button
                      onClick={handleSync}
                      disabled={loading || !sheetUrl.trim()}
                      className="flex items-center gap-2 font-condensed font-bold text-sm uppercase tracking-widest bg-primary hover:bg-hot disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl transition-all duration-200 whitespace-nowrap"
                    >
                      <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                      {loading ? 'Import...' : 'Synchroniser tout'}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`flex items-center gap-3 p-4 rounded-xl border ${
                        result.ok
                          ? 'bg-green-500/10 border-green-500/20 text-green-400'
                          : 'bg-red-500/10 border-red-500/20 text-red-400'
                      }`}
                    >
                      {result.ok ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                      <p className="font-body text-sm">{result.message}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-1">
                  <button
                    onClick={() => setShowFormat(!showFormat)}
                    className="w-full flex items-center justify-between p-4 border border-white/5 rounded-2xl hover:bg-white/3 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet size={14} className="text-primary" />
                      <span className="font-condensed font-semibold text-sm text-textLight/60 uppercase tracking-wider">
                        Format exact des 4 feuilles Excel
                      </span>
                    </div>
                    {showFormat ? <ChevronUp size={14} className="text-textLight/30" /> : <ChevronDown size={14} className="text-textLight/30" />}
                  </button>

                  <AnimatePresence>
                    {showFormat && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden space-y-2 pt-1"
                      >
                        {SHEETS.map((sheet) => (
                          <SheetFormatCard
                            key={sheet.key}
                            sheet={sheet}
                            copied={copied}
                            onCopy={handleCopy}
                          />
                        ))}

                        <div className="flex items-start gap-2 p-3 bg-amber-500/8 border border-amber-500/15 rounded-xl">
                          <AlertCircle size={13} className="text-amber-400 flex-shrink-0 mt-0.5" />
                          <p className="font-body text-xs text-amber-400/80 leading-relaxed">
                            La synchronisation <strong>remplace tout</strong> le contenu existant de chaque section. Vérifiez toutes vos lignes avant de synchroniser.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
