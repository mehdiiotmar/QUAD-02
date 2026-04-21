import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ChevronDown, Star, Zap, Shield, MapPin, Flame, Play } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { fetchHeroSlides } from '../lib/siteDataService';

const FALLBACK_SLIDES = [
  { id: 1, image_url: 'https://res.cloudinary.com/dmxtic6gh/image/upload/v1776800346/e1_fha1xj.jpg', position: 'center 40%' },
  { id: 2, image_url: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&w=1600', position: 'center 50%' },
  { id: 3, image_url: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&w=1600', position: 'center 35%' },
];

const itemVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
  visible: (i) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.14 },
  }),
};

function SpeedLine({ y, delay, width }) {
  return (
    <motion.div
      className="absolute left-0 h-px"
      style={{ top: `${y}%`, background: 'linear-gradient(to right, transparent, rgba(255,92,0,0.6), transparent)', width: `${width}%` }}
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: '200%', opacity: [0, 1, 0] }}
      transition={{ duration: 1.4, delay, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
    />
  );
}

export default function Hero() {
  const { t } = useLang();
  const [slides, setSlides] = useState(FALLBACK_SLIDES);
  const [slideIndex, setSlideIndex] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const sectionRef = useRef(null);

  useEffect(() => {
    fetchHeroSlides()
      .then((data) => { if (data && data.length > 0) setSlides(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((i) => (i + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 15);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 10);
  };

  const scrollToBooking = () => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToQuads = () => document.querySelector('#quads')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-end pb-20 md:pb-0 md:items-center justify-center overflow-hidden"
    >
      <AnimatePresence mode="sync">
        {slides.map((slide, i) =>
          i === slideIndex ? (
            <motion.div
              key={slide.id ?? i}
              className="absolute inset-0 z-0"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
              style={{
                backgroundImage: `url(${slide.image_url})`,
                backgroundSize: 'cover',
                backgroundPosition: slide.position || 'center 40%',
                x: springX,
                y: springY,
              }}
            />
          ) : null
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/55 to-dark/20 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/30 to-transparent z-[1]" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-dark/90 to-transparent z-[2]" />
      <div className="absolute inset-0 z-[1]" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(255,92,0,0.08) 0%, transparent 60%)' }} />

      <div className="absolute inset-0 overflow-hidden z-[1] pointer-events-none">
        <SpeedLine y={30} delay={0} width={40} />
        <SpeedLine y={45} delay={0.4} width={60} />
        <SpeedLine y={60} delay={0.8} width={35} />
        <SpeedLine y={70} delay={1.2} width={55} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-0">
        <div className="max-w-3xl">
          <motion.div
            custom={0}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 mb-6"
          >
            <motion.span
              className="flex items-center gap-1.5 font-condensed font-semibold text-xs uppercase tracking-[0.25em] text-primary border border-primary/40 bg-primary/12 px-3 py-1.5 rounded-full"
              animate={{ boxShadow: ['0 0 0px rgba(255,92,0,0)', '0 0 12px rgba(255,92,0,0.4)', '0 0 0px rgba(255,92,0,0)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <MapPin size={11} />
              Tetouan, Maroc
            </motion.span>
            <div className="flex items-center gap-1.5 bg-dark2/80 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full">
              <Star size={11} className="text-gold fill-gold" />
              <span className="font-condensed font-bold text-xs text-textLight">4.9</span>
              <span className="font-body text-xs text-textLight/50">· 200+ riders</span>
            </div>
          </motion.div>

          <motion.h1
            custom={1}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="font-display uppercase leading-none text-textLight mb-6"
            style={{ fontSize: 'clamp(52px, 9vw, 110px)' }}
          >
            {t.hero.title1}
            <br />
            <span className="relative inline-block">
              <span style={{ WebkitTextStroke: '2px #FF5C00', color: 'transparent' }}>
                {t.hero.titleAccent}
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 h-1 bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
              />
            </span>
            <br />
            <span className="text-primary">{t.hero.title2}</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="font-body text-lg md:text-xl text-textLight/70 max-w-lg leading-relaxed mb-8"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            custom={3}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-3 mb-10"
          >
            <motion.button
              onClick={scrollToBooking}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="relative font-condensed font-bold text-base uppercase tracking-widest text-white px-10 py-4 rounded-full overflow-hidden group"
              style={{ background: 'linear-gradient(135deg, #FF5C00, #FF8A00)', boxShadow: '0 0 30px rgba(255,92,0,0.5)' }}
            >
              <motion.span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #FF8A00, #FFB800)' }}
              />
              <span className="relative flex items-center gap-2">
                <Flame size={16} />
                {t.hero.cta1} →
              </span>
            </motion.button>
            <motion.button
              onClick={scrollToQuads}
              whileHover={{ scale: 1.04, borderColor: 'rgba(255,92,0,0.6)' }}
              whileTap={{ scale: 0.96 }}
              className="font-condensed font-bold text-base uppercase tracking-widest border border-white/20 text-textLight hover:text-primary px-10 py-4 rounded-full transition-all duration-200 backdrop-blur-sm bg-white/5 flex items-center gap-2"
            >
              <Play size={14} />
              {t.hero.cta2}
            </motion.button>
          </motion.div>

          <motion.div
            custom={4}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-5"
          >
            {[
              { icon: Zap, label: t.hero.stat1 ?? '30 Quads' },
              { icon: Shield, label: t.hero.stat2 ?? 'Équipement Complet' },
              { icon: MapPin, label: t.hero.stat3 ?? 'Tetouan & Environs' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <Icon size={12} className="text-primary" />
                </div>
                <span className="font-condensed text-sm font-semibold text-textLight/70 uppercase tracking-wide">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute right-6 bottom-24 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-10 flex flex-col gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlideIndex(i)}
            className={`transition-all duration-400 rounded-full mx-auto ${
              i === slideIndex
                ? 'w-1.5 h-8 bg-primary shadow-lg shadow-primary/60'
                : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        <span className="font-condensed text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
