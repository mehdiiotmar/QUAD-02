import { supabase } from './supabase';

export async function saveBooking({ service, date, time, people, name, phone, notes }) {
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      service,
      date: date || null,
      time,
      people: Number(people),
      name,
      phone,
      notes,
      source: 'form',
      status: 'pending',
    })
    .select('id')
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function saveCartBooking({ name, phone, notes, cartItems }) {
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      service: cartItems.map((i) => `${i.qty}x ${i.name}`).join(', '),
      date: null,
      time: '',
      people: cartItems.reduce((sum, i) => sum + i.qty, 0),
      name,
      phone,
      notes: notes || '',
      source: 'cart',
      cart_items: cartItems,
      status: 'pending',
    })
    .select('id')
    .maybeSingle();

  if (error) throw error;
  return data;
}
