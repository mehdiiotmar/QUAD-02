import { motion } from 'framer-motion';

export default function QuadLogo({ size = 48, className = '' }) {
  const w = size * 1.6;
  const h = size;

  return (
    <motion.div
      className={`inline-flex items-center flex-shrink-0 ${className}`}
      initial={{ opacity: 0, scale: 0.3, rotate: -15 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: 'spring', damping: 12, stiffness: 180, delay: 0.1 }}
    >
      <svg
        width={w}
        height={h}
        viewBox="0 0 160 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
      >
        <defs>
          <radialGradient id="wg1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF5C00" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#FF8A00" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FF5C00" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="wg2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF5C00" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#FF8A00" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FF5C00" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bodyTop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF9A00" />
            <stop offset="100%" stopColor="#CC3D00" />
          </linearGradient>
          <linearGradient id="bodyBot" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#222" />
            <stop offset="100%" stopColor="#080808" />
          </linearGradient>
          <linearGradient id="fender" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF7A00" />
            <stop offset="100%" stopColor="#FF2200" />
          </linearGradient>
          <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="softglow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.rect
            x="28" y="54" width="104" height="13" rx="5"
            fill="url(#bodyBot)"
            stroke="#FF5C00"
            strokeWidth="1.2"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ transformOrigin: '80px 60px' }}
          />
          <motion.path
            d="M36 54 Q43 28 62 22 L98 22 Q117 28 124 54 Z"
            fill="url(#bodyTop)"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          />
          <motion.path
            d="M62 22 L58 54"
            stroke="#FFD000"
            strokeWidth="2.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          />
          <motion.path
            d="M98 22 L102 54"
            stroke="#FFD000"
            strokeWidth="2.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.75, duration: 0.4 }}
          />
          <motion.path
            d="M63 14 Q80 9 97 14 L98 22 L62 22 Z"
            fill="url(#fender)"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            style={{ transformOrigin: '80px 18px', filter: 'url(#softglow)' }}
          />
          <motion.rect
            x="67" y="10" width="26" height="9" rx="3.5"
            fill="#0d0d0d"
            stroke="#FF5C00"
            strokeWidth="1"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.35, delay: 0.6 }}
            style={{ transformOrigin: '80px 14px' }}
          />
          <motion.rect
            x="70" y="12" width="20" height="5.5" rx="2"
            fill="#0a0a0a"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          />
          <motion.rect
            x="24" y="51" width="16" height="11" rx="3"
            fill="#FF5C00"
            style={{ filter: 'url(#glow)' }}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 }}
          />
          <motion.rect
            x="120" y="51" width="16" height="11" rx="3"
            fill="#FF5C00"
            style={{ filter: 'url(#glow)' }}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 }}
          />
          <motion.rect
            x="24" y="51" width="7" height="5" rx="2"
            fill="#FFD000"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.rect
            x="129" y="51" width="7" height="5" rx="2"
            fill="#FF2200"
            animate={{ opacity: [0.9, 0.2, 0.9] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />

          <motion.circle
            cx="42" cy="76" r="17"
            fill="#111"
            stroke="#FF5C00"
            strokeWidth="3.5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10, stiffness: 260, delay: 0.45 }}
            style={{ filter: 'url(#glow)' }}
          />
          <motion.circle cx="42" cy="76" r="11" fill="#1a1a1a" stroke="#FF8A00" strokeWidth="1.2" />
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '42px 76px' }}
          >
            <line x1="42" y1="65" x2="42" y2="59" stroke="#FF5C00" strokeWidth="3" strokeLinecap="round" />
            <line x1="53" y1="76" x2="59" y2="76" stroke="#FF5C00" strokeWidth="3" strokeLinecap="round" />
            <line x1="42" y1="87" x2="42" y2="93" stroke="#FF5C00" strokeWidth="3" strokeLinecap="round" />
            <line x1="31" y1="76" x2="25" y2="76" stroke="#FF5C00" strokeWidth="3" strokeLinecap="round" />
          </motion.g>
          <motion.circle cx="42" cy="76" r="4.5" fill="#FF5C00" />
          <motion.circle cx="42" cy="76" r="2" fill="#FFD000" />
          <motion.circle
            cx="42" cy="76" r="24"
            fill="url(#wg1)"
            animate={{ opacity: [0.5, 0.9, 0.5], scale: [0.85, 1.08, 0.85] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '42px 76px' }}
          />

          <motion.circle
            cx="118" cy="76" r="17"
            fill="#111"
            stroke="#FF5C00"
            strokeWidth="3.5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10, stiffness: 260, delay: 0.5 }}
            style={{ filter: 'url(#glow)' }}
          />
          <motion.circle cx="118" cy="76" r="11" fill="#1a1a1a" stroke="#FF8A00" strokeWidth="1.2" />
          <motion.g
            animate={{ rotate: -360 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '118px 76px' }}
          >
            <line x1="118" y1="65" x2="118" y2="59" stroke="#FF5C00" strokeWidth="3" strokeLinecap="round" />
            <line x1="129" y1="76" x2="135" y2="76" stroke="#FF5C00" strokeWidth="3" strokeLinecap="round" />
            <line x1="118" y1="87" x2="118" y2="93" stroke="#FF5C00" strokeWidth="3" strokeLinecap="round" />
            <line x1="107" y1="76" x2="101" y2="76" stroke="#FF5C00" strokeWidth="3" strokeLinecap="round" />
          </motion.g>
          <motion.circle cx="118" cy="76" r="4.5" fill="#FF5C00" />
          <motion.circle cx="118" cy="76" r="2" fill="#FFD000" />
          <motion.circle
            cx="118" cy="76" r="24"
            fill="url(#wg2)"
            animate={{ opacity: [0.5, 0.9, 0.5], scale: [0.85, 1.08, 0.85] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            style={{ transformOrigin: '118px 76px' }}
          />
        </motion.g>

        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], x: [-4, -30] }}
          transition={{ duration: 0.65, repeat: Infinity, repeatDelay: 2.2, delay: 1.5 }}
        >
          <line x1="22" y1="55" x2="8" y2="55" stroke="#FF5C00" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="22" y1="61" x2="5" y2="61" stroke="#FF8A00" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="22" y1="67" x2="10" y2="67" stroke="#FF5C00" strokeWidth="2.2" strokeLinecap="round" />
        </motion.g>
      </svg>
    </motion.div>
  );
}
