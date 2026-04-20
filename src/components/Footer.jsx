import { Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import QuadLogo from './QuadLogo';
import { SITE, whatsappUrl } from '../config/site';

function TikTokIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.79 1.53V6.77a4.85 4.85 0 0 1-1.02-.08z" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useLang();

  const navLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.offers, sectionId: '#offers' },
    { label: t.nav.gallery, sectionId: '#gallery' },
    { label: t.nav.bookNow, sectionId: '#booking' },
  ];

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const socials = [
    SITE.social.instagram && {
      href: SITE.social.instagram,
      icon: Instagram,
      label: 'Instagram',
      style: 'hover:text-pink-400 hover:border-pink-400/40 hover:shadow-pink-500/20',
    },
    SITE.social.tiktok && {
      href: SITE.social.tiktok,
      icon: TikTokIcon,
      label: 'TikTok',
      style: 'hover:text-[#69C9D0] hover:border-[#69C9D0]/40 hover:shadow-[#69C9D0]/20',
    },
    {
      href: whatsappUrl(),
      icon: null,
      label: 'WhatsApp',
      style: 'hover:text-green-400 hover:border-green-400/40 hover:shadow-green-500/20',
      customIcon: (
        <svg viewBox="0 0 32 32" fill="currentColor" width="18" height="18">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.47.67 4.78 1.84 6.77L2 30l7.44-1.82A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm6.36 19.33c-.35-.17-2.07-1.02-2.39-1.13-.32-.12-.55-.17-.78.17-.23.35-.9 1.13-1.1 1.37-.2.23-.4.26-.74.09-.35-.17-1.47-.54-2.8-1.73-1.04-.93-1.74-2.07-1.94-2.42-.2-.35-.02-.54.15-.71.15-.15.35-.4.52-.6.17-.2.23-.35.35-.58.12-.23.06-.43-.03-.6-.09-.17-.78-1.88-1.07-2.58-.28-.68-.57-.59-.78-.6h-.66c-.23 0-.6.09-.92.43-.32.35-1.2 1.17-1.2 2.86 0 1.68 1.23 3.31 1.4 3.54.17.23 2.42 3.7 5.87 5.19.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.13.66-.1 2.03-.83 2.32-1.63.29-.8.29-1.49.2-1.63-.09-.14-.32-.23-.66-.4z" />
        </svg>
      ),
    },
    SITE.social.facebook && {
      href: SITE.social.facebook,
      icon: Facebook,
      label: 'Facebook',
      style: 'hover:text-blue-400 hover:border-blue-400/40 hover:shadow-blue-500/20',
    },
  ].filter(Boolean);

  return (
    <footer className="bg-dark2 border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <QuadLogo size={38} />
              <div className="flex flex-col leading-none">
                <span className="font-display text-2xl text-textLight tracking-wider">
                  Go<span className="text-primary">Quad</span>
                </span>
                <span className="font-condensed text-[9px] uppercase tracking-[0.25em] text-textLight/40 mt-0.5">Tetouan</span>
              </div>
            </div>
            <p className="font-body text-sm text-textLight/50 leading-relaxed max-w-xs mb-5">
              {t.footer.tagline}
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 font-body text-sm text-textLight/50">
                <MapPin size={13} className="text-primary flex-shrink-0" />
                {SITE.address}
              </div>
              <div className="flex items-center gap-2 font-body text-sm text-textLight/50">
                <Phone size={13} className="text-primary flex-shrink-0" />
                {SITE.phone}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-condensed font-bold text-sm uppercase tracking-widest text-textLight/40 mb-5">{t.footer.navigation}</h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.sectionId ? (
                    <button
                      onClick={() => scrollTo(link.sectionId)}
                      className="font-body text-sm text-textLight/60 hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-200" />
                      {link.label}
                    </button>
                  ) : (
                    <Link to={link.href} className="font-body text-sm text-textLight/60 hover:text-primary transition-colors flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-200" />
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-condensed font-bold text-sm uppercase tracking-widest text-textLight/40 mb-5">{t.footer.followUs}</h4>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    className={`w-10 h-10 rounded-xl bg-card border border-white/5 flex items-center justify-center text-textLight/50 transition-all duration-200 shadow-lg ${s.style}`}
                    aria-label={s.label}
                  >
                    {s.customIcon ?? <Icon size={18} />}
                  </motion.a>
                );
              })}
            </div>
            <p className="font-body text-xs text-textLight/30 mt-5 leading-relaxed">
              Suivez-nous pour voir nos dernières aventures et promotions.
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-textLight/30">
            {t.footer.copyright}
          </p>
          <p className="font-body text-xs text-textLight/30">
            {t.footer.madeWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
