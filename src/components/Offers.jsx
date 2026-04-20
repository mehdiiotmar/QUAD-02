import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import OfferCard from './OfferCard';
import { useLang } from '../context/LanguageContext';
import { fetchOffers } from '../lib/siteDataService';

export default function Offers() {
  const { t } = useLang();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetchOffers()
      .then((data) => {
        if (data && data.length > 0) {
          setOffers(data);
        } else {
          setOffers(
            t.offers.packages.map((pkg, i) => ({
              id: i,
              title: pkg.title,
              duration: pkg.duration,
              description: pkg.desc,
              price: pkg.price,
              image_url: [
                'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&w=800',
                'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&w=800',
                'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&w=800',
              ][i] ?? '',
              is_popular: i === 1,
              sort_order: i,
            }))
          );
        }
      })
      .catch(() => {
        setOffers(
          t.offers.packages.map((pkg, i) => ({
            id: i,
            title: pkg.title,
            duration: pkg.duration,
            description: pkg.desc,
            price: pkg.price,
            image_url: [
              'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&w=800',
              'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&w=800',
              'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&w=800',
            ][i] ?? '',
            is_popular: i === 1,
            sort_order: i,
          }))
        );
      });
  }, []);

  return (
    <section id="offers" className="py-20 md:py-28 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-condensed font-semibold text-sm uppercase tracking-[0.3em] text-primary">
            {t.offers.sectionTag}
          </span>
          <h2 className="font-display text-5xl md:text-6xl text-textLight mt-2">
            {t.offers.sectionTitle}
          </h2>
          <p className="font-body text-textLight/60 mt-4 max-w-xl mx-auto">
            {t.offers.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, i) => (
            <OfferCard
              key={offer.id ?? i}
              image={offer.image_url}
              badge={offer.is_popular ? t.offers.popular : undefined}
              title={offer.title}
              duration={offer.duration}
              description={offer.description}
              price={offer.price}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
