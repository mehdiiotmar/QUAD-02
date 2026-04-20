import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';

export default function OfferCard({ image, badge, title, duration, description, price, index }) {
  const { t } = useLang();

  const scrollToBooking = () => {
    const el = document.querySelector('#booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      className="relative rounded-2xl overflow-hidden group cursor-pointer h-[480px] md:h-[540px] flex flex-col justify-end"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/65 to-dark/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {badge && (
        <div className="absolute top-4 left-4 z-10">
          <motion.span
            className="font-condensed font-bold text-xs uppercase tracking-widest bg-primary text-white px-3 py-1.5 rounded-full flex items-center gap-1.5"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            {badge}
          </motion.span>
        </div>
      )}

      <div className="relative z-10 p-6 md:p-8 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-textLight/60">
          <Clock size={13} />
          <span className="font-condensed text-sm font-medium">{duration}</span>
        </div>
        <h3 className="font-display text-3xl md:text-4xl text-textLight group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="font-body text-sm text-textLight/70 leading-relaxed">{description}</p>
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="font-condensed text-xs text-textLight/40 uppercase tracking-wider">{t.offers.from}</span>
            <p className="font-display text-2xl text-primary">{price}</p>
          </div>
          <motion.button
            onClick={scrollToBooking}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            className="font-condensed font-bold text-sm uppercase tracking-wider bg-primary hover:bg-hot text-white px-6 py-3 rounded-full transition-colors duration-200 shadow-lg shadow-primary/20"
          >
            {t.offers.bookNow}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
