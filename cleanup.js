const fs = require('fs');
const TOKEN = fs.readFileSync('/home/hatch/workspace/cs619-event-platform/.api-token', 'utf8').trim();
const H = { 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json' };
const get = async (p) => (await (await fetch('http://localhost:1337' + p, { headers: H })).json()).data;
(async () => {
  const venues = await get('/api/venues?pagination[limit]=50');
  const seen = {}; const dups = [];
  venues.forEach(v => { if (seen[v.name]) dups.push(v.documentId); else seen[v.name] = v.documentId; });
  console.log('venues total:', venues.length, '| dups to delete:', dups.length);
  for (const d of dups) {
    const r = await fetch('http://localhost:1337/api/venues/' + d, { method: 'DELETE', headers: H });
    console.log('deleted dup', d.slice(0,8), r.status);
  }
  console.log('categories:', (await get('/api/categories?pagination[limit]=50')).length);
  console.log('events:', (await get('/api/events?pagination[limit]=50')).length);
  console.log('rsvps:', (await get('/api/rsvps?pagination[limit]=5')).length);
  console.log('reviews:', (await get('/api/reviews?pagination[limit]=5')).length);
})();
