const BASE = 'http://localhost:1337';
let TOKEN = '';
async function api(method, path, body) {
  const r = await fetch(BASE + path, {
    method, headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + TOKEN },
    body: body ? JSON.stringify({ data: body }) : undefined,
  });
  const j = await r.json();
  if (j.error) { console.log('ERR', path, JSON.stringify(j.error).slice(0, 200)); return null; }
  return j.data;
}
(async () => {
  // login
  const lr = await fetch(BASE + '/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@eventplatform.local', password: 'Admin123!@#' }) });
  const lj = await lr.json();
  TOKEN = lj.data.token;
  console.log('logged in');

  const cats = {};
  for (const [name, color, icon] of [
    ['Music', '#e11d48', 'music'], ['Sports', '#16a34a', 'trophy'],
    ['Technology', '#2563eb', 'cpu'], ['Art & Culture', '#9333ea', 'palette'],
    ['Food & Drink', '#ea580c', 'utensils'], ['Community Service', '#0d9488', 'heart'],
  ]) {
    const c = await api('POST', '/api/categories', { name, color, icon, description: name + ' events', publishedAt: new Date().toISOString() });
    if (c) cats[name] = c.id;
  }
  console.log('categories:', Object.keys(cats).length);

  const venues = {};
  for (const [name, address, city, lat, lng] of [
    ['Peshawar Services Club', 'Khyber Road', 'Peshawar', 34.008, 71.578],
    ['Nishtar Hall', 'Cinema Road', 'Peshawar', 34.012, 71.583],
    ['Islamia College Ground', 'Jamrud Road', 'Peshawar', 34.002, 71.571],
  ]) {
    const v = await api('POST', '/api/venues', { name, address, city, region: 'Khyber Pakhtunkhwa', latitude: lat, longitude: lng, publishedAt: new Date().toISOString() });
    if (v) venues[name] = v.id;
  }
  console.log('venues:', Object.keys(venues).length);

  const evs = [
    ['Peshawar Music Night', 'Music', 'Peshawar Services Club', 'Live Pashto and Urdu music concert under the stars.', 500, false, true],
    ['Tech Innovators Meetup', 'Technology', 'Nishtar Hall', 'Monthly meetup for developers and startups of Peshawar.', 0, true, true],
    ['City Marathon 2026', 'Sports', 'Islamia College Ground', 'Annual 10km city marathon — all ages welcome.', 200, false, false],
    ['Food Street Festival', 'Food & Drink', 'Peshawar Services Club', 'Taste 50+ local dishes from Peshawar food street vendors.', 100, false, false],
  ];
  let n = 0;
  for (const [title, cat, ven, desc, price, free, featured] of evs) {
    const e = await api('POST', '/api/events', {
      title, shortDescription: desc.slice(0, 80), description: desc,
      category: cats[cat], venue: venues[ven],
      startDate: '2026-11-15T18:00:00.000Z', endDate: '2026-11-15T22:00:00.000Z',
      ticketPrice: price, isFree: free, featured,
      organizerName: 'Hayat Events', organizerContact: '0300-0000000',
      publishedAt: new Date().toISOString(),
    });
    if (e) n++;
  }
  console.log('events:', n);
})();
