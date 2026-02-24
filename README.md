# Solo Barber Website Platform

A production-ready website platform for independent barbers. Built with Astro.js and Keystatic CMS, featuring 3 distinct visual themes — all editable through a browser-based CMS.

## Tech Stack

- **Framework:** Astro.js (static site generation)
- **CMS:** Keystatic (Cloud mode — clients edit via browser)
- **Hosting:** Vercel (static deployment)
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide (via astro-icon)

## Themes

Three built-in themes, switchable via a single CMS dropdown:

| Theme | Vibe | Default Accent |
|-------|------|---------------|
| **Fade** | Dark, premium, moody | Gold `#C8A050` |
| **Clean** | Light, minimal, breathable | Terracotta `#B86A4B` |
| **Chop** | Bold, editorial, high-energy | Electric blue `#2B4FFF` |

## Pages

- **Homepage** — Hero, intro, featured services, portfolio, testimonials, CTA
- **About** — Bio, specialties, certifications, personal section
- **Services & Pricing** — Grouped by category, scannable layout
- **Portfolio / Gallery** — Grid with lightbox, before/after support, filtering
- **Booking** — Embed widget or external link, walk-in info, cancellation policy
- **Location** — Multi-location support with maps, hours, availability
- **Contact** — Form (Formspree), direct contact info, social links
- **404** — Themed error page

## New Client Setup (Duplication Workflow)

This repo is a **GitHub Template Repository**. To set up a new client:

### 1. Create a new repo from this template

- Go to the GitHub repo page
- Click **"Use this template" > "Create a new repository"**
- Name it for the client (e.g., `marcus-fade-site`)
- Make it private

### 2. Connect to Keystatic Cloud

1. Go to [cloud.keystatic.com](https://cloud.keystatic.com)
2. Create a new project
3. Connect it to the new GitHub repo
4. Note the project slug (e.g., `your-team/marcus-fade-site`)

### 3. Update Keystatic config

In `keystatic.config.ts`, update the cloud project:

```ts
cloud: {
  project: 'your-team/client-repo-name',
},
```

### 4. Set up Formspree (contact form)

1. Go to [formspree.io](https://formspree.io)
2. Create a new form
3. Copy the endpoint URL
4. Enter it in the CMS: Contact Page > Formspree Endpoint URL

### 5. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import the new GitHub repo
3. Framework preset: **Astro**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add environment variable if needed:
   - `KEYSTATIC_STORAGE_KIND` = `cloud`
7. Deploy

### 6. Update site URL

In `astro.config.mjs`, update the `site` value:

```js
site: 'https://client-domain.com',
```

### 7. Add content

Direct the client to their Keystatic Cloud dashboard to:
1. Update Site Settings (name, phone, email, social links)
2. Choose their theme
3. Upload their logo and photos
4. Add services, portfolio items, testimonials
5. Fill in page content

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (includes Keystatic admin at /keystatic)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```
KEYSTATIC_STORAGE_KIND=local    # Use 'cloud' for production
PUBLIC_FORMSPREE_ENDPOINT=...   # Contact form endpoint
SITE_URL=https://example.com    # Your production URL
```

## Project Structure

```
src/
  components/
    common/       # Header, Footer, SEO, shared components
    home/         # Homepage sections
    about/        # About page sections
    services/     # Services page sections
    portfolio/    # Portfolio page sections
    booking/      # Booking page sections
    location/     # Location page sections
    contact/      # Contact form
  content/        # Keystatic-managed content (YAML + MDOC files)
  layouts/        # BaseLayout
  lib/            # Keystatic reader helpers
  pages/          # Astro page routes
  styles/         # Global CSS + theme system
public/
  images/         # Uploaded images (managed by Keystatic)
```

## Content Schema

All content is managed through Keystatic. The schema includes:

**Singletons:** Site Settings, SEO & Meta, Homepage, About Page, Booking Page, Location Page, Contact Page

**Collections:** Services, Portfolio, Testimonials, FAQ

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site |
| `npm run preview` | Preview production build locally |
