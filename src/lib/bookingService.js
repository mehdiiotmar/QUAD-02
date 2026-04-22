// Mode WhatsApp uniquement - Supabase désactivé
// Pour réactiver Supabase : recréez ce fichier avec import { supabase } from './supabase';

export async function saveBooking({ service, date, time, people, name, phone, notes }) {
  console.log('📝 Réservation enregistrée (WhatsApp uniquement):', { service, date, time, people, name });
  // Retourne un ID factice pour compatibilité
  return { id: 'wa-' + Date.now(), status: 'whatsapp-only' };
}

export async function saveCartBooking({ name, phone, notes, cartItems }) {
  console.log('🛒 Panier enregistré (WhatsApp uniquement):', { name, items: cartItems.length });
  return { id: 'wa-' + Date.now(), status: 'whatsapp-only' };
}
