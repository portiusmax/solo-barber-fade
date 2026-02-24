import { config, fields, singleton, collection } from '@keystatic/core';

const storage =
  process.env.KEYSTATIC_STORAGE_KIND === 'cloud'
    ? { kind: 'cloud' as const }
    : { kind: 'local' as const };

export default config({
  storage,
  cloud: {
    project: 'solo-barber/demo',
  },
  ui: {
    brand: { name: 'Solo Barber CMS' },
    navigation: {
      Settings: ['siteSettings', 'seo'],
      Pages: ['homepage', 'aboutPage', 'bookingPage', 'locationPage', 'contactPage'],
      Collections: ['services', 'portfolio', 'testimonials', 'faq'],
    },
  },
  singletons: {
    // ──────────────────────────────────────────
    // SITE SETTINGS
    // ──────────────────────────────────────────
    siteSettings: singleton({
      label: 'Site Settings',
      path: 'src/content/site-settings',
      schema: {
        siteTitle: fields.text({
          label: 'Site Title',
          description: 'Your name or brand name — displayed in the header and browser tab.',
        }),
        tagline: fields.text({
          label: 'Tagline',
          description: 'A short subtitle shown below your name (e.g. "Premium Cuts & Grooming").',
        }),
        theme: fields.select({
          label: 'Theme',
          description: 'Choose the visual style for your site.',
          options: [
            { label: 'Fade — Dark & Premium', value: 'fade' },
            { label: 'Clean — Light & Minimal', value: 'clean' },
            { label: 'Chop — Bold & Editorial', value: 'chop' },
          ],
          defaultValue: 'fade',
        }),
        accentColor: fields.text({
          label: 'Accent Color',
          description:
            'Override the default accent color. Use a hex value like #C8A050. Leave blank to use the theme default.',
        }),
        logo: fields.image({
          label: 'Logo',
          description: 'Optional logo image. If not provided, your site title text will be used.',
          directory: 'public/images/brand',
          publicPath: '/images/brand/',
        }),
        favicon: fields.image({
          label: 'Favicon',
          description: 'Small icon shown in browser tabs. Recommended: 32x32px SVG or PNG.',
          directory: 'public/images/brand',
          publicPath: '/images/brand/',
        }),
        socialLinks: fields.array(
          fields.object({
            platform: fields.select({
              label: 'Platform',
              options: [
                { label: 'Instagram', value: 'instagram' },
                { label: 'TikTok', value: 'tiktok' },
                { label: 'Facebook', value: 'facebook' },
                { label: 'X (Twitter)', value: 'x' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'Yelp', value: 'yelp' },
              ],
              defaultValue: 'instagram',
            }),
            url: fields.url({
              label: 'Profile URL',
            }),
          }),
          {
            label: 'Social Links',
            description: 'Add links to your social media profiles.',
            itemLabel: (props) => props.fields.platform.value || 'Social Link',
          }
        ),
        phone: fields.text({
          label: 'Phone Number',
          description: 'Your business phone number (e.g. "(555) 123-4567").',
        }),
        email: fields.text({
          label: 'Email Address',
          description: 'Your business email address.',
        }),
        footerText: fields.text({
          label: 'Footer Text',
          description: 'Copyright line shown in the footer (e.g. "© 2025 Marcus Fade. All rights reserved.").',
        }),
      },
    }),

    // ──────────────────────────────────────────
    // SEO / META
    // ──────────────────────────────────────────
    seo: singleton({
      label: 'SEO & Meta',
      path: 'src/content/seo',
      schema: {
        metaTitle: fields.text({
          label: 'Default Meta Title',
          description: 'The default title shown in search results (e.g. "Marcus Fade | Premium Barber in Chicago").',
        }),
        metaDescription: fields.text({
          label: 'Default Meta Description',
          description: 'A brief description of your business for search results. Keep it under 160 characters.',
          multiline: true,
        }),
        ogImage: fields.image({
          label: 'Open Graph Image',
          description:
            'Default image used when your site is shared on social media. Recommended: 1200x630px.',
          directory: 'public/images/seo',
          publicPath: '/images/seo/',
        }),
        gaId: fields.text({
          label: 'Google Analytics Measurement ID',
          description: 'Optional — your GA4 measurement ID (e.g. "G-XXXXXXXXXX"). Leave blank to disable.',
        }),
        businessName: fields.text({
          label: 'Business Name',
          description: 'Official business name for Google structured data.',
        }),
        businessType: fields.text({
          label: 'Business Type',
          description: 'Schema.org business type. Default: "BarberShop".',
          defaultValue: 'BarberShop',
        }),
        priceRange: fields.text({
          label: 'Price Range',
          description: 'Price range indicator (e.g. "$$" or "$20-$50").',
        }),
        geoLat: fields.text({
          label: 'Latitude',
          description: 'Geographic latitude of your primary location (e.g. "41.8781").',
        }),
        geoLng: fields.text({
          label: 'Longitude',
          description: 'Geographic longitude of your primary location (e.g. "-87.6298").',
        }),
        serviceArea: fields.text({
          label: 'Service Area',
          description: 'Description of your service area (e.g. "Chicago, IL and surrounding areas").',
        }),
      },
    }),

    // ──────────────────────────────────────────
    // HOMEPAGE
    // ──────────────────────────────────────────
    homepage: singleton({
      label: 'Homepage',
      path: 'src/content/homepage/',
      schema: {
        heroHeading: fields.text({
          label: 'Hero Heading',
          description: 'The big headline in the hero section.',
        }),
        heroSubheading: fields.text({
          label: 'Hero Subheading',
          description: 'Smaller text below the main headline.',
        }),
        heroCtaText: fields.text({
          label: 'Hero Button Text',
          description: 'Text on the main call-to-action button (e.g. "Book Now").',
        }),
        heroCtaLink: fields.text({
          label: 'Hero Button Link',
          description: 'Where the hero button links to (e.g. "/booking" or an external URL).',
          defaultValue: '/booking',
        }),
        heroImage: fields.image({
          label: 'Hero Background Image',
          description: 'A striking background image for the hero. Recommended: at least 1920x1080px.',
          directory: 'public/images/hero',
          publicPath: '/images/hero/',
        }),
        introHeading: fields.text({
          label: 'Introduction Heading',
          description: 'Heading for the intro section below the hero.',
        }),
        introText: fields.document({
          label: 'Introduction Text',
          description: 'A brief personal introduction. Keep it to 2-3 short paragraphs.',
          formatting: true,
          links: true,
        }),
        introImage: fields.image({
          label: 'Introduction Image',
          description: 'Photo for the intro section. Recommended: 800x1000px portrait.',
          directory: 'public/images/home',
          publicPath: '/images/home/',
        }),
        showFeaturedServices: fields.checkbox({
          label: 'Show Featured Services',
          description: 'Toggle the featured services section on the homepage.',
          defaultValue: true,
        }),
        featuredServicesHeading: fields.text({
          label: 'Featured Services Heading',
          description: 'Heading for the featured services section.',
          defaultValue: 'Services',
        }),
        featuredServicesCount: fields.integer({
          label: 'Number of Featured Services',
          description: 'How many featured services to display.',
          defaultValue: 3,
        }),
        showFeaturedWork: fields.checkbox({
          label: 'Show Featured Work',
          description: 'Toggle the portfolio/work section on the homepage.',
          defaultValue: true,
        }),
        featuredWorkHeading: fields.text({
          label: 'Featured Work Heading',
          description: 'Heading for the featured work section.',
          defaultValue: 'Recent Work',
        }),
        featuredWorkCount: fields.integer({
          label: 'Number of Portfolio Items',
          description: 'How many portfolio items to show.',
          defaultValue: 6,
        }),
        showTestimonials: fields.checkbox({
          label: 'Show Testimonials',
          description: 'Toggle the testimonials section on the homepage.',
          defaultValue: true,
        }),
        testimonialsHeading: fields.text({
          label: 'Testimonials Heading',
          description: 'Heading for the testimonials section.',
          defaultValue: 'What Clients Say',
        }),
        ctaBannerHeading: fields.text({
          label: 'CTA Banner Heading',
          description: 'Heading for the bottom call-to-action banner.',
        }),
        ctaBannerText: fields.text({
          label: 'CTA Banner Text',
          description: 'Supporting text for the CTA banner.',
        }),
        ctaBannerButtonText: fields.text({
          label: 'CTA Banner Button Text',
          defaultValue: 'Book Your Appointment',
        }),
        ctaBannerButtonLink: fields.text({
          label: 'CTA Banner Button Link',
          defaultValue: '/booking',
        }),
      },
    }),

    // ──────────────────────────────────────────
    // ABOUT PAGE
    // ──────────────────────────────────────────
    aboutPage: singleton({
      label: 'About Page',
      path: 'src/content/about-page/',
      schema: {
        pageHeading: fields.text({
          label: 'Page Heading',
          defaultValue: 'About Me',
        }),
        bio: fields.document({
          label: 'Main Bio',
          description:
            'Your story — who you are, how you got into barbering, what drives you. Supports bold, italic, links, and multiple paragraphs.',
          formatting: true,
          links: true,
        }),
        profilePhoto: fields.image({
          label: 'Profile Photo',
          description: 'Your main portrait. Recommended: 800x1000px.',
          directory: 'public/images/about',
          publicPath: '/images/about/',
        }),
        secondaryPhoto: fields.image({
          label: 'Secondary Photo',
          description: 'Optional second photo for a two-image layout.',
          directory: 'public/images/about',
          publicPath: '/images/about/',
        }),
        yearsExperience: fields.integer({
          label: 'Years of Experience',
          description: 'How many years you\'ve been cutting hair.',
        }),
        specialties: fields.array(fields.text({ label: 'Specialty' }), {
          label: 'Specialties',
          description: 'List your specialties (e.g. "Fades", "Beard Sculpting", "Hot Towel Shaves").',
          itemLabel: (props) => props.value || 'Specialty',
        }),
        certifications: fields.document({
          label: 'Training & Certifications',
          description: 'Optional — training background, licenses, certifications.',
          formatting: true,
          links: true,
        }),
        personalHeading: fields.text({
          label: 'Personal Section Heading',
          description: 'Heading for the personal/off-duty section.',
          defaultValue: 'Outside the Chair',
        }),
        personalText: fields.document({
          label: 'Personal Section Text',
          description: 'A bit about you outside of work — hobbies, family, community involvement.',
          formatting: true,
          links: true,
        }),
        personalImage: fields.image({
          label: 'Personal Section Image',
          description: 'Optional photo for the personal section.',
          directory: 'public/images/about',
          publicPath: '/images/about/',
        }),
      },
    }),

    // ──────────────────────────────────────────
    // BOOKING PAGE
    // ──────────────────────────────────────────
    bookingPage: singleton({
      label: 'Booking Page',
      path: 'src/content/booking-page/',
      schema: {
        pageHeading: fields.text({
          label: 'Page Heading',
          defaultValue: 'Book an Appointment',
        }),
        pageDescription: fields.document({
          label: 'Page Description',
          description: 'Instructions, notes, or cancellation policy shown above the booking widget.',
          formatting: true,
          links: true,
        }),
        bookingMethod: fields.select({
          label: 'Booking Method',
          description: 'How clients book — embed a widget, link to an external site, or both.',
          options: [
            { label: 'Embed Widget', value: 'embed' },
            { label: 'External Link', value: 'external_link' },
            { label: 'Both (Embed + Link)', value: 'both' },
          ],
          defaultValue: 'external_link',
        }),
        embedCode: fields.text({
          label: 'Embed Code',
          description:
            'Paste the full embed code (HTML/iframe) from your booking platform (e.g. Square, Booksy, Vagaro).',
          multiline: true,
        }),
        externalBookingUrl: fields.url({
          label: 'External Booking URL',
          description: 'Link to your booking page on Square, Booksy, etc.',
        }),
        externalBookingButtonText: fields.text({
          label: 'External Booking Button Text',
          defaultValue: 'Book Now',
        }),
        showWalkInInfo: fields.checkbox({
          label: 'Show Walk-In Information',
          defaultValue: false,
        }),
        walkInText: fields.document({
          label: 'Walk-In Information',
          description: 'Details about walk-in availability, hours, etc.',
          formatting: true,
          links: true,
        }),
        cancellationPolicy: fields.document({
          label: 'Cancellation Policy',
          description: 'Optional cancellation/no-show policy.',
          formatting: true,
          links: true,
        }),
      },
    }),

    // ──────────────────────────────────────────
    // LOCATION PAGE
    // ──────────────────────────────────────────
    locationPage: singleton({
      label: 'Location Page',
      path: 'src/content/location-page/',
      schema: {
        pageHeading: fields.text({
          label: 'Page Heading',
          defaultValue: 'Find Me',
        }),
        locations: fields.array(
          fields.object({
            shopName: fields.text({ label: 'Shop Name' }),
            address1: fields.text({ label: 'Address Line 1' }),
            address2: fields.text({ label: 'Address Line 2 (optional)' }),
            city: fields.text({ label: 'City' }),
            state: fields.text({ label: 'State' }),
            zip: fields.text({ label: 'ZIP Code' }),
            mapEmbedUrl: fields.url({
              label: 'Google Maps Embed URL',
              description:
                'Go to Google Maps → Share → Embed a map → copy the src URL from the iframe code.',
            }),
            daysAvailable: fields.multiselect({
              label: 'Days Available',
              options: [
                { label: 'Monday', value: 'mon' },
                { label: 'Tuesday', value: 'tue' },
                { label: 'Wednesday', value: 'wed' },
                { label: 'Thursday', value: 'thu' },
                { label: 'Friday', value: 'fri' },
                { label: 'Saturday', value: 'sat' },
                { label: 'Sunday', value: 'sun' },
              ],
            }),
            hours: fields.text({
              label: 'Hours',
              description: 'e.g. "9am - 6pm"',
            }),
            notes: fields.text({
              label: 'Notes',
              description: 'Optional — e.g. "By appointment only on Saturdays".',
            }),
          }),
          {
            label: 'Locations',
            description: 'Add each shop or location where you cut hair.',
            itemLabel: (props) => props.fields.shopName.value || 'Location',
          }
        ),
        showMobileServices: fields.checkbox({
          label: 'Offer Mobile / House Calls',
          defaultValue: false,
        }),
        mobileDescription: fields.document({
          label: 'Mobile Service Description',
          description: 'Details about your mobile or house call services.',
          formatting: true,
          links: true,
        }),
        parkingInstructions: fields.text({
          label: 'Parking / Access Instructions',
          description: 'Optional — parking tips or building access instructions.',
          multiline: true,
        }),
      },
    }),

    // ──────────────────────────────────────────
    // CONTACT PAGE
    // ──────────────────────────────────────────
    contactPage: singleton({
      label: 'Contact Page',
      path: 'src/content/contact-page/',
      schema: {
        pageHeading: fields.text({
          label: 'Page Heading',
          defaultValue: 'Get in Touch',
        }),
        showContactForm: fields.checkbox({
          label: 'Show Contact Form',
          description: 'Toggle the contact form on/off.',
          defaultValue: true,
        }),
        formspreeEndpoint: fields.text({
          label: 'Formspree Endpoint URL',
          description: 'Your Formspree form URL (e.g. "https://formspree.io/f/xyzabc").',
        }),
        additionalInfo: fields.document({
          label: 'Additional Contact Info',
          description: 'Any additional text to display on the contact page.',
          formatting: true,
          links: true,
        }),
      },
    }),
  },

  // ──────────────────────────────────────────
  // COLLECTIONS
  // ──────────────────────────────────────────
  collections: {
    services: collection({
      label: 'Services',
      slugField: 'name',
      path: 'src/content/services/*/',
      schema: {
        name: fields.slug({
          name: { label: 'Service Name' },
        }),
        description: fields.document({
          label: 'Description',
          formatting: true,
          links: true,
        }),
        price: fields.text({
          label: 'Price',
          description: 'e.g. "$30", "$25-40", "Starting at $50".',
        }),
        duration: fields.text({
          label: 'Duration',
          description: 'e.g. "45 min", "1 hour".',
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Haircuts', value: 'haircuts' },
            { label: 'Beard', value: 'beard' },
            { label: 'Treatments', value: 'treatments' },
            { label: 'Packages', value: 'packages' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'haircuts',
        }),
        image: fields.image({
          label: 'Image',
          description: 'Optional image for this service. Recommended: 600x400px.',
          directory: 'public/images/services',
          publicPath: '/images/services/',
        }),
        featured: fields.checkbox({
          label: 'Featured',
          description: 'Show this service on the homepage.',
          defaultValue: false,
        }),
        sortOrder: fields.integer({
          label: 'Sort Order',
          description: 'Lower numbers appear first.',
          defaultValue: 0,
        }),
      },
    }),

    portfolio: collection({
      label: 'Portfolio',
      slugField: 'title',
      path: 'src/content/portfolio/*',
      schema: {
        title: fields.slug({
          name: { label: 'Title', description: 'e.g. "Skin Fade + Beard Lineup"' },
        }),
        image: fields.image({
          label: 'Image',
          description: 'Main photo of the cut. Recommended: 800x800px square.',
          directory: 'public/images/portfolio',
          publicPath: '/images/portfolio/',
        }),
        beforeImage: fields.image({
          label: 'Before Image',
          description: 'Optional — for before/after comparisons.',
          directory: 'public/images/portfolio',
          publicPath: '/images/portfolio/',
        }),
        categoryTag: fields.text({
          label: 'Category / Style Tag',
          description: 'e.g. "Fade", "Beard", "Textured Crop".',
        }),
        description: fields.text({
          label: 'Short Description',
          description: 'Optional brief description of the style.',
        }),
        featured: fields.checkbox({
          label: 'Featured',
          description: 'Show this item on the homepage.',
          defaultValue: false,
        }),
        sortOrder: fields.integer({
          label: 'Sort Order',
          defaultValue: 0,
        }),
      },
    }),

    testimonials: collection({
      label: 'Testimonials',
      slugField: 'clientName',
      path: 'src/content/testimonials/*',
      schema: {
        clientName: fields.slug({
          name: { label: 'Client Name', description: 'First name or initials.' },
        }),
        quote: fields.text({
          label: 'Quote',
          description: 'The testimonial text.',
          multiline: true,
        }),
        rating: fields.select({
          label: 'Rating',
          options: [
            { label: '5 Stars', value: '5' },
            { label: '4 Stars', value: '4' },
            { label: '3 Stars', value: '3' },
            { label: '2 Stars', value: '2' },
            { label: '1 Star', value: '1' },
          ],
          defaultValue: '5',
        }),
        date: fields.text({
          label: 'Date',
          description: 'Optional — e.g. "January 2025".',
        }),
        source: fields.text({
          label: 'Source',
          description: 'Optional — e.g. "Google Review", "Yelp".',
        }),
        featured: fields.checkbox({
          label: 'Featured',
          description: 'Show on homepage.',
          defaultValue: false,
        }),
        sortOrder: fields.integer({
          label: 'Sort Order',
          defaultValue: 0,
        }),
      },
    }),

    faq: collection({
      label: 'FAQ',
      slugField: 'question',
      path: 'src/content/faq/*/',
      schema: {
        question: fields.slug({
          name: { label: 'Question' },
        }),
        answer: fields.document({
          label: 'Answer',
          formatting: true,
          links: true,
        }),
        sortOrder: fields.integer({
          label: 'Sort Order',
          defaultValue: 0,
        }),
      },
    }),
  },
});
