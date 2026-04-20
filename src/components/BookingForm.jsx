import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Calendar, Users, Clock, Phone, ChevronRight, Check, ShoppingBag, Loader2 } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { saveBooking } from '../lib/bookingService';

const WA_NUMBER = '212653129843';
const TIMES = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

function buildMessage({ service, date, time, people, name, phone, notes }) {
  const lines = [
    'Bonjour GoQuad ! 🏍️',
    'Je souhaite faire une réservation :',
    '',
    `• Service : ${service}`,
    `• Date : ${date}`,
    `• Heure : ${time}`,
    `• Personnes : ${people}`,
    `• Nom : ${name}`,
    `• Téléphone : ${phone}`,
  ];
  if (notes) lines.push(`• Notes : ${notes}`);
  lines.push('', 'Merci de confirmer ma réservation !');
  return encodeURIComponent(lines.join('\n'));
}

const inputClass = (hasError) =>
  `w-full bg-dark border ${hasError ? 'border-red-500' : 'border-white/10'
  } focus:border-primary outline-none text-textLight font-body text-sm px-4 py-3 rounded-xl transition-colors duration-200 placeholder:text-textLight/30`;
const labelClass = 'font-condensed font-semibold text-sm uppercase tracking-wider text-textLight/60 mb-1.5 block';

