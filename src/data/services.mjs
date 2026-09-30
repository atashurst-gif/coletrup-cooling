/**
 * SERVICE PAGE CONTENT
 * ---------------------------------------------------------------------
 * Every service page is generated from this file. Copy follows the
 * Developer Build Specification. House rules for anyone editing:
 *  - Refrigeration is servicing, maintenance, fault finding and repairs ONLY.
 *    Never add refrigeration installation, replacement or supply wording.
 *  - No response times, guarantees, prices, accreditations, brands,
 *    years trading or town names unless verified and added to site.config.
 *
 * Quote defaults: service = 'air-conditioning' | 'refrigeration' | 'repair'
 *                 | 'servicing-maintenance'; type = 'residential' | 'commercial'
 * Tracking: cta.track = residential | commercial | repair | maintenance
 *           | refrigeration | installation
 * ---------------------------------------------------------------------
 */

export const services = [
  // =================================================================
  // RESIDENTIAL
  // =================================================================
  {
    slug: 'residential-air-conditioning',
    group: 'residential',
    navLabel: 'Residential Air Conditioning',
    seo: {
      title: 'Residential Air Conditioning for Homes | Coletrup Cooling',
      description:
        'Professional residential air conditioning installation, servicing and repairs, designed around your home, your lifestyle and the cooling you need.',
    },
    breadcrumb: [],
    hero: {
      eyebrow: 'Residential air conditioning',
      h1: 'Comfortable cooling for your home.',
      lead: 'Professional air conditioning installation, servicing and repairs for homes, designed around your property, your lifestyle and the cooling you need.',
      image: 'livingRoom',
      imagePosition: '60% 50%',
      chips: ['Installation', 'Repairs', 'Servicing', 'Maintenance'],
    },
    cta: { label: 'Get a residential quote', service: 'air-conditioning', type: 'residential', track: 'residential' },
    whatsappMessage: "Hi Coletrup Cooling, I'd like a quote for air conditioning at home.",
    sections: [
      {
        type: 'intro',
        eyebrow: 'Designed around you',
        title: 'Air conditioning that fits the way you live.',
        body: [
          'Every home is different. The layout of your rooms, how each space is used and how many rooms you would like to cool all shape the right approach.',
          "We take the time to understand your property and what you want to achieve, then recommend a solution that suits your home rather than a one-size-fits-all system. Once it's in, we can keep it serviced and look after any repairs.",
        ],
        aside: {
          title: 'We design around',
          items: [
            { icon: 'home', title: 'Your property', text: 'Layout, rooms and the spaces you want to cool.' },
            { icon: 'users', title: 'Your lifestyle', text: 'How you use each room, day and night.' },
            { icon: 'thermometer', title: 'Your cooling requirements', text: 'The level of comfort you want to achieve.' },
          ],
        },
      },
      {
        type: 'features',
        variant: 'photos',
        tone: 'white',
        eyebrow: 'Rooms we help with',
        title: 'Cooling for every part of your home.',
        items: [
          { icon: 'bed', title: 'Bedrooms', text: 'More comfortable nights when the weather turns warm.', image: 'bedroom' },
          { icon: 'sofa', title: 'Living rooms', text: 'A cooler, more comfortable space for everyone at home.', image: 'livingRoomBifold' },
          { icon: 'laptop', title: 'Home offices', text: 'A more comfortable place to focus through the working day.', image: 'homeOffice' },
          { icon: 'extension', title: 'Extensions & garden rooms', text: 'Cooling for new and extended living spaces.', image: 'gardenRoom' },
          { icon: 'open-plan', title: 'Open-plan spaces', text: 'Solutions for larger, open living areas.', image: 'openPlanLiving' },
          { icon: 'rooms', title: 'Multiple rooms', text: 'Options for cooling several rooms across your home.', image: 'kitchenDiner' },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Residential services',
        title: 'Everything your home system needs.',
        items: [
          { icon: 'ac-unit', title: 'Air Conditioning Installation', text: 'The right system, planned around your rooms and professionally installed.', href: '/air-conditioning-installation/', image: 'engineerHomeDark', track: 'installation' },
          { icon: 'wrench', title: 'Air Conditioning Repairs', text: "Not cooling, leaking or noisy? We'll find the fault and repair it.", href: '/air-conditioning-repairs/', image: 'engineerGauges', track: 'repair' },
          { icon: 'gauge', title: 'Servicing & Maintenance', text: 'Regular checks and cleaning to keep your system performing well.', href: '/air-conditioning-servicing-maintenance/', image: 'outdoorFan', track: 'maintenance' },
        ],
      },
      {
        type: 'split',
        tone: 'white',
        image: 'van',
        imageSide: 'left',
        eyebrow: 'Start to finish',
        title: 'A professional service, from first conversation to finished job.',
        body: [
          "Whether you're installing air conditioning for the first time, maintaining an existing system or need a fault repaired, you'll get clear advice and a professional, respectful approach in your home.",
        ],
        bullets: ['Clear advice on the right approach', 'Professional installation', 'Servicing and repairs when you need them'],
      },
    ],
    faqs: [
      { q: 'Can you install air conditioning in just one room?', a: "Yes. Whether you'd like to cool a single bedroom or home office, or several rooms across your home, we'll recommend an approach that suits your property." },
      { q: 'Do you service and repair existing systems?', a: 'Yes. As well as new installations, we service, maintain and repair residential air conditioning systems.' },
      { q: 'Can air conditioning work in an extension or open-plan space?', a: "Extensions and open-plan spaces are among the areas we help with. The right approach depends on the size and layout of the space, which we'll talk through with you." },
      { q: 'How do I get a quote?', a: "Use the quick quote form on this page, send us a WhatsApp or give us a call. We'll ask a few questions about your home and what you need, then talk you through the options." },
    ],
    related: ['air-conditioning-installation', 'air-conditioning-repairs', 'air-conditioning-servicing-maintenance', 'planned-maintenance-service-contracts'],
    schema: { serviceType: 'Residential air conditioning installation, servicing and repairs' },
  },

  {
    slug: 'air-conditioning-installation',
    group: 'residential',
    navLabel: 'Air Conditioning Installation',
    seo: {
      title: 'Air Conditioning Installation | Coletrup Cooling',
      description:
        'Air conditioning installation for homes and businesses. We take time to understand your requirements and recommend a system suited to your property.',
    },
    breadcrumb: [{ label: 'Residential Air Conditioning', href: '/residential-air-conditioning/' }],
    hero: {
      eyebrow: 'Air conditioning installation',
      h1: 'The right air conditioning system for your home or business.',
      lead: 'Installing air conditioning is an investment in your comfort. We take the time to understand your requirements, recommend a system suited to your property and install it professionally.',
      image: 'engineerInstallDining',
      imagePosition: '50% 45%',
      chips: ['Homes', 'Businesses'],
    },
    cta: { label: 'Get a quote', service: 'air-conditioning', type: '', track: 'installation' },
    whatsappMessage: "Hi Coletrup Cooling, I'd like a quote for air conditioning installation.",
    sections: [
      {
        type: 'steps',
        tone: 'white',
        eyebrow: 'Our approach',
        title: 'Getting it right, from the start.',
        items: [
          { title: 'Understanding your requirements', text: 'We start with your space: the rooms or areas you want to cool, how they are used and what matters most to you.' },
          { title: 'A system suited to your property', text: 'We recommend a system that suits your property and your cooling requirements, and explain the options clearly.' },
          { title: 'Professional installation', text: 'Your system is installed professionally, with care taken throughout your home or premises.' },
        ],
      },
      {
        type: 'duo',
        eyebrow: 'Homes and businesses',
        title: 'Installation for every kind of space.',
        items: [
          { icon: 'home', eyebrow: 'For your home', title: 'Residential installation', text: 'Bedrooms, living rooms, home offices, extensions, open-plan spaces and multiple rooms.', href: '/residential-air-conditioning/', linkLabel: 'Residential air conditioning', track: 'residential', image: 'gardenRoom' },
          { icon: 'building', eyebrow: 'For your business', title: 'Commercial installation', text: 'Offices, retail, hospitality, warehouses, commercial premises and workspaces.', href: '/commercial-air-conditioning/', linkLabel: 'Commercial air conditioning', track: 'commercial', image: 'commercialCassetteInstallDark' },
        ],
      },
      {
        type: 'callout',
        tone: 'white',
        icon: 'clipboard',
        title: 'Getting ready for your quote',
        intro: 'It helps to have a few details to hand when you get in touch:',
        items: ['Which rooms or areas you would like to cool', 'Roughly how each space is used', 'Your postcode', 'Any timing you have in mind'],
      },
      {
        type: 'split',
        image: 'engineerHome',
        imageSide: 'right',
        eyebrow: 'After installation',
        title: 'Keep it performing at its best.',
        body: [
          'Once your system is installed, regular servicing helps keep it clean and running as it should. If you would prefer scheduled visits, we can set up a planned maintenance arrangement.',
        ],
        links: [
          { label: 'Servicing & maintenance', href: '/air-conditioning-servicing-maintenance/', track: 'maintenance' },
          { label: 'Planned maintenance & service contracts', href: '/planned-maintenance-service-contracts/', track: 'maintenance' },
        ],
      },
    ],
    faqs: [
      { q: 'Do you install air conditioning for businesses as well as homes?', a: 'Yes. We install air conditioning for homes and for businesses, including offices, retail, hospitality, warehouses and other commercial premises.' },
      { q: 'How do you decide which system is right?', a: 'We look at your property, the space you want to cool and how it is used, then recommend a system that suits your requirements and explain why.' },
      { q: 'What happens after I request a quote?', a: "We'll get in touch to talk through your requirements, then recommend the right approach for your property." },
      { q: 'Can you service the system after it is installed?', a: 'Yes. We provide ongoing servicing and maintenance, as well as planned maintenance arrangements if you would prefer scheduled visits.' },
    ],
    related: ['residential-air-conditioning', 'commercial-air-conditioning', 'air-conditioning-servicing-maintenance', 'planned-maintenance-service-contracts'],
    schema: { serviceType: 'Air conditioning installation' },
  },

  {
    slug: 'air-conditioning-repairs',
    group: 'residential',
    navLabel: 'Air Conditioning Repairs',
    seo: {
      title: 'Air Conditioning Repairs & Fault Finding | Coletrup Cooling',
      description:
        "Air conditioning not cooling, leaking water or making unusual noises? We find the fault and repair your system. Request a repair online or on WhatsApp.",
    },
    breadcrumb: [{ label: 'Residential Air Conditioning', href: '/residential-air-conditioning/' }],
    hero: {
      eyebrow: 'Air conditioning repairs',
      h1: "When your air conditioning isn't working properly, we're here to help.",
      lead: "From systems that won't cool to leaks, unusual noises and electrical faults, we'll track down what's wrong and get your air conditioning working properly again.",
      image: 'engineerOutdoorGauges',
      imagePosition: '50% 45%',
      chips: ['Fault finding', 'Repairs'],
    },
    cta: { label: 'Request a repair', service: 'repair', type: 'residential', track: 'repair' },
    whatsappMessage: "Hi Coletrup Cooling, my air conditioning isn't working properly and I'd like to arrange a repair.",
    sections: [
      {
        type: 'features',
        variant: 'cards',
        tone: 'white',
        eyebrow: 'Common problems',
        title: 'Sound familiar?',
        intro: "These are some of the most common reasons people get in touch. If your problem isn't listed, just tell us what's happening.",
        items: [
          { icon: 'thermometer', title: 'System not cooling', text: "The system is running, but the room isn't getting any cooler." },
          { icon: 'wind', title: 'Poor airflow', text: 'Weak or uneven airflow from the indoor unit.' },
          { icon: 'droplet', title: 'Water leaks', text: 'Water dripping from, or pooling beneath, the indoor unit.' },
          { icon: 'sound', title: 'Unusual noises', text: 'Rattling, buzzing, clicking or other new sounds.' },
          { icon: 'activity', title: 'Performance issues', text: 'Taking longer to cool, or struggling to hold temperature.' },
          { icon: 'bolt', title: 'Electrical faults', text: 'Tripping, not powering on or cutting out.' },
          { icon: 'alert', title: 'System faults', text: 'Error codes, flashing lights or unexpected behaviour.' },
        ],
      },
      {
        type: 'steps',
        eyebrow: 'How repairs work',
        title: 'A clear, straightforward process.',
        items: [
          { title: "Tell us what's happening", text: 'Describe the problem, any error codes and when it started.' },
          { title: 'We diagnose the fault', text: 'We find the cause, rather than guessing at the symptoms.' },
          { title: 'We explain and repair', text: "We talk you through what's needed before carrying out the repair." },
        ],
      },
      {
        type: 'callout',
        tone: 'white',
        icon: 'clipboard',
        title: 'Before you get in touch',
        intro: 'A few details help us understand the problem:',
        items: ['Any error codes or flashing lights', 'When the problem started', "Whether it's getting worse", 'The make of your system, if you know it'],
      },
      {
        type: 'split',
        image: 'engineerHomeDark',
        imageSide: 'left',
        eyebrow: 'Prevent repeat problems',
        title: 'Servicing helps spot issues early.',
        body: [
          'Many problems build up gradually. Regular servicing gives us the chance to spot potential issues early, before they turn into a breakdown.',
        ],
        links: [
          { label: 'Air conditioning servicing & maintenance', href: '/air-conditioning-servicing-maintenance/', track: 'maintenance' },
          { label: 'Planned maintenance & service contracts', href: '/planned-maintenance-service-contracts/', track: 'maintenance' },
        ],
      },
    ],
    faqs: [
      { q: "My air conditioning is running but not cooling. What could it be?", a: "There are several possible causes, from airflow restrictions to system faults. The best next step is a proper diagnosis, so get in touch and tell us what you're seeing." },
      { q: 'Why is water leaking from my indoor unit?', a: 'Leaks can have a few different causes. Switch the system off if water is near anything electrical, and get in touch so we can find the cause.' },
      { q: 'Do you repair commercial air conditioning?', a: 'Yes. Businesses can find out more on our commercial air conditioning repairs page.' },
      { q: 'Can regular servicing help avoid repairs?', a: "Servicing helps identify potential issues early, which can reduce the chance of unexpected problems. It can't prevent every fault, but it gives your system the best chance of running smoothly." },
    ],
    related: ['air-conditioning-servicing-maintenance', 'residential-air-conditioning', 'commercial-air-conditioning-repairs', 'planned-maintenance-service-contracts'],
    schema: { serviceType: 'Air conditioning repairs' },
  },

  {
    slug: 'air-conditioning-servicing-maintenance',
    group: 'residential',
    navLabel: 'Air Conditioning Servicing & Maintenance',
    seo: {
      title: 'Air Conditioning Servicing & Maintenance | Coletrup Cooling',
      description:
        'Keep your air conditioning performing at its best with professional servicing: system inspection, filter checks, cleaning, performance and operational checks.',
    },
    breadcrumb: [{ label: 'Residential Air Conditioning', href: '/residential-air-conditioning/' }],
    hero: {
      eyebrow: 'Servicing & maintenance',
      h1: 'Keep your air conditioning performing at its best.',
      lead: 'Regular servicing helps keep your system clean and running as it should, and gives us the chance to spot potential issues early.',
      image: 'engineerFilterClean',
      imagePosition: '50% 45%',
      chips: ['Servicing', 'Maintenance'],
    },
    cta: { label: 'Book a service', service: 'servicing-maintenance', type: 'residential', track: 'maintenance' },
    whatsappMessage: "Hi Coletrup Cooling, I'd like to book an air conditioning service.",
    sections: [
      {
        type: 'checklist',
        tone: 'white',
        eyebrow: 'What a service covers',
        title: 'A thorough check of your system.',
        intro: 'Every service is tailored to your system, and typically includes:',
        items: [
          { icon: 'eye', title: 'System inspection', text: 'A visual check of the whole system and its condition.' },
          { icon: 'filter', title: 'Filter checks', text: 'Checking filters for dust and debris build-up.' },
          { icon: 'ac-unit', title: 'Indoor unit checks', text: 'Checking the indoor unit and its components.' },
          { icon: 'outdoor-unit', title: 'Outdoor unit checks', text: 'Checking the outdoor unit and the area around it.' },
          { icon: 'activity', title: 'Performance checks', text: 'Checking the system is cooling as it should.' },
          { icon: 'search', title: 'Fault identification', text: 'Spotting potential issues before they become problems.' },
          { icon: 'sparkles', title: 'Cleaning', text: 'Cleaning key components to help maintain performance.' },
          { icon: 'sliders', title: 'Operational checks', text: 'Making sure controls and settings work correctly.' },
        ],
        note: 'The exact checks depend on your system and how it is used.',
      },
      {
        type: 'features',
        variant: 'columns',
        tone: 'navy',
        eyebrow: 'Why it matters',
        title: 'Small checks that help avoid surprises.',
        items: [
          { icon: 'search', title: 'Spot issues early', text: 'Potential problems are easier to deal with when they are found early.' },
          { icon: 'gauge', title: 'Keep it performing', text: 'A clean, well-maintained system is better placed to perform as it should.' },
          { icon: 'calendar', title: 'Plan ahead', text: 'Regular servicing makes it easier to plan, rather than react.' },
        ],
      },
      {
        type: 'split',
        image: 'outdoorFan',
        imageSide: 'left',
        eyebrow: 'Homes and businesses',
        title: 'Servicing for one system or several.',
        body: [
          'We service air conditioning in homes and businesses. If you have several systems, or would prefer scheduled visits, a planned maintenance arrangement may suit you better.',
        ],
        links: [
          { label: 'Planned maintenance & service contracts', href: '/planned-maintenance-service-contracts/', track: 'maintenance' },
          { label: 'Commercial air conditioning maintenance', href: '/commercial-air-conditioning-maintenance/', track: 'maintenance' },
        ],
      },
    ],
    faqs: [
      { q: 'How often should air conditioning be serviced?', a: 'It depends on the system and how it is used. We can advise on a sensible servicing interval for your system.' },
      { q: "What's the difference between servicing and planned maintenance?", a: 'A service is a visit to inspect, clean and check your system. Planned maintenance is an ongoing arrangement with scheduled servicing, tailored to your equipment.' },
      { q: 'Will a service pick up faults?', a: "Fault identification is part of every service. If we find anything that needs attention, we'll explain it and talk you through the options." },
      { q: 'Do you service commercial systems too?', a: 'Yes. Businesses can find out more on our commercial air conditioning maintenance page.' },
    ],
    related: ['air-conditioning-repairs', 'planned-maintenance-service-contracts', 'residential-air-conditioning', 'commercial-air-conditioning-maintenance'],
    schema: { serviceType: 'Air conditioning servicing and maintenance' },
  },

  // =================================================================
  // COMMERCIAL
  // =================================================================
  {
    slug: 'commercial-air-conditioning',
    group: 'commercial',
    navLabel: 'Commercial Air Conditioning',
    seo: {
      title: 'Commercial Air Conditioning for Businesses | Coletrup Cooling',
      description:
        'Commercial air conditioning installation, servicing, maintenance and repairs for offices, retail, hospitality, warehouses and commercial premises.',
    },
    breadcrumb: [],
    hero: {
      eyebrow: 'Commercial air conditioning',
      h1: 'Reliable cooling for your business.',
      lead: 'Comfortable conditions matter to your team, your customers and your guests. We install, service, maintain and repair air conditioning for businesses and commercial premises.',
      image: 'commercialCassetteInstall',
      imagePosition: '50% 40%',
      chips: ['Installation', 'Servicing', 'Maintenance', 'Repairs'],
    },
    cta: { label: 'Get a commercial quote', service: 'air-conditioning', type: 'commercial', track: 'commercial' },
    whatsappMessage: "Hi Coletrup Cooling, I'd like a quote for commercial air conditioning.",
    sections: [
      {
        type: 'features',
        variant: 'tiles',
        tone: 'white',
        eyebrow: 'Where we work',
        title: 'Air conditioning for commercial spaces.',
        items: [
          { icon: 'building', title: 'Offices', text: 'Comfortable working environments for your team.' },
          { icon: 'store', title: 'Retail', text: 'A more comfortable space for customers and staff.' },
          { icon: 'hospitality', title: 'Hospitality', text: 'Comfort for guests in restaurants, bars, cafés and venues.' },
          { icon: 'warehouse', title: 'Warehouses', text: 'Cooling solutions for larger buildings and working areas.' },
          { icon: 'box', title: 'Commercial premises', text: 'Air conditioning for a wide range of business premises.' },
          { icon: 'briefcase', title: 'Workspaces', text: 'Studios, shared spaces and flexible workspaces.' },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Commercial services',
        title: 'Installation, servicing, maintenance and repairs.',
        items: [
          { icon: 'ac-unit', title: 'Installation', text: 'Systems suited to your premises, professionally installed.', href: '/air-conditioning-installation/', track: 'installation', image: 'officeBoardroom' },
          { icon: 'wrench', title: 'Commercial Repairs', text: 'Fault finding and repairs to keep your business comfortable.', href: '/commercial-air-conditioning-repairs/', track: 'repair', image: 'commercialRooftopGauges' },
          { icon: 'gauge', title: 'Commercial Maintenance', text: 'Planned maintenance for commercial systems.', href: '/commercial-air-conditioning-maintenance/', track: 'maintenance', image: 'commercialOfficeFilter' },
          { icon: 'calendar', title: 'Service Contracts', text: 'Tailored planned maintenance arrangements.', href: '/planned-maintenance-service-contracts/', track: 'maintenance', image: 'commercialRestaurantCheckDark' },
        ],
      },
      {
        type: 'split',
        tone: 'white',
        image: 'van',
        imageSide: 'right',
        eyebrow: 'Working with businesses',
        title: 'Planned properly around your premises.',
        body: [
          'Every business is different. We talk through your premises, how the space is used and any practical considerations, so the work is planned properly.',
          'Once your systems are running, planned maintenance helps keep them in good order and gives you better visibility of their condition.',
        ],
        links: [{ label: 'Planned maintenance & service contracts', href: '/planned-maintenance-service-contracts/', track: 'maintenance' }],
      },
    ],
    faqs: [
      { q: 'What types of business do you work with?', a: 'We provide commercial air conditioning for offices, retail, hospitality, warehouses, workspaces and other commercial premises.' },
      { q: 'Can you maintain our existing systems?', a: 'Yes. We provide servicing, maintenance and repairs for commercial air conditioning systems.' },
      { q: 'Do you offer maintenance contracts?', a: 'Yes. We offer planned maintenance and service contracts, tailored to your equipment and premises.' },
      { q: 'How do I get a commercial quote?', a: "Use the quote form on this page, send us a WhatsApp or give us a call. We'll talk through your premises and requirements." },
    ],
    related: ['commercial-air-conditioning-repairs', 'commercial-air-conditioning-maintenance', 'air-conditioning-installation', 'planned-maintenance-service-contracts'],
    schema: { serviceType: 'Commercial air conditioning installation, servicing, maintenance and repairs' },
  },

  {
    slug: 'commercial-air-conditioning-repairs',
    group: 'commercial',
    navLabel: 'Commercial Air Conditioning Repairs',
    seo: {
      title: 'Commercial Air Conditioning Repairs | Coletrup Cooling',
      description:
        'Fault finding and repairs for commercial air conditioning in offices, retail, hospitality and commercial premises, plus planned servicing to help reduce future issues.',
    },
    breadcrumb: [{ label: 'Commercial Air Conditioning', href: '/commercial-air-conditioning/' }],
    hero: {
      eyebrow: 'Commercial air conditioning repairs',
      h1: 'Keep your business running.',
      lead: "When air conditioning stops working properly, it affects everyone who uses the space. We provide fault finding and repairs for commercial systems, plus planned servicing to help reduce future issues.",
      image: 'commercialRooftopGauges',
      imagePosition: '50% 45%',
      chips: ['Fault finding', 'Repairs', 'Planned servicing'],
    },
    cta: { label: 'Request commercial support', service: 'repair', type: 'commercial', track: 'repair' },
    whatsappMessage: "Hi Coletrup Cooling, we have a problem with our commercial air conditioning and need support.",
    sections: [
      {
        type: 'features',
        variant: 'cards',
        tone: 'white',
        eyebrow: 'What we do',
        title: 'Commercial repairs and support.',
        items: [
          { icon: 'search', title: 'Fault finding', text: 'Methodical diagnosis to find the real cause of the problem.' },
          { icon: 'wrench', title: 'Repairs', text: 'Repairs carried out professionally, with the work explained clearly.' },
          { icon: 'activity', title: 'Performance issues', text: 'Systems struggling to cool, or behaving inconsistently.' },
          { icon: 'calendar', title: 'Planned servicing', text: 'Scheduled servicing to help reduce the chance of future faults.' },
        ],
      },
      {
        type: 'features',
        variant: 'list',
        eyebrow: 'Common issues',
        title: 'Signs your system needs attention.',
        items: [
          { icon: 'thermometer', title: 'Not cooling the space', text: "Staff or customers noticing it's too warm." },
          { icon: 'wind', title: 'Uneven temperatures', text: 'Some areas comfortable, others not.' },
          { icon: 'droplet', title: 'Leaks from indoor units', text: 'Water dripping onto floors, desks or stock.' },
          { icon: 'sound', title: 'Unusual noises', text: 'New rattles, buzzing or clicking.' },
          { icon: 'alert', title: 'Error codes', text: 'Fault codes or warning lights on the controller.' },
          { icon: 'bolt', title: 'Electrical faults', text: 'Units tripping, cutting out or not starting.' },
        ],
      },
      {
        type: 'split',
        tone: 'white',
        image: 'engineerRooftop',
        imageSide: 'right',
        eyebrow: 'Beyond the repair',
        title: 'Reduce the risk of repeat faults.',
        body: [
          'Once a fault is repaired, planned servicing helps identify potential issues early. We can put together a maintenance arrangement tailored to your systems and premises.',
        ],
        links: [
          { label: 'Commercial air conditioning maintenance', href: '/commercial-air-conditioning-maintenance/', track: 'maintenance' },
          { label: 'Planned maintenance & service contracts', href: '/planned-maintenance-service-contracts/', track: 'maintenance' },
        ],
      },
    ],
    faqs: [
      { q: 'Do you diagnose the fault before carrying out repairs?', a: "Yes. We find the cause of the problem first, then explain what's needed before carrying out the repair." },
      { q: 'Do you repair systems in offices, shops and hospitality venues?', a: 'Yes. We work with offices, retail, hospitality, warehouses and other commercial premises.' },
      { q: 'Can you help us avoid repeat faults?', a: 'Planned servicing helps identify potential issues early. We can talk through a maintenance arrangement for your systems.' },
    ],
    related: ['commercial-air-conditioning', 'commercial-air-conditioning-maintenance', 'planned-maintenance-service-contracts', 'air-conditioning-repairs'],
    schema: { serviceType: 'Commercial air conditioning repairs' },
  },

  {
    slug: 'commercial-air-conditioning-maintenance',
    group: 'commercial',
    navLabel: 'Commercial Air Conditioning Maintenance',
    seo: {
      title: 'Commercial Air Conditioning Maintenance | Coletrup Cooling',
      description:
        'Planned maintenance for commercial air conditioning: scheduled servicing, early fault identification, equipment management and tailored maintenance arrangements.',
    },
    breadcrumb: [{ label: 'Commercial Air Conditioning', href: '/commercial-air-conditioning/' }],
    hero: {
      eyebrow: 'Commercial maintenance',
      h1: 'Planned maintenance for commercial systems.',
      lead: 'Regular, planned maintenance helps keep your commercial air conditioning in good working order and gives you better visibility of its condition over time.',
      image: 'commercialOfficeFilter',
      imagePosition: '50% 40%',
      chips: ['Planned servicing', 'Tailored maintenance'],
    },
    cta: { label: 'Discuss maintenance', service: 'servicing-maintenance', type: 'commercial', track: 'maintenance' },
    whatsappMessage: "Hi Coletrup Cooling, I'd like to discuss maintenance for our commercial air conditioning.",
    sections: [
      {
        type: 'features',
        variant: 'cards',
        tone: 'white',
        eyebrow: "What's included",
        title: 'Maintenance built around your systems.',
        items: [
          { icon: 'calendar', title: 'Planned servicing', text: "Scheduled visits, so servicing doesn't slip down the list." },
          { icon: 'search', title: 'Early fault identification', text: 'Potential issues spotted early, before they become bigger problems.' },
          { icon: 'clipboard', title: 'Equipment management', text: 'A clearer picture of your systems and their condition over time.' },
          { icon: 'settings', title: 'Tailored maintenance', text: 'An arrangement shaped around your equipment, premises and how you use them.' },
        ],
      },
      {
        type: 'steps',
        eyebrow: 'How it works',
        title: 'Setting up a maintenance arrangement.',
        items: [
          { title: 'We look at your systems', text: 'We find out what you have, where it is and how it is used.' },
          { title: 'We agree a schedule', text: 'Together we agree a servicing schedule that suits your equipment.' },
          { title: 'Planned visits', text: 'Servicing is carried out as agreed, with checks tailored to each system.' },
          { title: 'Clear updates', text: 'We keep you informed about the condition of your equipment and any work it needs.' },
        ],
      },
      {
        type: 'split',
        tone: 'white',
        image: 'restaurantCassette',
        imageSide: 'left',
        eyebrow: 'Refrigeration too',
        title: 'Air conditioning and refrigeration, looked after together.',
        body: [
          'If your business also relies on refrigeration equipment, we provide servicing and maintenance for that too, so your cooling equipment can be looked after together.',
        ],
        links: [
          { label: 'Refrigeration repairs & maintenance', href: '/refrigeration-repairs-maintenance/', track: 'refrigeration' },
          { label: 'Planned maintenance & service contracts', href: '/planned-maintenance-service-contracts/', track: 'maintenance' },
        ],
      },
    ],
    faqs: [
      { q: 'Can a maintenance arrangement cover several systems?', a: 'Yes. Arrangements are tailored to your equipment, whether you have one system or several.' },
      { q: 'Do you also maintain refrigeration equipment?', a: 'Yes. We provide servicing and maintenance for refrigeration equipment, including display fridges and cold rooms.' },
      { q: 'What if a fault is found during a maintenance visit?', a: "We'll explain what we've found and talk you through the options before any repair work is carried out." },
    ],
    related: ['commercial-air-conditioning', 'commercial-air-conditioning-repairs', 'planned-maintenance-service-contracts', 'refrigeration-repairs-maintenance'],
    schema: { serviceType: 'Commercial air conditioning maintenance' },
  },

  // =================================================================
  // REFRIGERATION — servicing, maintenance, fault finding & repairs ONLY
  // =================================================================
  {
    slug: 'refrigeration-repairs-maintenance',
    group: 'refrigeration',
    navLabel: 'Refrigeration Repairs & Maintenance',
    seo: {
      title: 'Refrigeration Repairs & Maintenance | Coletrup Cooling',
      description:
        'Specialist refrigeration servicing, maintenance, fault finding and repairs for fridges, freezers, display fridges, cold rooms and commercial refrigeration equipment.',
    },
    breadcrumb: [],
    hero: {
      eyebrow: 'Refrigeration',
      h1: 'Keep your refrigeration equipment running.',
      lead: 'Specialist servicing, maintenance, fault finding and repairs for fridges, freezers, display fridges, cold rooms and commercial refrigeration equipment.',
      image: 'displayFridges',
      imagePosition: '40% 50%',
      chips: ['Servicing', 'Maintenance', 'Fault finding', 'Repairs'],
    },
    cta: { label: 'Request refrigeration support', service: 'refrigeration', type: '', track: 'refrigeration' },
    stickyPrompt: 'Need refrigeration support?',
    whatsappMessage: "Hi Coletrup Cooling, I need some help with refrigeration equipment.",
    sections: [
      {
        type: 'features',
        variant: 'cards',
        tone: 'white',
        eyebrow: 'What we do',
        title: 'Specialist refrigeration support.',
        intro: 'Refrigeration is a specialist part of what we do, focused on keeping your equipment in good working order.',
        items: [
          { icon: 'calendar', title: 'Servicing', text: 'Routine servicing to keep equipment clean and working as it should.' },
          { icon: 'clipboard', title: 'Maintenance', text: 'Ongoing and planned maintenance tailored to your equipment.' },
          { icon: 'search', title: 'Fault finding', text: 'Methodical diagnosis to get to the root of the problem.' },
          { icon: 'wrench', title: 'Repairs', text: 'Repairs to help get your equipment back to temperature.' },
        ],
      },
      {
        type: 'features',
        variant: 'tiles',
        eyebrow: 'Equipment we work on',
        title: 'Fridges, freezers, display fridges and cold rooms.',
        items: [
          { icon: 'fridge', title: 'Fridges', text: 'Keeping chilled storage at the right temperature.', href: '/fridge-freezer-repairs/' },
          { icon: 'freezer', title: 'Freezers', text: 'Keeping frozen storage working reliably.', href: '/fridge-freezer-repairs/' },
          { icon: 'display', title: 'Display fridges', text: 'Keeping products chilled and on show.', href: '/display-fridge-repairs-maintenance/' },
          { icon: 'cold-room', title: 'Cold rooms', text: 'Keeping larger chilled and frozen storage running.', href: '/cold-room-repairs-maintenance/' },
          { icon: 'box', title: 'Commercial refrigeration', text: 'Support for a range of commercial refrigeration equipment.' },
        ],
      },
      {
        type: 'links',
        tone: 'white',
        eyebrow: 'Refrigeration services',
        title: 'Find the right support.',
        items: [
          { icon: 'fridge', title: 'Fridge & Freezer Repairs', text: 'Not cooling, icing up or noisy? Fault finding and repairs.', href: '/fridge-freezer-repairs/', image: 'coldRoomEngineer', track: 'refrigeration' },
          { icon: 'cold-room', title: 'Cold Room Repairs & Maintenance', text: 'Fault finding, servicing, repairs and maintenance for cold rooms.', href: '/cold-room-repairs-maintenance/', image: 'coldRoom', track: 'refrigeration' },
          { icon: 'display', title: 'Display Fridge Repairs & Maintenance', text: 'Keep display refrigeration chilled and performing.', href: '/display-fridge-repairs-maintenance/', image: 'supermarketChillers', track: 'refrigeration' },
        ],
      },
      {
        type: 'features',
        variant: 'list',
        eyebrow: 'Warning signs',
        title: 'Signs your refrigeration needs attention.',
        items: [
          { icon: 'thermometer', title: 'Temperatures creeping up', text: 'Equipment struggling to hold its set temperature.' },
          { icon: 'ice', title: 'Ice build-up', text: "Frost or ice forming where it shouldn't." },
          { icon: 'sound', title: 'Unusual noises', text: 'New or louder sounds from the equipment.' },
          { icon: 'droplet', title: 'Water leaks', text: 'Water pooling around or beneath the unit.' },
          { icon: 'activity', title: 'Running constantly', text: 'Equipment that rarely seems to switch off.' },
          { icon: 'alert', title: 'Alarms or error codes', text: 'Warnings on the controller or display.' },
        ],
      },
      {
        type: 'split',
        tone: 'white',
        image: 'engineerGauges',
        imageSide: 'right',
        eyebrow: 'Planned maintenance',
        title: 'Regular care for equipment you rely on.',
        body: [
          'A planned maintenance arrangement gives your refrigeration equipment regular, scheduled attention and gives you better visibility of its condition.',
        ],
        links: [{ label: 'Planned maintenance & service contracts', href: '/planned-maintenance-service-contracts/', track: 'maintenance' }],
      },
    ],
    faqs: [
      { q: 'What refrigeration equipment do you work on?', a: 'We provide servicing, maintenance, fault finding and repairs for fridges, freezers, display fridges, cold rooms and commercial refrigeration equipment.' },
      { q: "Can you help if my equipment isn't holding temperature?", a: "Yes. Temperature problems are one of the most common reasons people get in touch. We'll find the cause and talk you through the repair." },
      { q: 'Do you offer planned maintenance for refrigeration?', a: 'Yes. Planned maintenance can be tailored to your refrigeration equipment and how you use it.' },
    ],
    related: ['fridge-freezer-repairs', 'cold-room-repairs-maintenance', 'display-fridge-repairs-maintenance', 'planned-maintenance-service-contracts'],
    schema: { serviceType: 'Refrigeration servicing, maintenance, fault finding and repairs' },
  },

  {
    slug: 'fridge-freezer-repairs',
    group: 'refrigeration',
    navLabel: 'Fridge & Freezer Repairs',
    seo: {
      title: 'Fridge & Freezer Repairs | Coletrup Cooling',
      description:
        'Fridge or freezer not cooling, icing up, leaking or making unusual noises? Specialist fault finding and repairs for fridges and freezers.',
    },
    breadcrumb: [{ label: 'Refrigeration', href: '/refrigeration-repairs-maintenance/' }],
    hero: {
      eyebrow: 'Fridge & freezer repairs',
      h1: 'Fridge or freezer not performing as it should?',
      lead: "Whether it's not cooling, struggling to hold temperature or making unusual noises, we'll find the fault and carry out the repair.",
      image: 'coldRoomEngineer',
      imagePosition: '55% 40%',
      chips: ['Fault finding', 'Repairs'],
    },
    cta: { label: 'Request a repair', service: 'refrigeration', type: '', track: 'refrigeration' },
    stickyPrompt: 'Need refrigeration support?',
    whatsappMessage: "Hi Coletrup Cooling, I have a fridge or freezer that needs repairing.",
    sections: [
      {
        type: 'features',
        variant: 'cards',
        tone: 'white',
        eyebrow: 'Common problems',
        title: 'What we can help with.',
        items: [
          { icon: 'thermometer', title: 'Not cooling', text: "Running, but not getting cold enough." },
          { icon: 'activity', title: 'Temperature problems', text: 'Temperatures fluctuating or creeping above where they should be.' },
          { icon: 'sound', title: 'Unusual noises', text: 'Humming, buzzing, knocking or clicking that is new or getting louder.' },
          { icon: 'ice', title: 'Ice build-up', text: 'Frost or ice building up faster than it should.' },
          { icon: 'droplet', title: 'Leaks', text: 'Water pooling inside or underneath the unit.' },
          { icon: 'bolt', title: 'Electrical faults', text: 'Tripping, not powering on or cutting out.' },
          { icon: 'gauge', title: 'Performance issues', text: 'Running constantly or struggling to keep up.' },
        ],
      },
      {
        type: 'callout',
        icon: 'clipboard',
        title: 'Before you get in touch',
        intro: 'These details help us understand the problem:',
        items: ["What the fridge or freezer is doing, or not doing", "The temperature it's showing, if it has a display", 'When the problem started', 'The make and model, if you know it'],
      },
      {
        type: 'steps',
        tone: 'white',
        eyebrow: 'How it works',
        title: 'From first message to repair.',
        items: [
          { title: "Tell us what's happening", text: 'Share the symptoms and any readings or error codes.' },
          { title: 'We find the fault', text: 'We diagnose the cause, not just the symptom.' },
          { title: 'We carry out the repair', text: "We explain what's needed, then carry out the repair." },
        ],
      },
      {
        type: 'split',
        image: 'supermarketChillers',
        imageSide: 'right',
        eyebrow: 'More refrigeration support',
        title: 'Display fridges and cold rooms too.',
        body: ['As well as fridges and freezers, we service, maintain and repair display fridges and cold rooms.'],
        links: [
          { label: 'Display fridge repairs & maintenance', href: '/display-fridge-repairs-maintenance/', track: 'refrigeration' },
          { label: 'Cold room repairs & maintenance', href: '/cold-room-repairs-maintenance/', track: 'refrigeration' },
        ],
      },
    ],
    faqs: [
      { q: 'My freezer keeps icing up. Is that a fault?', a: "Excessive ice build-up can point to several different issues. If it keeps happening, it's worth having it looked at." },
      { q: "My fridge is warmer than it should be. What should I do?", a: "Check the door is closing properly and nothing is blocking the vents. If the problem continues, get in touch and we'll find the cause." },
      { q: 'Do you also offer servicing?', a: 'Yes. Along with repairs, we provide servicing and maintenance for refrigeration equipment.' },
    ],
    related: ['refrigeration-repairs-maintenance', 'display-fridge-repairs-maintenance', 'cold-room-repairs-maintenance', 'planned-maintenance-service-contracts'],
    schema: { serviceType: 'Fridge and freezer repairs' },
  },

  {
    slug: 'cold-room-repairs-maintenance',
    group: 'refrigeration',
    navLabel: 'Cold Room Repairs & Maintenance',
    seo: {
      title: 'Cold Room Repairs & Maintenance | Coletrup Cooling',
      description:
        'Cold room fault finding, servicing, repairs and maintenance to help keep your cold room holding temperature and working as it should.',
    },
    breadcrumb: [{ label: 'Refrigeration', href: '/refrigeration-repairs-maintenance/' }],
    hero: {
      eyebrow: 'Cold rooms',
      h1: 'Cold room service & repairs.',
      lead: 'Cold rooms need to hold temperature reliably. We provide fault finding, servicing, repairs and maintenance to help keep yours working as it should.',
      image: 'coldRoom',
      imagePosition: '50% 40%',
      chips: ['Fault finding', 'Servicing', 'Repairs', 'Maintenance'],
    },
    cta: { label: 'Request a repair', service: 'refrigeration', type: 'commercial', track: 'refrigeration' },
    stickyPrompt: 'Need refrigeration support?',
    whatsappMessage: "Hi Coletrup Cooling, I need help with a cold room.",
    sections: [
      {
        type: 'features',
        variant: 'cards',
        tone: 'white',
        eyebrow: 'What we do',
        title: 'Keeping your cold room in good order.',
        items: [
          { icon: 'search', title: 'Fault finding', text: "Methodical diagnosis when your cold room isn't performing." },
          { icon: 'calendar', title: 'Servicing', text: 'Routine servicing to keep it clean and working properly.' },
          { icon: 'wrench', title: 'Repairs', text: 'Repairs to help get your cold room back to temperature.' },
          { icon: 'clipboard', title: 'Maintenance', text: 'Planned maintenance tailored to your cold room and how it is used.' },
        ],
      },
      {
        type: 'features',
        variant: 'list',
        eyebrow: 'Warning signs',
        title: 'When to get in touch.',
        items: [
          { icon: 'thermometer', title: 'Temperature not holding', text: 'The room is warmer than its set temperature.' },
          { icon: 'ice', title: 'Ice build-up', text: 'Ice forming on the evaporator or around the room.' },
          { icon: 'sound', title: 'Unusual noises', text: 'New or louder sounds from the fans or refrigeration equipment.' },
          { icon: 'alert', title: 'Alarms or controller errors', text: 'Warnings showing on the controller.' },
          { icon: 'activity', title: 'Running constantly', text: 'Equipment that rarely seems to cycle off.' },
          { icon: 'droplet', title: 'Water leaks', text: 'Water pooling inside or outside the room.' },
        ],
      },
      {
        type: 'split',
        tone: 'white',
        image: 'coldRoomEngineer',
        imageSide: 'right',
        eyebrow: 'Planned maintenance',
        title: 'Regular care for equipment you rely on.',
        body: [
          'Cold rooms work hard. A planned maintenance arrangement gives yours regular, scheduled attention and helps identify potential issues early.',
        ],
        links: [{ label: 'Planned maintenance & service contracts', href: '/planned-maintenance-service-contracts/', track: 'maintenance' }],
      },
    ],
    faqs: [
      { q: "What should I do if my cold room isn't holding temperature?", a: "Keep the door closed as much as possible and get in touch. We'll find the cause and talk you through the repair." },
      { q: 'Do you offer planned maintenance for cold rooms?', a: 'Yes. Planned maintenance can be tailored to your cold room and how you use it.' },
      { q: 'Do you work on display fridges and freezers too?', a: 'Yes. We provide servicing, maintenance and repairs for display fridges, fridges and freezers as well as cold rooms.' },
    ],
    related: ['refrigeration-repairs-maintenance', 'display-fridge-repairs-maintenance', 'fridge-freezer-repairs', 'planned-maintenance-service-contracts'],
    schema: { serviceType: 'Cold room repairs and maintenance' },
  },

  {
    slug: 'display-fridge-repairs-maintenance',
    group: 'refrigeration',
    navLabel: 'Display Fridge Repairs & Maintenance',
    seo: {
      title: 'Display Fridge Repairs & Maintenance | Coletrup Cooling',
      description:
        'Servicing, maintenance, fault finding and repairs for display fridges, helping keep your products chilled and your display refrigeration performing.',
    },
    breadcrumb: [{ label: 'Refrigeration', href: '/refrigeration-repairs-maintenance/' }],
    hero: {
      eyebrow: 'Display fridges',
      h1: 'Keep your display refrigeration performing.',
      lead: 'Display fridges keep products chilled and on show. We provide servicing, maintenance, fault finding and repairs to help keep them performing.',
      image: 'supermarketChillers',
      imagePosition: '60% 50%',
      chips: ['Servicing', 'Maintenance', 'Fault finding', 'Repairs'],
    },
    cta: { label: 'Request a service', service: 'refrigeration', type: 'commercial', track: 'refrigeration' },
    stickyPrompt: 'Need refrigeration support?',
    whatsappMessage: "Hi Coletrup Cooling, I'd like to arrange a service or repair for display fridges.",
    sections: [
      {
        type: 'features',
        variant: 'cards',
        tone: 'white',
        eyebrow: 'What we do',
        title: 'Support for your display refrigeration.',
        items: [
          { icon: 'calendar', title: 'Servicing', text: 'Routine servicing to help keep display fridges performing.' },
          { icon: 'clipboard', title: 'Maintenance', text: 'Ongoing and planned maintenance tailored to your equipment.' },
          { icon: 'search', title: 'Fault finding', text: "Methodical diagnosis when something isn't right." },
          { icon: 'wrench', title: 'Repairs', text: 'Repairs to help get your display back to temperature.' },
        ],
      },
      {
        type: 'features',
        variant: 'list',
        eyebrow: 'Warning signs',
        title: 'Signs your display fridge needs attention.',
        items: [
          { icon: 'thermometer', title: 'Products not staying cold', text: 'Stock at the front or top not staying chilled.' },
          { icon: 'droplet', title: 'Condensation or misting', text: 'Doors or glass misting up more than usual.' },
          { icon: 'ice', title: 'Ice build-up', text: 'Frost or ice forming inside the cabinet.' },
          { icon: 'activity', title: 'Temperature fluctuations', text: 'Readings moving up and down through the day.' },
          { icon: 'sound', title: 'Unusual noises', text: 'New or louder sounds from the fridge.' },
          { icon: 'alert', title: 'Alarms or error codes', text: 'Warnings on the display or controller.' },
        ],
      },
      {
        type: 'features',
        variant: 'columns',
        tone: 'navy',
        eyebrow: 'Where it matters',
        title: 'For businesses that rely on display refrigeration.',
        items: [
          { icon: 'store', title: 'Retail', text: 'Shops and stores where chilled products are on show.' },
          { icon: 'hospitality', title: 'Hospitality', text: 'Cafés, bars and venues with chilled display.' },
          { icon: 'box', title: 'Food and drink businesses', text: 'Businesses that rely on chilled products being displayed.' },
        ],
      },
      {
        type: 'split',
        image: 'displayFridges',
        imageSide: 'right',
        eyebrow: 'Planned maintenance',
        title: 'Keep your display equipment on schedule.',
        body: ['Planned maintenance gives your display refrigeration regular, scheduled attention, with checks tailored to your equipment.'],
        links: [
          { label: 'Planned maintenance & service contracts', href: '/planned-maintenance-service-contracts/', track: 'maintenance' },
          { label: 'Refrigeration repairs & maintenance', href: '/refrigeration-repairs-maintenance/', track: 'refrigeration' },
        ],
      },
    ],
    faqs: [
      { q: 'Why are my display fridge doors misting up?', a: "Misting can have several causes. If it's happening more than usual, or products aren't staying cold, it's worth having the fridge looked at." },
      { q: 'Can you service several display fridges at once?', a: "Yes. We can service multiple display fridges, and set up a planned maintenance arrangement if you'd like regular visits." },
      { q: 'Do you work on cold rooms too?', a: 'Yes. We provide fault finding, servicing, repairs and maintenance for cold rooms.' },
    ],
    related: ['refrigeration-repairs-maintenance', 'cold-room-repairs-maintenance', 'fridge-freezer-repairs', 'planned-maintenance-service-contracts'],
    schema: { serviceType: 'Display fridge repairs and maintenance' },
  },

  // =================================================================
  // PLANNED MAINTENANCE
  // =================================================================
  {
    slug: 'planned-maintenance-service-contracts',
    group: 'maintenance',
    navLabel: 'Planned Maintenance & Service Contracts',
    seo: {
      title: 'Planned Maintenance & Service Contracts | Coletrup Cooling',
      description:
        'Planned maintenance and service contracts for commercial air conditioning and refrigeration: scheduled servicing, early fault identification and tailored arrangements.',
    },
    breadcrumb: [],
    hero: {
      eyebrow: 'Planned maintenance & service contracts',
      h1: 'Protect your equipment. Reduce unexpected problems.',
      lead: 'Planned maintenance gives businesses greater visibility over equipment condition and performance.',
      image: 'commercialRestaurantCheck',
      imagePosition: '50% 45%',
      chips: ['Air conditioning', 'Refrigeration'],
    },
    cta: { label: 'Discuss a maintenance contract', service: 'servicing-maintenance', type: 'commercial', track: 'maintenance' },
    whatsappMessage: "Hi Coletrup Cooling, I'd like to discuss a planned maintenance contract.",
    sections: [
      {
        type: 'features',
        variant: 'cards',
        tone: 'white',
        eyebrow: "What's included",
        title: 'Maintenance tailored to your equipment.',
        items: [
          { icon: 'calendar', title: 'Planned servicing', text: "Servicing scheduled in advance, so it doesn't slip down the list." },
          { icon: 'search', title: 'Early fault identification', text: 'Potential issues spotted early, before they become bigger problems.' },
          { icon: 'clipboard', title: 'Equipment management', text: 'Better visibility of your equipment and its condition over time.' },
          { icon: 'settings', title: 'Tailored maintenance', text: 'An arrangement shaped around your equipment and how it is used.' },
        ],
      },
      {
        type: 'duo',
        eyebrow: 'What can be covered',
        title: 'Air conditioning and refrigeration.',
        items: [
          { icon: 'ac-unit', eyebrow: 'Air conditioning', title: 'Commercial air conditioning', text: 'Planned maintenance for air conditioning in offices, retail, hospitality, warehouses and other premises.', href: '/commercial-air-conditioning-maintenance/', linkLabel: 'Commercial maintenance', track: 'maintenance', image: 'commercialCassetteInstallDark' },
          { icon: 'fridge', eyebrow: 'Refrigeration', title: 'Refrigeration equipment', text: 'Planned maintenance for fridges, freezers, display fridges, cold rooms and commercial refrigeration equipment.', href: '/refrigeration-repairs-maintenance/', linkLabel: 'Refrigeration support', track: 'refrigeration', image: 'coldRoom' },
        ],
      },
      {
        type: 'steps',
        tone: 'white',
        eyebrow: 'How it works',
        title: 'Simple to set up.',
        items: [
          { title: 'Tell us about your equipment', text: 'What you have, where it is and how it is used.' },
          { title: 'We tailor an arrangement', text: 'A maintenance schedule shaped around your equipment.' },
          { title: 'Planned visits', text: 'Servicing carried out as agreed.' },
          { title: 'Stay informed', text: 'Clear updates on condition and any work needed.' },
        ],
      },
      {
        type: 'split',
        image: 'engineerRooftop',
        imageSide: 'left',
        eyebrow: 'Why plan maintenance',
        title: 'Prevention is better than a breakdown.',
        body: [
          'Planned maintenance helps you stay ahead of problems rather than reacting to them. Regular servicing gives potential issues the chance to be spotted early, and gives you a clearer picture of your equipment over time.',
          'Looking for servicing at home? Our air conditioning servicing and maintenance service is designed for homes.',
        ],
        links: [
          { label: 'Air conditioning servicing & maintenance', href: '/air-conditioning-servicing-maintenance/', track: 'maintenance' },
          { label: 'Commercial air conditioning maintenance', href: '/commercial-air-conditioning-maintenance/', track: 'maintenance' },
        ],
      },
    ],
    faqs: [
      { q: 'What is a planned maintenance contract?', a: 'An ongoing arrangement where servicing and maintenance are scheduled in advance, rather than arranged only when something goes wrong.' },
      { q: 'What equipment can be covered?', a: 'Commercial air conditioning and refrigeration equipment, including display fridges and cold rooms. Every arrangement is tailored to your equipment.' },
      { q: 'Can the arrangement be tailored?', a: 'Yes. We shape each arrangement around your equipment, your premises and how you use them.' },
      { q: 'I only have air conditioning at home. What do you recommend?', a: 'Our air conditioning servicing and maintenance service is designed for homes. We can advise on a sensible servicing interval for your system.' },
    ],
    related: ['commercial-air-conditioning-maintenance', 'refrigeration-repairs-maintenance', 'air-conditioning-servicing-maintenance', 'commercial-air-conditioning'],
    schema: { serviceType: 'Planned maintenance and service contracts for air conditioning and refrigeration' },
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
