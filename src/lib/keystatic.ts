import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

export const reader = createReader(process.cwd(), keystaticConfig);

export async function getSiteSettings() {
  return await reader.singletons.siteSettings.read();
}

export async function getSeo() {
  return await reader.singletons.seo.read();
}

export async function getHomepage() {
  return await reader.singletons.homepage.read();
}

export async function getAboutPage() {
  return await reader.singletons.aboutPage.read();
}

export async function getBookingPage() {
  return await reader.singletons.bookingPage.read();
}

export async function getLocationPage() {
  return await reader.singletons.locationPage.read();
}

export async function getContactPage() {
  return await reader.singletons.contactPage.read();
}

export async function getServices() {
  const slugs = await reader.collections.services.list();
  const services = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await reader.collections.services.read(slug);
      return entry ? { slug, ...entry } : null;
    })
  );
  return services
    .filter((s): s is NonNullable<typeof s> => s !== null)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export async function getFeaturedServices(count?: number) {
  const all = await getServices();
  const featured = all.filter((s) => s.featured);
  return count ? featured.slice(0, count) : featured;
}

export async function getPortfolio() {
  const slugs = await reader.collections.portfolio.list();
  const items = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await reader.collections.portfolio.read(slug);
      return entry ? { slug, ...entry } : null;
    })
  );
  return items
    .filter((i): i is NonNullable<typeof i> => i !== null)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export async function getFeaturedPortfolio(count?: number) {
  const all = await getPortfolio();
  const featured = all.filter((i) => i.featured);
  return count ? featured.slice(0, count) : featured;
}

export async function getTestimonials() {
  const slugs = await reader.collections.testimonials.list();
  const items = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await reader.collections.testimonials.read(slug);
      return entry ? { slug, ...entry } : null;
    })
  );
  return items
    .filter((i): i is NonNullable<typeof i> => i !== null)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export async function getFeaturedTestimonials() {
  const all = await getTestimonials();
  return all.filter((t) => t.featured);
}

export async function getFaq() {
  const slugs = await reader.collections.faq.list();
  const items = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await reader.collections.faq.read(slug);
      return entry ? { slug, ...entry } : null;
    })
  );
  return items
    .filter((i): i is NonNullable<typeof i> => i !== null)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}
