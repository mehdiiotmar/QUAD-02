import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, X, ZoomIn } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { fetchGalleryImages } from '../lib/siteDataService';

const FALLBACK = [
  { id: 1, image_url: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&w=600', alt_text: 'Quad Tetouan', tall: true },
  { id: 2, image_url: 'https://images.pexels.com/photos/163210/motorcycles-race-speed-helmet-163210.jpeg?auto=compress&w=600', alt_text: 'Quad helmet', tall: false },
  { id: 3, image_url: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&w=600', alt_text: 'Quad sport', tall: false },
  { id: 4, image_url: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&w=600', alt_text: 'Buggy duo', tall: true },
  { id: 5, image_url: 'https://images.pexels.com/photos/2611686/pexels-photo-2611686.jpeg?auto=compress&w=600', alt_text: 'Quad adventure', tall: false },
  { id: 6, image_url: 'https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?auto=compress&w=600', alt_text: 'Off-road', tall: false },
  { id: 7, image_url: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&w=600', alt_text: 'Desert quad', tall: true },
  { id: 8, image_url: 'https://images.pexels.com/photos/1616317/pexels-photo-1616317.jpeg?auto=compress&w=600', alt_text: 'Quad trail', tall: false },
  { id: 9, image_url: 'https://images.pexels.com/photos/3894874/pexels-photo-3894874.jpeg?auto=compress&w=600', alt_text: 'Family buggy', tall: false },
];

export default function Gallery() {
  const { t } = useLang();
  const [images, setImages] = useState(FALLBACK);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetchGalleryImages()
      .then((data) => { if (data && data.length > 0) setImages(data); })
      .catch(() => {});
  }, []);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-dark2 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.span
            className="inline-block font-condensed font-semibold text-sm uppercase tracking-[0.3em] text-primary mb-3"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            {t.gallery.sectionTag}
          </motion.span>
          <h2 className="font-display text-5xl md:text-6xl text-textLight mt-1">
            {t.gallery.sectionTitle}
          </h2>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <motion.div
              key={img.id ?? i}
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              onClick={() => setLightbox(img)}
              className="relative overflow-hidden rounded-2xl group break-inside-avoid mb-4 cursor-pointer"
            >
              <motion.img
                src={img.image_url}
                alt={img.alt_text || `GoQuad trail ${i + 1}`}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                  img.tall ? 'h-72 sm:h-80' : 'h-48 sm:h-56'
                }`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <ZoomIn size={18} className="text-white" />
                </div>
                <span className="font-condensed font-bold text-xs text-white uppercase tracking-widest">@goquadtetouan</span>
              </motion.div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#f09433] to-[#bc1888] flex items-center justify-center shadow-lg">
                  <Instagram size={13} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <motion.a
            href="https://www.instagram.com/goquadtetouan"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-3 font-condensed font-bold text-sm uppercase tracking-widest bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white px-8 py-4 rounded-full shadow-xl"
            style={{ boxShadow: '0 0 30px rgba(230,104,60,0.4)' }}
          >
            <Instagram size={18} />
            {t.gallery.followBtn}
          </motion.a>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[200] bg-dark/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <img
                src={lightbox.image_url.replace('w=600', 'w=1200')}
                alt={lightbox.alt_text}
                className="w-full rounded-2xl object-cover max-h-[80vh]"
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-dark/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-textLight/70 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