export default function BookingForm() {
  const { t } = useLang();
  const { items, setIsOpen: openCart, totalItems } = useCart();
  const [form, setForm] = useState({ service: '', date: '', time: '', people: '1', name: '', phone: '', notes: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [saving, setSaving] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const services = t.offers.packages.map((p) => p.title);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.service) e.service = 'Choisissez un service';
    if (!form.date) e.date = 'Choisissez une date';
    if (!form.time) e.time = 'Choisissez une heure';
    if (!form.people || Number(form.people) < 1) e.people = 'Nombre requis';
    if (!form.name.trim()) e.name = 'Votre nom requis';
    if (!form.phone.trim()) e.phone = 'Votre téléphone requis';
    return e;
  };

  const handleWhatsApp = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSaving(true);
    try {
      await saveBooking(form);
    } catch (_) {
    } finally {
      setSaving(false);
    }
    const msg = buildMessage(form);
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer');
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <section id="booking" className="py-20 md:py-28 bg-dark2 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-condensed font-semibold text-sm uppercase tracking-[0.3em] text-primary">
            {t.booking.sectionTag}
          </span>
          <h2 className="font-display text-5xl md:text-6xl text-textLight mt-2">
            {t.booking.sectionTitle}
          </h2>
          <p className="font-body text-textLight/60 mt-4 max-w-lg mx-auto">
            Remplissez le formulaire et envoyez votre demande directement sur WhatsApp — confirmation rapide garantie.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 bg-card border border-white/5 rounded-3xl p-6 md:p-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className={labelClass}>Service / Forfait</label>
                <select className={inputClass(errors.service)} value={form.service} onChange={set('service')}>
                  <option value="">Choisir un forfait...</option>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.service && <p className="text-red-500 text-xs font-body mt-1">{errors.service}</p>}
              </div>

              <div>
                <label className={labelClass}><Calendar size={12} className="inline mr-1 mb-0.5" />Date</label>
                <input type="date" min={today} className={inputClass(errors.date)} value={form.date} onChange={set('date')} />
                {errors.date && <p className="text-red-500 text-xs font-body mt-1">{errors.date}</p>}
              </div>

              <div>
                <label className={labelClass}><Clock size={12} className="inline mr-1 mb-0.5" />Heure</label>
                <select className={inputClass(errors.time)} value={form.time} onChange={set('time')}>
                  <option value="">Choisir une heure...</option>
                  {TIMES.map((tm) => <option key={tm} value={tm}>{tm}</option>)}
                </select>
                {errors.time && <p className="text-red-500 text-xs font-body mt-1">{errors.time}</p>}
              </div>

              <div>
                <label className={labelClass}><Users size={12} className="inline mr-1 mb-0.5" />Personnes</label>
                <input
                  type="number" min={1} max={30} placeholder="1–30"
                  className={inputClass(errors.people)} value={form.people} onChange={set('people')}
                />
                {errors.people && <p className="text-red-500 text-xs font-body mt-1">{errors.people}</p>}
              </div>

              <div>
                <label className={labelClass}>Votre Nom</label>
                <input
                  type="text" placeholder="Mohammed Amrani"
                  className={inputClass(errors.name)} value={form.name} onChange={set('name')}
                />
                {errors.name && <p className="text-red-500 text-xs font-body mt-1">{errors.name}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}><Phone size={12} className="inline mr-1 mb-0.5" />Téléphone</label>
                <input
                  type="tel" placeholder="+212 6XX XXX XXX"
                  className={inputClass(errors.phone)} value={form.phone} onChange={set('phone')}
                />
                {errors.phone && <p className="text-red-500 text-xs font-body mt-1">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Notes <span className="text-textLight/30 normal-case">(optionnel)</span></label>
                <textarea
                  rows={2}
                  placeholder="Demandes spéciales, niveau d'expérience..."
                  className={`${inputClass(false)} resize-none`}
                  value={form.notes}
                  onChange={set('notes')}
                />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsApp}
                disabled={saving}
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1fb95a] disabled:opacity-70 text-white font-condensed font-bold text-base uppercase tracking-widest py-4 rounded-2xl transition-all duration-200 hover:shadow-xl hover:shadow-green-900/40"
              >
                {saving ? (
                  <Loader2 size={22} className="animate-spin" />
                ) : (
                  <svg viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
                    <path d="M16 2C8.268 2 2 8.268 2 16c0 2.47.67 4.78 1.84 6.77L2 30l7.44-1.82A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6c-2.21 0-4.28-.6-6.06-1.65l-.43-.26-4.42 1.08 1.12-4.3-.28-.45A11.6 11.6 0 0 1 4.4 16c0-6.4 5.2-11.6 11.6-11.6 6.4 0 11.6 5.2 11.6 11.6 0 6.4-5.2 11.6-11.6 11.6zm6.36-8.67c-.35-.17-2.07-1.02-2.39-1.13-.32-.12-.55-.17-.78.17-.23.35-.9 1.13-1.1 1.37-.2.23-.4.26-.74.09-.35-.17-1.47-.54-2.8-1.73-1.04-.93-1.74-2.07-1.94-2.42-.2-.35-.02-.54.15-.71.15-.15.35-.4.52-.6.17-.2.23-.35.35-.58.12-.23.06-.43-.03-.6-.09-.17-.78-1.88-1.07-2.58-.28-.68-.57-.59-.78-.6h-.66c-.23 0-.6.09-.92.43-.32.35-1.2 1.17-1.2 2.86 0 1.68 1.23 3.31 1.4 3.54.17.23 2.42 3.7 5.87 5.19.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.13.66-.1 2.03-.83 2.32-1.63.29-.8.29-1.49.2-1.63-.09-.14-.32-.23-.66-.4z" />
                  </svg>
                )}
                {saving ? 'Enregistrement...' : 'Envoyer sur WhatsApp'}
              </motion.button>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3"
                  >
                    <Check size={16} className="text-green-400 flex-shrink-0" />
                    <p className="font-body text-sm text-green-400">
                      WhatsApp ouvert ! Envoyez le message pour confirmer votre réservation.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <div className="bg-card border border-white/5 rounded-2xl p-5">
              <p className="font-condensed font-semibold text-xs uppercase tracking-widest text-textLight/40 mb-4">
                Comment ca marche
              </p>
              {[
                { icon: MessageCircle, title: 'Remplissez le formulaire', desc: 'Choisissez votre forfait, date et heure.' },
                { icon: Check, title: 'Envoyez sur WhatsApp', desc: 'Votre demande arrive directement chez nous.' },
                { icon: Phone, title: 'Confirmation rapide', desc: 'Nous confirmons sous 30 minutes.' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="flex gap-3 mb-4 last:mb-0">
                  <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={13} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-condensed font-semibold text-sm text-textLight">{title}</p>
                    <p className="font-body text-xs text-textLight/45 mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {totalItems > 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary/10 border border-primary/25 rounded-2xl p-5"
              >
                <p className="font-condensed font-semibold text-xs uppercase tracking-widest text-primary mb-3">
                  Panier ({totalItems} quad{totalItems > 1 ? 's' : ''})
                </p>
                <p className="font-body text-xs text-textLight/60 mb-4 leading-relaxed">
                  Vous avez des quads dans votre panier. Réservez-les directement via WhatsApp.
                </p>
                <button
                  onClick={() => openCart(true)}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-hot text-white font-condensed font-bold text-sm uppercase tracking-widest py-3 rounded-xl transition-all duration-200"
                >
                  <ShoppingBag size={15} />
                  Voir mon panier
                  <ChevronRight size={14} />
                </button>
              </motion.div>
            ) : (
              <div className="bg-card border border-white/5 rounded-2xl p-5">
                <p className="font-condensed font-semibold text-xs uppercase tracking-widest text-textLight/40 mb-3">
                  Ou choisissez un quad
                </p>
                <p className="font-body text-xs text-textLight/50 mb-4 leading-relaxed">
                  Parcourez notre flotte et ajoutez vos quads au panier pour une réservation groupée.
                </p>
                <button
                  onClick={() => document.querySelector('#quads')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full flex items-center justify-center gap-2 border border-white/10 hover:border-primary/40 text-textLight/60 hover:text-primary font-condensed font-bold text-sm uppercase tracking-widest py-3 rounded-xl transition-all duration-200"
                >
                  Voir nos quads
                  <ChevronRight size={14} />
                </button>
              </div>
            )}

            <div className="bg-[#25D366]/10 border border-[#25D366]/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                  <svg viewBox="0 0 32 32" fill="#25D366" xmlns="http://www.w3.org/2000/svg" width="15" height="15">
                    <path d="M16 2C8.268 2 2 8.268 2 16c0 2.47.67 4.78 1.84 6.77L2 30l7.44-1.82A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm6.36 19.33c-.35-.17-2.07-1.02-2.39-1.13-.32-.12-.55-.17-.78.17-.23.35-.9 1.13-1.1 1.37-.2.23-.4.26-.74.09-.35-.17-1.47-.54-2.8-1.73-1.04-.93-1.74-2.07-1.94-2.42-.2-.35-.02-.54.15-.71.15-.15.35-.4.52-.6.17-.2.23-.35.35-.58.12-.23.06-.43-.03-.6-.09-.17-.78-1.88-1.07-2.58-.28-.68-.57-.59-.78-.6h-.66c-.23 0-.6.09-.92.43-.32.35-1.2 1.17-1.2 2.86 0 1.68 1.23 3.31 1.4 3.54.17.23 2.42 3.7 5.87 5.19.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.13.66-.1 2.03-.83 2.32-1.63.29-.8.29-1.49.2-1.63-.09-.14-.32-.23-.66-.4z" />
                  </svg>
                </div>
                <p className="font-condensed font-semibold text-sm text-[#25D366]">Réponse rapide garantie</p>
              </div>
              <p className="font-body text-xs text-textLight/50 leading-relaxed">
                Notre équipe répond sur WhatsApp en moins de 30 minutes, 7j/7 de 8h à 19h.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
