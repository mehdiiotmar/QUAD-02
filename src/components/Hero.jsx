import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ChevronDown, Star, Zap, Shield, MapPin, Flame, Play } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { fetchHeroSlides } from '../lib/siteDataService';

const FALLBACK_SLIDES = [
  { id: 2, image_url: 'https://res.cloudinary.com/dmxtic6gh/image/upload/v1776800346/e1_fha1xj.jpg', position: 'center 50%' },
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
