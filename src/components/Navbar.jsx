import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ShoppingBag, Flame } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import QuadLogo from './QuadLogo';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const location = useLocation();
  const { lang, setLang, t, translations } = useLang();
  const { totalItems, setIsOpen: openCart } = useCart();
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setLangOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    setLangOpen(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.offers, href: '/#offers' },
    { label: t.nav.quads, href: '/#quads' },
    { label: t.nav.gallery, href: '/#gallery' },
  ];

  const langOptions = Object.entries(translations).map(([key, val]) => ({
    code: key, flag: val.flag, label: val.label,
  }));

  return (
    <motion.nav
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark/96 backdrop-blur-xl shadow-2xl shadow-black/60 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <QuadLogo size={38} />
            <div className="flex flex-col leading-none">
              <span className="font-display text-2xl md:text-3xl text-textLight tracking-wider leading-none">
                Go<span className="text-primary">Quad</span>
              </span>
              <span className="font-condensed text-[9px] uppercase tracking-[0.25em] text-textLight/40 leading-none mt-0.5">
                Tetouan
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              link.href.startsWith('/#') ? (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href.replace('/', ''))}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative font-condensed text-sm font-semibold uppercase tracking-widest text-textLight/70 hover:text-primary transition-colors duration-200 py-1"
                >
                  {link.label}
                  <motion.div
                    className="absolute -bottom-0.5 left-0 h-0.5 bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: hoveredLink === link.label ? '100%' : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative font-condensed text-sm font-semibold uppercase tracking-widest text-textLight/70 hover:text-primary transition-colors duration-200 py-1"
                >
                  {link.label}
                  <motion.div
                    className="absolute -bottom-0.5 left-0 h-0.5 bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: hoveredLink === link.label ? '100%' : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              )
            ))}

            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 font-condensed text-sm font-semibold uppercase tracking-widest text-textLight/70 hover:text-primary transition-colors duration-200 border border-white/10 hover:border-primary/50 px-3 py-1.5 rounded-full"
              >
                <span>{translations[lang].flag}</span>
                <span>{translations[lang].label}</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.93 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.93 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full mt-2 right-0 bg-card/98 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 min-w-[120px]"
                  >
                    {langOptions.map((opt) => (
                      <button
                        key={opt.code}
                        onClick={() => { setLang(opt.code); setLangOpen(false); }}
                        className={`w-full flex items-center gap-2 px-4 py-3 font-condensed text-sm font-semibold uppercase tracking-wider transition-colors duration-150 ${
                          lang === opt.code
                            ? 'bg-primary/20 text-primary'
                            : 'text-textLight/70 hover:bg-white/5 hover:text-textLight'
                        }`}
                      >
                        <span>{opt.flag}</span>
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              onClick={() => openCart(true)}
              className="relative p-2 text-textLight/60 hover:text-primary transition-colors"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Panier"
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-white font-condensed font-bold text-[10px] rounded-full flex items-center justify-center shadow-lg shadow-primary/50"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              onClick={() => scrollToSection('#booking')}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="relative font-condensed text-sm font-bold uppercase tracking-widest bg-primary text-white px-7 py-2.5 rounded-full overflow-hidden group"
              style={{ boxShadow: '0 0 24px rgba(255,92,0,0.4)' }}
            >
              <motion.span
                className="absolute inset-0 bg-hot opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative flex items-center gap-1.5">
                <Flame size={13} />
                {t.nav.bookNow}
              </span>
            </motion.button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 font-condensed text-xs font-semibold uppercase text-textLight/70 hover:text-primary border border-white/10 px-2.5 py-1.5 rounded-full transition-colors"
              >
                <span>{translations[lang].flag}</span>
                <span>{translations[lang].label}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-1 right-0 bg-card border border-white/10 rounded-xl overflow-hidden shadow-xl min-w-[100px] z-10"
                  >
                    {langOptions.map((opt) => (
                      <button
                        key={opt.code}
                        onClick={() => { setLang(opt.code); setLangOpen(false); }}
                        className={`w-full flex items-center gap-2 px-3 py-2.5 font-condensed text-sm font-semibold uppercase tracking-wider transition-colors ${
                          lang === opt.code ? 'bg-primary/20 text-primary' : 'text-textLight/70 hover:bg-white/5'
                        }`}
                      >
                        <span>{opt.flag}</span>
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              onClick={() => openCart(true)}
              className="relative p-2 text-textLight/60 hover:text-primary transition-colors"
              whileTap={{ scale: 0.88 }}
              aria-label="Panier"
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key="badge-mob"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-white font-condensed font-bold text-[10px] rounded-full flex items-center justify-center"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-textLight hover:text-primary transition-colors"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-dark/98 backdrop-blur-2xl border-t border-white/5"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                link.href.startsWith('/#') ? (
                  <motion.button
                    key={link.label}
                    onClick={() => scrollToSection(link.href.replace('/', ''))}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="font-condensed text-base font-semibold uppercase tracking-widest text-textLight/80 hover:text-primary py-3 text-left border-b border-white/5 transition-colors flex items-center justify-between group"
                  >
                    {link.label}
                    <span className="text-textLight/20 group-hover:text-primary transition-colors">›</span>
                  </motion.button>
                ) : (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className="block font-condensed text-base font-semibold uppercase tracking-widest text-textLight/80 hover:text-primary py-3 border-b border-white/5 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              ))}
              <motion.button
                onClick={() => scrollToSection('#booking')}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-3 font-condensed text-sm font-bold uppercase tracking-widest bg-primary text-white px-6 py-3.5 rounded-full transition-all duration-200 text-center flex items-center justify-center gap-2"
                style={{ boxShadow: '0 0 24px rgba(255,92,0,0.4)' }}
              >
                <Flame size={14} />
                {t.nav.bookNow}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
