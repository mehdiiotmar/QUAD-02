import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Users, Settings, ArrowRight, ChevronLeft, ChevronRight, Check, X, ShoppingBag, Plus } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { fetchQuads } from '../lib/quadsService';
import SheetImport from './SheetImport';
import { useCart } from '../context/CartContext';

const FEATURES = [
  'Casque fourni',
  'Gilet de protection',
  'Briefing sécurité',
  'Guide expert',
  'Assurance incluse',
];

function QuadModal({ quad, onClose, bookThis }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const scrollToBooking = () => {
    onClose();
    setTimeout(() => {
      document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const handleAdd = () => {
    addItem(quad);
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-dark/90 backdrop-blur-md" />
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.96 }}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
        className="relative bg-card border border-white/8 rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-textLight/70 hover:text-textLight transition-all"
        >
          <X size={16} />
        </button>

        <div className="relative h-64 sm:h-72 overflow-hidden rounded-t-3xl sm:rounded-t-3xl">
          <img
            src={quad.image_url}
            alt={quad.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          <div
            className="absolute top-4 left-4 font-condensed font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full text-dark"
            style={{ backgroundColor: quad.tag_color }}
          >
            {quad.tag}
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="font-display text-4xl text-textLight">{quad.name}</h3>
            <p className="font-body text-textLight/60 text-sm mt-1">{quad.for_who}</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Zap, label: 'Moteur', value: quad.engine },
              { icon: Settings, label: 'Boite', value: quad.transmission },
              { icon: Users, label: 'Places', value: `${quad.seats}P` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-dark/60 border border-white/5 rounded-2xl p-4 text-center">
                <Icon size={18} className="text-primary mx-auto mb-2" />
                <p className="font-body text-xs text-textLight/40 uppercase tracking-wider mb-1">{label}</p>
                <p className="font-condensed font-bold text-lg text-textLight">{value}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="font-condensed font-semibold text-xs uppercase tracking-widest text-textLight/40 mb-3">
              Inclus avec ce quad
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check size={10} className="text-primary" />
                  </div>
                  <span className="font-body text-sm text-textLight/70">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <div>
              <p className="font-body text-xs text-textLight/40 uppercase tracking-wider">Prix par heure</p>
              <p className="font-display text-4xl text-primary">{quad.price_label}</p>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAdd}
                className={`flex items-center gap-2 font-condensed font-bold text-sm uppercase tracking-widest px-5 py-3.5 rounded-full transition-all duration-200 ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'border border-primary/30 text-primary hover:bg-primary/10'
                }`}
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1.5">
                      <Check size={14} /> Ajouté !
                    </motion.span>
                  ) : (
                    <motion.span key="add" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1.5">
                      <ShoppingBag size={14} /> Panier
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              <button
                onClick={scrollToBooking}
                className="font-condensed font-bold text-sm uppercase tracking-widest bg-primary hover:bg-hot text-white px-6 py-3.5 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 flex items-center gap-2"
              >
                {bookThis}
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function QuadCard({ quad, bookThis, onClick, index }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(quad);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="group relative bg-card border border-white/5 hover:border-primary/30 rounded-2xl overflow-hidden cursor-pointer flex flex-col transition-colors duration-300"
      style={{ minHeight: '420px' }}
    >
      <div className="relative h-56 overflow-hidden flex-shrink-0">
        <motion.img
          src={quad.image_url}
          alt={quad.name}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

        <motion.div
          className="absolute inset-0"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: `radial-gradient(circle at center, ${quad.tag_color}18 0%, transparent 70%)` }}
        />

        <div
          className="absolute top-3 left-3 font-condensed font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full text-dark"
          style={{ backgroundColor: quad.tag_color }}
        >
          {quad.tag}
        </div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="flex items-center gap-2 font-condensed font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full text-white backdrop-blur-sm"
            style={{ backgroundColor: `${quad.tag_color}cc` }}
          >
            Voir détails <ArrowRight size={12} />
          </div>
        </motion.div>

        <div className="absolute bottom-3 right-3">
          <span className="font-display text-2xl drop-shadow-lg" style={{ color: quad.tag_color }}>
            {quad.price_label}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-condensed font-bold text-xl text-textLight group-hover:text-primary transition-colors duration-200 leading-tight">
            {quad.name}
          </h3>
          <p className="font-body text-xs text-textLight/45 mt-1">{quad.for_who}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-auto">
          {[
            { icon: Zap, value: quad.engine },
            { icon: Settings, value: quad.transmission?.substring(0, 4) },
            { icon: Users, value: `${quad.seats}P` },
          ].map(({ icon: Icon, value }, i) => (
            <div key={i} className="flex flex-col items-center gap-1 bg-dark/50 group-hover:bg-dark/70 rounded-xl py-2.5 px-1.5 transition-colors duration-200">
              <Icon size={13} className="text-primary" />
              <span className="font-condensed font-bold text-xs text-textLight">{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-2 flex gap-2">
          <motion.button
            className="flex-1 flex items-center justify-center gap-1.5 font-condensed font-bold text-xs uppercase tracking-widest border border-primary/25 hover:bg-primary hover:border-primary text-primary hover:text-white py-2.5 rounded-xl transition-all duration-200"
            whileTap={{ scale: 0.97 }}
            onClick={(e) => { e.stopPropagation(); onClick(); }}
          >
            {bookThis}
            <ArrowRight size={12} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={handleAddToCart}
            className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-200 flex-shrink-0 ${
              added
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-white/10 text-textLight/50 hover:border-primary/50 hover:bg-primary/10 hover:text-primary'
            }`}
            title="Ajouter au panier"
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Check size={14} />
                </motion.div>
              ) : (
                <motion.div key="bag" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <ShoppingBag size={14} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const { t } = useLang();
  const [quads, setQuads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const scrollRef = useRef(null);

  const loadQuads = useCallback(() => {
    setLoading(true);
    const fallback = t.products.items.map((item, i) => ({
      id: i,
      name: item.name,
      engine: item.engine,
      transmission: item.type,
      seats: parseInt(item.seats),
      for_who: item.forWho,
      price_per_hour: 0,
      price_label: item.price,
      tag: item.tag,
      tag_color: item.color,
      image_url: item.image,
      is_available: true,
      sort_order: i,
    }));
    fetchQuads()
      .then(setQuads)
      .catch(() => setQuads(fallback))
      .finally(() => setLoading(false));
  }, [t]);

  useEffect(() => {
    loadQuads();
  }, [loadQuads]);

  const filters = [
    { key: 'all', label: 'Tous' },
    { key: 'solo', label: 'Solo' },
    { key: 'duo', label: 'Duo' },
    { key: 'famille', label: 'Famille' },
  ];

  const filtered = quads.filter((q) => {
    if (filter === 'all') return true;
    if (filter === 'solo') return q.seats === 1;
    if (filter === 'duo') return q.seats === 2;
    if (filter === 'famille') return q.seats >= 3;
    return true;
  });

  return (
    <section id="quads" className="py-24 md:py-32 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-primary/4 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-hot/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-condensed font-semibold text-xs uppercase tracking-[0.35em] text-primary block mb-2">
              {t.products.sectionTag}
            </span>
            <h2 className="font-display text-5xl md:text-7xl text-textLight leading-none">
              {t.products.sectionTitle}
            </h2>
            <p className="font-body text-textLight/55 mt-4 max-w-xl">
              {t.products.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center gap-2 flex-shrink-0"
          >
            <SheetImport onSuccess={loadQuads} />
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`font-condensed font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-200 ${
                  filter === f.key
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'border border-white/10 text-textLight/50 hover:border-white/20 hover:text-textLight/80'
                }`}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card border border-white/5 rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((quad, i) => (
                <QuadCard
                  key={quad.id ?? quad.name}
                  quad={quad}
                  bookThis={t.products.bookThis}
                  onClick={() => setSelected(quad)}
                  index={i}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 relative rounded-3xl overflow-hidden"
        >
          <div
            className="relative h-48 md:h-56 flex items-center px-8 md:px-14"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&w=1200)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 60%',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/70 to-transparent" />
            <div className="absolute inset-0 bg-primary/10" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
              <div>
                <p className="font-condensed font-semibold text-xs uppercase tracking-[0.3em] text-primary mb-1">
                  Location privée & groupes
                </p>
                <h3 className="font-display text-3xl md:text-4xl text-textLight">
                  Vous avez un groupe ?
                </h3>
                <p className="font-body text-sm text-textLight/60 mt-1 max-w-sm">
                  Tarifs spéciaux pour 5+ personnes. Parcours sur mesure, BBQ inclus.
                </p>
              </div>
              <button
                onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-condensed font-bold text-sm uppercase tracking-widest bg-primary hover:bg-hot text-white px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 flex-shrink-0 flex items-center gap-2"
              >
                Demander un Devis <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <QuadModal
            quad={selected}
            onClose={() => setSelected(null)}
            bookThis={t.products.bookThis}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
