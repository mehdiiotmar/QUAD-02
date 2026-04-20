import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

export default function MapSection() {
  const { t } = useLang();

  const contactInfo = [
    { icon: Phone, labelKey: 'phone', value: '+212 6XX XXX XXX', href: 'tel:+212600000000' },
    { icon: MessageCircle, labelKey: 'whatsapp', valueKey: 'whatsappValue', href: 'https://wa.me/212600000000?text=Hi!%20I%20want%20to%20book%20a%20quad%20ride' },
    { icon: Mail, labelKey: 'email', value: 'info@goquadtetouan.ma', href: 'mailto:info@goquadtetouan.ma' },
    { icon: MapPin, labelKey: 'address', valueKey: 'addressValue', href: '#' },
  ];

  return (
    <section className="py-20 md:py-28 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-condensed font-semibold text-sm uppercase tracking-[0.3em] text-primary">
            {t.map.sectionTag}
          </span>
          <h2 className="font-display text-5xl md:text-6xl text-textLight mt-2">
            {t.map.sectionTitle}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 rounded-2xl overflow-hidden border-2"
            style={{ borderColor: 'rgba(255,92,0,0.18)' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52101.96811791474!2d-5.4056!3d35.5785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b416f3a3b2a3b%3A0x5f3b4b3b3b3b3b3b!2sTetouan%2C%20Morocco!5e0!3m2!1sen!2sma!4v1620000000000!5m2!1sen!2sma"
              width="100%"
              style={{ aspectRatio: '16/9', display: 'block', filter: 'grayscale(0.3) contrast(1.1)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="GoQuad Tetouan Location"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <div className="bg-card border border-white/5 rounded-2xl p-6 md:p-8">
              <h3 className="font-display text-3xl text-textLight mb-6">{t.map.getInTouch}</h3>
              <div className="flex flex-col gap-5">
                {contactInfo.map(({ icon: Icon, labelKey, value, valueKey, href }) => (
                  <a
                    key={labelKey}
                    href={href}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-condensed text-xs uppercase tracking-wider text-textLight/40">{t.map[labelKey]}</p>
                      <p className="font-body text-sm text-textLight group-hover:text-primary transition-colors">{valueKey ? t.map[valueKey] : value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6">
              <p className="font-condensed font-semibold text-sm uppercase tracking-wider text-primary mb-2">{t.map.hours}</p>
              <p className="font-body text-sm text-textLight/70">{t.map.days}</p>
              <p className="font-display text-2xl text-textLight">08:00 – 18:00</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
