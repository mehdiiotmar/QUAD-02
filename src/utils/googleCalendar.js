export function createGoogleCalendarEvent({ name, phone, email, service, date, time, people }) {
  console.log('📅 Calendar event to create:', { name, phone, email, service, date, time, people });
  return Promise.resolve({ status: 'placeholder', id: null });
}
