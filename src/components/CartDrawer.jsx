import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, Loader2, Phone, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { saveCartBooking } from '../lib/bookingService';

const WA_NUMBER = '212600000000';

function buildWhatsAppMessage(items, name, phone) {
  const lines = items.map(
    (i) => `• ${i.qty}x ${i.name} (${i.price_label})`
  );
  const msg = [
    'Bonjour GoQuad ! 👋',
    "Je souhaite réserver les quads suivants :",
    '',
    ...lines,
    '',
    `Nom : ${name}`,
    `Téléphone : ${phone}`,
    '',
    'Merci de confirmer la disponibilité et le tarif total.',
  ].join('\n');
  return encodeURIComponent(msg);
}

export default function CartDrawer() {
  const { items, removeItem, updateQty, clearCart, isOpen, setIsOpen, totalItems } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleWhatsApp = async () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Requis';
    if (!phone.trim()) errs.phone = 'Requis';
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    setFieldErrors({});
    setSaving(true);
    try {
      await saveCartBooking({ name, phone, cartItems: items });
    } catch (_) {
    } finally {
      setSaving(false);
    }
    const msg = buildWhatsAppMessage(items, name, phone);
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer');
    clearCart();
    setName('');
    setPhone('');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-dark/70 backdrop-blur-sm z-[200]"
            onClick={() => setIsOpen(false)}
          />

          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-dark2 border-l border-white/8 z-[201] flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-primary" />
                <h2 className="font-display text-2xl text-textLight tracking-wide">Mon Panier</h2>
                {totalItems > 0 && (
                  <span className="bg-primary text-white font-condensed font-bold text-xs px-2 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-textLight/60 hover:text-textLight transition-all"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-48 gap-4"
                  >
                    <ShoppingBag size={40} className="text-textLight/15" />
                    <p className="font-body text-textLight/40 text-sm text-center">
                      Votre panier est vide.<br />Ajoutez des quads pour commencer.
                    </p>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id ?? item.name}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex gap-4 bg-card border border-white/5 rounded-2xl p-4"
                    >
                      <div className="relative w-20 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                        <span
                          className="absolute bottom-1 left-1 font-condensed font-bold text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded-full text-dark"
                          style={{ backgroundColor: item.tag_color }}
                        >
                          {item.tag}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-condensed font-bold text-sm text-textLight leading-tight truncate">
                          {item.name}
                        </h4>
                        <p className="font-body text-xs text-textLight/45 mt-0.5 truncate">{item.for_who}</p>
                        <p className="font-display text-lg text-primary mt-1">{item.price_label}</p>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQty(item.id ?? item.name, item.qty - 1)}
                            className="w-7 h-7 rounded-full bg-dark/80 border border-white/10 flex items-center justify-center text-textLight/60 hover:border-primary/50 hover:text-primary transition-all"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="font-condensed font-bold text-sm text-textLight w-5 text-center">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id ?? item.name, item.qty + 1)}
                            className="w-7 h-7 rounded-full bg-dark/80 border border-white/10 flex items-center justify-center text-textLight/60 hover:border-primary/50 hover:text-primary transition-all"
                          >
                            <Plus size={11} />
                          </button>

                          <button
                            onClick={() => removeItem(item.id ?? item.name)}
                            className="ml-auto w-7 h-7 rounded-full bg-dark/80 border border-white/10 flex items-center justify-center text-textLight/30 hover:border-red-500/50 hover:text-red-500 transition-all"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-white/8 space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-condensed text-sm text-textLight/50 uppercase tracking-wide">
                    {totalItems} quad{totalItems > 1 ? 's' : ''} sélectionné{totalItems > 1 ? 's' : ''}
                  </span>
                  <button
                    onClick={clearCart}
                    className="font-condensed text-xs text-textLight/30 hover:text-red-400 uppercase tracking-wide transition-colors"
                  >
                    Vider
                  </button>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="relative">
                      <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-textLight/30" />
                      <input
                        type="text"
                        placeholder="Votre nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full bg-dark/80 border ${fieldErrors.name ? 'border-red-500' : 'border-white/10'} focus:border-primary outline-none text-textLight font-body text-sm pl-9 pr-3 py-2.5 rounded-xl transition-colors placeholder:text-textLight/30`}
                      />
                    </div>
                    {fieldErrors.name && <p className="text-red-500 text-xs font-body mt-0.5 pl-1">{fieldErrors.name}</p>}
                  </div>
                  <div>
                    <div className="relative">
                      <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-textLight/30" />
                      <input
                        type="tel"
                        placeholder="+212 6XX XXX XXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full bg-dark/80 border ${fieldErrors.phone ? 'border-red-500' : 'border-white/10'} focus:border-primary outline-none text-textLight font-body text-sm pl-9 pr-3 py-2.5 rounded-xl transition-colors placeholder:text-textLight/30`}
                      />
                    </div>
                    {fieldErrors.phone && <p className="text-red-500 text-xs font-body mt-0.5 pl-1">{fieldErrors.phone}</p>}
                  </div>
                </div>

                <button
                  onClick={handleWhatsApp}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1fb95a] disabled:opacity-70 text-white font-condensed font-bold text-sm uppercase tracking-widest py-4 rounded-2xl transition-all duration-200 hover:shadow-xl hover:shadow-green-900/40 hover:scale-[1.01] active:scale-[0.99]"
                >
                  {saving ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <svg viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                      <path d="M16 2C8.268 2 2 8.268 2 16c0 2.47.67 4.78 1.84 6.77L2 30l7.44-1.82A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6c-2.21 0-4.28-.6-6.06-1.65l-.43-.26-4.42 1.08 1.12-4.3-.28-.45A11.6 11.6 0 0 1 4.4 16c0-6.4 5.2-11.6 11.6-11.6 6.4 0 11.6 5.2 11.6 11.6 0 6.4-5.2 11.6-11.6 11.6zm6.36-8.67c-.35-.17-2.07-1.02-2.39-1.13-.32-.12-.55-.17-.78.17-.23.35-.9 1.13-1.1 1.37-.2.23-.4.26-.74.09-.35-.17-1.47-.54-2.8-1.73-1.04-.93-1.74-2.07-1.94-2.42-.2-.35-.02-.54.15-.71.15-.15.35-.4.52-.6.17-.2.23-.35.35-.58.12-.23.06-.43-.03-.6-.09-.17-.78-1.88-1.07-2.58-.28-.68-.57-.59-.78-.6h-.66c-.23 0-.6.09-.92.43-.32.35-1.2 1.17-1.2 2.86 0 1.68 1.23 3.31 1.4 3.54.17.23 2.42 3.7 5.87 5.19.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.13.66-.1 2.03-.83 2.32-1.63.29-.8.29-1.49.2-1.63-.09-.14-.32-.23-.66-.4z" />
                    </svg>
                  )}
                  {saving ? 'Enregistrement...' : 'Réserver via WhatsApp'}
                </button>

                <p className="text-center font-body text-xs text-textLight/30">
                  Votre sélection sera envoyée directement sur WhatsApp
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
