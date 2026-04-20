import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { Bike, Compass, ShieldCheck, MapPinned } from 'lucide-react';

const ICONS = [Bike, Compass, ShieldCheck, MapPinned];
const GRADIENTS = [
  'from-orange-500/20 to-red-600/10',
  'from-amber-500/20 to-orange-600/10',
  'from-red-500/20 to-orange-600/10',
  'from-yellow-500/20 to-amber-600/10',
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Features() {
  const { t } = useLang();

  return (
    <section className="py-20 md:py-28 bg-dark2 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #FF5C00 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block font-condensed font-semibold text-sm uppercase tracking-[0.3em] text-primary mb-3"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            {t.features.sectionTag}
          </motion.span>
          <h2 className="font-display text-5xl md:text-6xl text-textLight mt-1">
            {t.features.sectionTitle}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {t.features.items.map((f, i) => {
            const Icon = ICONS[i] || Bike;
            return (
              <motion.div
                key={f.title}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
                className={`relative bg-card border border-white/5 rounded-3xl p-8 flex flex-col gap-5 hover:border-primary/40 transition-all duration-300 group cursor-default overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ background: 'radial-gradient(circle, #FF5C00, transparent)', transform: 'translate(30%, -30%)' }} />

                <div className="relative">
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center group-hover:bg-primary/25 group-hover:border-primary/50 transition-all duration-300"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon size={26} className="text-primary" />
                  </motion.div>
                  <motion.div className="w-10 h-0.5 bg-primary mt-4 group-hover:w-16 transition-all duration-400 rounded-full" />
                </div>

                <div className="relative">
                  <h3 className="font-condensed font-bold text-xl text-textLight group-hover:text-primary transition-colors duration-200 leading-tight">
                    {f.title}
                  </h3>
                  <p className="font-body text-sm text-textLight/55 leading-relaxed mt-2">{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
