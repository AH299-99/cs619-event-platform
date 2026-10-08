import type { Core } from '@strapi/strapi';

const seedData = {
  categories: [
    { name: 'Music', slug: 'music', color: '#e11d48', icon: 'music', description: 'Music events around the city' },
    { name: 'Sports', slug: 'sports', color: '#16a34a', icon: 'trophy', description: 'Sports events around the city' },
    { name: 'Technology', slug: 'technology', color: '#2563eb', icon: 'cpu', description: 'Technology events around the city' },
    { name: 'Art & Culture', slug: 'art-culture', color: '#9333ea', icon: 'palette', description: 'Art & Culture events around the city' },
    { name: 'Food & Drink', slug: 'food-drink', color: '#ea580c', icon: 'utensils', description: 'Food & Drink events around the city' },
    { name: 'Community Service', slug: 'community-service', color: '#0d9488', icon: 'heart', description: 'Community Service events around the city' },
  ],
  venues: [
    { name: 'Peshawar Services Club', address: 'Khyber Road', city: 'Peshawar', region: 'Khyber Pakhtunkhwa', latitude: 34.008, longitude: 71.578 },
    { name: 'Nishtar Hall', address: 'Cinema Road', city: 'Peshawar', region: 'Khyber Pakhtunkhwa', latitude: 34.012, longitude: 71.583 },
    { name: 'Islamia College Ground', address: 'Jamrud Road', city: 'Peshawar', region: 'Khyber Pakhtunkhwa', latitude: 34.002, longitude: 71.571 },
  ],
  events: [
    { title: 'Peshawar Music Night', slug: 'peshawar-music-night', category: 'music', venue: 'Peshawar Services Club', shortDescription: 'Live Pashto and Urdu music concert under the stars.', description: 'Live Pashto and Urdu music concert under the stars.', ticketPrice: 500, isFree: false, featured: true },
    { title: 'Tech Innovators Meetup', slug: 'tech-innovators-meetup', category: 'technology', venue: 'Nishtar Hall', shortDescription: 'Monthly meetup for developers and startups of Peshawar.', description: 'Monthly meetup for developers and startups of Peshawar.', ticketPrice: 0, isFree: true, featured: true },
    { title: 'City Marathon 2026', slug: 'city-marathon-2026', category: 'sports', venue: 'Islamia College Ground', shortDescription: 'Annual 10km city marathon — all ages welcome.', description: 'Annual 10km city marathon — all ages welcome.', ticketPrice: 200, isFree: false, featured: false },
    { title: 'Food Street Festival', slug: 'food-street-festival', category: 'food-drink', venue: 'Peshawar Services Club', shortDescription: 'Taste 50+ local dishes from Peshawar food street vendors.', description: 'Taste 50+ local dishes from Peshawar food street vendors.', ticketPrice: 100, isFree: false, featured: false },
  ],
};

async function seed(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::category.category').findMany({ limit: 1 });
  if (existing.length > 0) {
    strapi.log.info('Seed: data already exists, skipping');
    return;
  }
  strapi.log.info('Seed: creating demo data...');
  const catIds: Record<string, string> = {};
  for (const c of seedData.categories) {
    const created: any = await strapi.documents('api::category.category').create({
      data: { ...c, publishedAt: new Date() },
    });
    catIds[c.slug] = created.documentId;
  }
  const venueIds: Record<string, string> = {};
  for (const v of seedData.venues) {
    const created: any = await strapi.documents('api::venue.venue').create({
      data: { ...v, publishedAt: new Date() },
    });
    venueIds[v.name] = created.documentId;
  }
  for (const e of seedData.events) {
    await strapi.documents('api::event.event').create({
      data: {
        title: e.title,
        slug: e.slug,
        shortDescription: e.shortDescription,
        description: e.description,
        category: catIds[e.category],
        venue: venueIds[e.venue],
        startDate: '2026-11-15T18:00:00.000Z',
        endDate: '2026-11-15T22:00:00.000Z',
        ticketPrice: e.ticketPrice,
        isFree: e.isFree,
        featured: e.featured,
        organizerName: 'Hayat Events',
        organizerContact: '0300-0000000',
        publishedAt: new Date(),
      },
    });
  }
  strapi.log.info('Seed: demo data created (6 categories, 3 venues, 4 events)');
}

export default {
  register() {},
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Seed demo data on fresh databases (e.g. first production deploy).
    // Set SEED_DEMO=false to disable.
    if (process.env.SEED_DEMO !== 'false') {
      try {
        await seed(strapi);
      } catch (err) {
        strapi.log.warn(`Seed skipped: ${(err as Error).message}`);
      }
    }
  },
};
