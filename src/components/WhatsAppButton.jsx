import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { whatsappUrl } from '../config/site';

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 16, stiffness: 180, delay: 1.2 }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 16, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 16, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-dark2/98 backdrop-blur-md border border-white/10 text-textLight font-body text-sm px-4 py-2.5 rounded-2xl shadow-xl whitespace-nowrap"
          >
            <span className="text-green-400 font-semibold">Chattez</span> avec nous !
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-15 h-15 flex items-center justify-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Chat on WhatsApp"
        style={{ width: 58, height: 58 }}
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-40"
          animate={{ scale: [1, 1.9, 2.3], opacity: [0.4, 0.15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-30"
          animate={{ scale: [1, 1.5, 1.9], opacity: [0.3, 0.1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
        />
        <motion.div
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-full h-full bg-[#25D366] hover:bg-[#20bf5b] transition-colors rounded-full flex items-center justify-center shadow-2xl shadow-green-900/60"
          style={{ boxShadow: '0 0 24px rgba(37,211,102,0.5)' }}
        >
          <svg viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.47.67 4.78 1.84 6.77L2 30l7.44-1.82A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6c-2.21 0-4.28-.6-6.06-1.65l-.43-.26-4.42 1.08 1.12-4.3-.28-.45A11.6 11.6 0 0 1 4.4 16c0-6.4 5.2-11.6 11.6-11.6 6.4 0 11.6 5.2 11.6 11.6 0 6.4-5.2 11.6-11.6 11.6zm6.36-8.67c-.35-.17-2.07-1.02-2.39-1.13-.32-.12-.55-.17-.78.17-.23.35-.9 1.13-1.1 1.37-.2.23-.4.26-.74.09-.35-.17-1.47-.54-2.8-1.73-1.04-.93-1.74-2.07-1.94-2.42-.2-.35-.02-.54.15-.71.15-.15.35-.4.52-.6.17-.2.23-.35.35-.58.12-.23.06-.43-.03-.6-.09-.17-.78-1.88-1.07-2.58-.28-.68-.57-.59-.78-.6h-.66c-.23 0-.6.09-.92.43-.32.35-1.2 1.17-1.2 2.86 0 1.68 1.23 3.31 1.4 3.54.17.23 2.42 3.7 5.87 5.19.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.13.66-.1 2.03-.83 2.32-1.63.29-.8.29-1.49.2-1.63-.09-.14-.32-.23-.66-.4z" />
          </svg>
        </motion.div>
      </a>
    </motion.div>
  );
}
