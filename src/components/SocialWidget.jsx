import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Instagram } from 'lucide-react';
import { SITE } from '../config/site';

function TikTokIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.79 1.53V6.77a4.85 4.85 0 0 1-1.02-.08z" />
    </svg>
  );
}

const SOCIALS = [
  {
    key: 'instagram',
    href: SITE.social.instagram,
    label: SITE.handles.instagram,
    sublabel: 'Suivez nos aventures',
    bg: 'from-[#f09433] via-[#e6683c] to-[#dc2743]',
    icon: Instagram,
    glow: '#e6683c',
  },
  {
    key: 'tiktok',
    href: SITE.social.tiktok,
    label: SITE.handles.tiktok,
    sublabel: 'Vidéos & highlights',
    bg: 'from-[#010101] via-[#69C9D0] to-[#EE1D52]',
    icon: TikTokIcon,
    glow: '#69C9D0',
  },
].filter((s) => s.href);

export default function SocialWidget() {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="fixed left-5 bottom-6 z-50 flex flex-col items-start gap-2"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 18, stiffness: 180, delay: 1.3 }}
    >
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="cards"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex flex-col gap-2 mb-1"
          >
            {SOCIALS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.2 }}
                  whileHover={{ scale: 1.05, x: 4 }}
                  className="flex items-center gap-3 bg-dark2/95 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 shadow-2xl hover:border-white/20 transition-all duration-200 group"
                  style={{ boxShadow: `0 0 20px ${s.glow}22` }}
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.bg} flex items-center justify-center flex-shrink-0 shadow-lg`}
                    style={{ boxShadow: `0 4px 14px ${s.glow}55` }}
                  >
                    <Icon size={18} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-condensed font-bold text-sm text-textLight leading-tight">{s.label}</p>
                    <p className="font-body text-[11px] text-textLight/50 leading-tight">{s.sublabel}</p>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setExpanded(!expanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
        aria-label="Réseaux sociaux"
      >
        <motion.div
          className="absolute inset-0 opacity-60"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{ background: 'conic-gradient(from 0deg, transparent, #ffffff33, transparent)' }}
        />
        <motion.div
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="relative z-10"
        >
          <Instagram size={20} className="text-white" />
        </motion.div>
        {!expanded && (
          <motion.div
            className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border border-dark"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>
    </motion.div>
  );
}
