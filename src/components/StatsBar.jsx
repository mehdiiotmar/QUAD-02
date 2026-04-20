import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { Zap, Users, Map, Award } from 'lucide-react';

function CountUp({ target, suffix = '' }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          let start = 0;
          const duration = 2000;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, started]);

  return <span ref={ref}>{value}{suffix}</span>;
}

export default function StatsBar() {
  const { t } = useLang();
  const ICONS = [Zap, Users, Map, Award];

  const stats = [
    { value: 30, suffix: '', label: t.stats.quads, icon: ICONS[0] },
    { value: 200, suffix: '+', label: t.stats.riders, icon: ICONS[1] },
    { value: 12, suffix: '', label: t.stats.trails, icon: ICONS[2] },
    { value: 5, suffix: '+', label: t.stats.years, icon: ICONS[3] },
  ];

  return (
    <section className="relative bg-dark border-y border-white/5 py-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,92,0,0.04) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center gap-2 text-center group cursor-default"
              >
                <motion.div
                  className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-1 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300"
                  animate={{ boxShadow: ['0 0 0px rgba(255,92,0,0)', '0 0 16px rgba(255,92,0,0.25)', '0 0 0px rgba(255,92,0,0)'] }}
                  transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
                >
                  <Icon size={20} className="text-primary" />
                </motion.div>
                <div className="font-display text-5xl md:text-6xl text-primary group-hover:text-hot transition-colors duration-300">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-condensed font-semibold text-sm uppercase tracking-widest text-textLight/50 group-hover:text-textLight/70 transition-colors">
                  {stat.label}
                </div>
                <motion.div
                  className="h-0.5 bg-primary/40 group-hover:bg-primary rounded-full transition-all duration-300"
                  initial={{ width: 24 }}
                  whileHover={{ width: 48 }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
