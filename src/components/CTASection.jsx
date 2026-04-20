import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { Flame, ArrowRight } from 'lucide-react';

export default function CTASection() {
  const { t } = useLang();

  const scrollToBooking = () => {
    const el = document.querySelector('#booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #CC2800 0%, #FF5C00 40%, #FF8A00 70%, #FFB800 100%)' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full border-2 border-white/10"
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity } }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full border border-white/8"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 opacity-8" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-7"
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30"
          >
            <Flame size={32} className="text-white" />
          </motion.div>

          <h2 className="font-display text-[60px] sm:text-[76px] md:text-[96px] leading-none text-white uppercase">
            {t.cta.title1}
            <br />
            {t.cta.title2}
          </h2>
          <p className="font-body text-lg md:text-xl text-white/80 max-w-md">
            {t.cta.subtitle}
          </p>
          <motion.button
            onClick={scrollToBooking}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="font-condensed font-bold text-base uppercase tracking-widest bg-white text-primary px-12 py-5 rounded-full shadow-2xl shadow-dark/40 mt-2 flex items-center gap-3 hover:gap-5 transition-all duration-300"
            style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.3)' }}
          >
            {t.cta.btn}
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
