// =============================================================
//  SITE CONFIG — Modifiez ce fichier pour changer toutes les
//  coordonnees, reseaux sociaux et infos du site facilement.
// =============================================================

export const SITE = {
  name: 'GoQuad',
  city: 'Tetouan',
  country: 'Maroc',

  // --- CONTACT ---
  phone: '+212 653 129 843',
  phoneRaw: '212653129843',       // sans + ni espaces (pour WhatsApp & tel:)
  email: '',                       // ex: contact@goquadtetouan.com

  // --- LOCALISATION ---
  address: 'Tetouan, Maroc',
  mapUrl: 'https://maps.google.com/?q=Tetouan,Maroc',

  // --- WHATSAPP ---
  whatsappMessage: 'Bonjour! Je veux réserver une sortie quad',

  // --- RESEAUX SOCIAUX ---
  social: {
    instagram: 'https://www.instagram.com/goquadtetouan',
    tiktok:    'https://www.tiktok.com/@goquadtetouan',
    facebook:  '',                 // ex: https://www.facebook.com/goquadtetouan
    youtube:   '',                 // ex: https://www.youtube.com/@goquadtetouan
  },

  // --- HANDLES (affichage) ---
  handles: {
    instagram: '@goquadtetouan',
    tiktok:    '@goquadtetouan',
  },

  // --- GOOGLE SHEETS (source de donnees) ---
  sheetsUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTMKD6c3wlb13x2T_me1HWr_C6kjaYb8C7ecrgn2pJC187CHGh_PEzYVu2g7jsSDWbt5Ol9P2qOKGdb/pubhtml',
};

export function whatsappUrl(message = SITE.whatsappMessage) {
  return `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(message)}`;
}

export function telUrl() {
  return `tel:+${SITE.phoneRaw}`;
}
