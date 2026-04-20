import { createGoogleCalendarEvent } from './googleCalendar';

const bookedSlots = {};

export function getBookedCount(date, time) {
  const key = `${date}-${time}`;
  return bookedSlots[key] || 0;
}

export async function submitBooking({ service, date, time, people, name, phone, email, specialRequests }) {
  const key = `${date}-${time}`;
  const current = bookedSlots[key] || 0;
  const requested = parseInt(people, 10);

  if (current + requested > 30) {
    return { success: false, message: 'This slot is full. Please choose another time.' };
  }

  bookedSlots[key] = current + requested;

  await createGoogleCalendarEvent({ name, phone, email, service, date, time, people: requested });

  return { success: true, message: "Booking Confirmed! We'll WhatsApp you shortly." };
}
