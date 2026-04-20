import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';

export default function Testimonials() {
  const { t } = useLang();
  const doubled = [...t.testimonials.items, ...t.testimonials.items];

  return (
    <section className="py-20 md:py-28 bg-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="font-condensed font-semibold text-sm uppercase tracking-[0.3em] text-primary">
            {t.testimonials.sectionTag}
          </span>
          <h2 className="font-display text-5xl md:text-6xl text-textLight mt-2">
            {t.testimonials.sectionTitle}
          </h2>
        </motion.div>
      </div>

      <div className="relative">
        <div className="flex gap-6 animate-marquee w-max">
          {doubled.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-80 bg-card border border-white/5 rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <span key={si} className="text-gold text-base">⭐</span>
                ))}
              </div>
              <p className="font-body text-sm text-textLight/75 leading-relaxed italic">"{item.quote}"</p>
              <div className="flex items-center gap-2 mt-auto pt-2 border-t border-white/5">
                <span className="text-xl">{item.flag}</span>
                <span className="font-condensed font-semibold text-textLight">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
