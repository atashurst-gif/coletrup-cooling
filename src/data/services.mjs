/**
 * SERVICE PAGE CONTENT
 * ---------------------------------------------------------------------
 * Every service page is generated from this file. Wording supplied by Brad
 * (2 Oct). House rules for anyone editing:
 *  - Refrigeration is servicing, maintenance, fault finding and repairs ONLY.
 *    Never add refrigeration installation, replacement or supply wording.
 *  - No response times, guarantees, prices, accreditations, brands or
 *    years trading unless verified and added to site.config.
 *
 * Optional per-page fields:
 *   faq:      { title, intro }            heading + extra intro line above the FAQs
 *   relatedTitle                          heading above the related cards
 *   related:  [ slug | { slug, title, text } ]   card title/text overrides
 *   midCta:   { title, text, after }      mid-page call to action (after = section index)
 *   finalCta: { title, text, quoteLabel } closing call to action
 *
 * Quote defaults: service = 'air-conditioning' | 'refrigeration' | 'repair'
 *                 | 'servicing-maintenance'; type = 'residential' | 'commercial'
 * Tracking: cta.track = residential | commercial | repair | maintenance
 *           | refrigeration | installation
 * ---------------------------------------------------------------------
 */

const rel = (slug, title, text) => ({ slug, title, text });

// Related-service cards reused across the air conditioning pages
const REL_RESIDENTIAL = rel('residential-air-conditioning', 'Residential Air Conditioning', 'Professional air conditioning installation, servicing and repairs for homes, tailored to your property and requirements.');
const REL_COMMERCIAL = rel('commercial-air-conditioning', 'Commercial Air Conditioning', 'Air conditioning installation, servicing and repairs for offices, retail, hospitality and other commercial premises.');
const REL_SERVICE = rel('air-conditioning-servicing-maintenance', 'Air Conditioning Service & Maintenance', 'Professional servicing and maintenance to keep your system efficient, reliable and performing at its best.');
const REL_PLANNED = rel('planned-maintenance-service-contracts', 'Planned Maintenance Contracts', 'Tailored maintenance agreements for commercial air conditioning and refrigeration, helping keep your systems maintained and operating reliably.');
const REL_REPAIRS = rel('air-conditioning-repairs', 'Air Conditioning Repairs', 'Fault finding and repairs to get your air conditioning system back up and running.');

// Related-service cards reused across the refrigeration pages
const REL_REFRIGERATION = rel('refrigeration-repairs-maintenance', 'Commercial Refrigeration', 'Servicing, maintenance, fault finding and repairs for a range of commercial refrigeration systems and equipment.');
const REL_CHILLER = rel('commercial-chiller-freezer-repairs', 'Commercial Chiller & Freezer Repairs', "Fault finding and repairs for commercial fridges and freezers that aren't cooling, are icing up, leaking or making unusual noises.");
const REL_COLD_ROOM = rel('cold-room-repairs-maintenance', 'Cold Room Repairs & Maintenance', 'Servicing, maintenance and repairs to keep cold rooms operating reliably and maintaining the correct temperature.');
const REL_DISPLAY = rel('display-fridge-repairs-maintenance', 'Display Refrigeration Repairs & Maintenance', 'Servicing, fault finding and repairs for commercial display refrigeration, helping keep products at the correct temperature.');
const REL_CELLAR = rel('cellar-cooling-repairs-maintenance', 'Cellar Cooling Repairs & Maintenance', 'Servicing, maintenance, fault finding and repairs for cellar cooling systems, helping maintain reliable operation and the correct storage temperature.');
const REL_PLANNED_REFRIG = rel('planned-maintenance-service-contracts', 'Planned Maintenance & Service Contracts', 'Scheduled maintenance for commercial refrigeration and air conditioning, helping identify potential issues early and reduce unexpected breakdowns.');

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
        'Professional residential air conditioning installation, servicing and repairs, providing efficient heating and cooling with solutions tailored to suit your property.',
    },
    breadcrumb: [],
    hero: {
      eyebrow: 'Residential air conditioning',
      h1: 'Year-round comfort for your home.',
      lead: 'Professional air conditioning installation, servicing and repairs, providing efficient heating and cooling with solutions tailored to suit your property.',
      image: 'engineerInstallDiningDark',
      imagePosition: '50% 40%',
      chips: ['Installation', 'Service & maintenance', 'Repairs'],
    },
    cta: { label: 'Get a residential quote', service: 'air-conditioning', type: 'residential', track: 'residential' },
    whatsappMessage: "Hi Coletrup Cooling, I'd like a quote for air conditioning at home.",
    sections: [
      {
        type: 'intro',
        eyebrow: 'Tailored to your home',
        title: 'Air conditioning designed around your home.',
        body: [
          "Every home is different, which is why we take the time to understand your property, how you use each space and what you're looking to achieve.",
          "We'll recommend a system tailored to your requirements, with the right solution for efficient heating and cooling throughout your home. From installation through to ongoing servicing and maintenance, Coletrup Cooling can look after your system for years to come.",
        ],
        aside: {
          title: 'Tailored to you',
          items: [
            { icon: 'home', title: 'Your property', text: 'The size, layout and rooms you want to heat or cool.' },
            { icon: 'users', title: 'How you use your home', text: 'How and when each space is used throughout the day.' },
            { icon: 'thermometer', title: 'Your requirements', text: "The comfort, efficiency and control you're looking for." },
          ],
        },
      },
      {
        type: 'features',
        variant: 'photos',
        tone: 'white',
        eyebrow: 'Air conditioning for your home',
        title: 'Year-round comfort for every room.',
        items: [
          { icon: 'bed', title: 'Bedrooms', text: 'Comfortable nights, whatever the weather.', image: 'bedroom' },
          { icon: 'sofa', title: 'Living rooms', text: 'A comfortable space for everyone at home, all year round.', image: 'livingRoom' },
          { icon: 'laptop', title: 'Home offices', text: 'A more comfortable place to focus through the working day.', image: 'homeOffice' },
          { icon: 'extension', title: 'Extensions & garden rooms', text: 'Heating and cooling for new and extended living spaces.', image: 'gardenRoom' },
          { icon: 'open-plan', title: 'Open-plan spaces', text: 'Solutions for larger, open living areas.', image: 'kitchenDiner' },
          { icon: 'rooms', title: 'Multiple rooms', text: 'Options for heating and cooling several rooms across your home.', image: 'thermostat' },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Residential services',
        title: 'Complete air conditioning services for your home.',
        items: [
          { icon: 'ac-unit', title: 'Air Conditioning Installation', text: 'Professionally installed systems, tailored to suit your home and requirements.', href: '/air-conditioning-installation/', track: 'installation' },
          { icon: 'wrench', title: 'Air Conditioning Repairs', text: "From poor performance to unexpected faults, we'll diagnose the issue and get your system running properly.", href: '/air-conditioning-repairs/', track: 'repair' },
          { icon: 'gauge', title: 'Service & Maintenance', text: 'Thorough servicing and preventative maintenance to keep your system efficient, reliable and performing at its best.', href: '/air-conditioning-servicing-maintenance/', track: 'maintenance' },
        ],
      },
      {
        type: 'split',
        tone: 'white',
        icon: 'handshake',
        imageSide: 'left',
        eyebrow: 'From start to finish',
        title: 'Professional service every step of the way.',
        body: [
          "Whether you're looking for a new air conditioning system, routine servicing or a repair, you can expect a straightforward and professional service from initial enquiry through to completion.",
        ],
        bullets: ['Clear, straightforward advice', 'Professional installation', 'Reliable servicing & repairs'],
      },
    ],
    faqs: [
      { q: 'Can you install air conditioning in just one room?', a: 'Yes. We can install air conditioning in a single room or throughout your home, with a system selected to suit the size, layout and requirements of each space.' },
      { q: 'Do you service and repair existing systems?', a: 'Yes. As well as new installations, we service, maintain and repair residential air conditioning systems.' },
      { q: 'Can air conditioning work in an extension or open-plan space?', a: "Yes. Air conditioning is ideal for extensions and open-plan spaces. We'll assess the size and layout of the space to recommend the right system for effective, efficient heating and cooling." },
      { q: 'How do I get a quote?', a: "Use the quick quote form on this page, send us a WhatsApp or give us a call. We'll ask a few questions about your home and what you need, then talk you through the options." },
    ],
    relatedTitle: 'Other services we offer.',
    related: [
      rel('air-conditioning-installation', 'Air Conditioning Installation', 'Professional air conditioning installation for homes and businesses, tailored to suit your requirements.'),
      REL_REPAIRS,
      rel('air-conditioning-servicing-maintenance', 'Service & Maintenance', 'Regular service and maintenance to keep your system efficient, reliable and performing at its best.'),
      rel('planned-maintenance-service-contracts', 'Planned Maintenance', 'Ongoing maintenance for commercial air conditioning and refrigeration systems, tailored around your business and equipment.'),
    ],
    schema: { serviceType: 'Residential air conditioning installation, servicing and repairs' },
  },

  {
    slug: 'air-conditioning-installation',
    group: 'residential',
    navLabel: 'Air Conditioning Installation',
    seo: {
      title: 'Air Conditioning Installation | Coletrup Cooling',
      description:
        "Professional air conditioning installation for homes and businesses. We'll recommend the right system for your requirements and install it from start to finish.",
    },
    breadcrumb: [{ label: 'Residential Air Conditioning', href: '/residential-air-conditioning/' }],
    hero: {
      eyebrow: 'Air conditioning installation',
      h1: 'Professional air conditioning for your home or business.',
      lead: "Whether you need air conditioning for a single room, your home or commercial premises, we'll recommend the right system for your requirements and provide a professional installation from start to finish.",
      image: 'outdoorElectrical',
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
        title: 'The right solution, from start to finish.',
        items: [
          { title: 'Understanding your requirements', text: "We take the time to understand your space, how it's used and what you need from your air conditioning." },
          { title: 'Choosing the right system', text: 'We recommend a system suited to your property, requirements and budget, with clear advice on the options available.' },
          { title: 'Professional installation', text: 'Your system is professionally installed with care and attention to detail, ensuring everything is set up and operating correctly.' },
        ],
      },
      {
        type: 'duo',
        eyebrow: 'Homes and businesses',
        title: 'Installation for every kind of space.',
        items: [
          { icon: 'home', eyebrow: 'For your home', title: 'Residential installation', text: 'Bedrooms, living rooms, home offices, extensions, open-plan spaces and multiple rooms.', href: '/residential-air-conditioning/', linkLabel: 'Residential air conditioning', track: 'residential' },
          { icon: 'building', eyebrow: 'For your business', title: 'Commercial installation', text: 'Offices, retail, hospitality, warehouses, commercial premises and workspaces.', href: '/commercial-air-conditioning/', linkLabel: 'Commercial air conditioning', track: 'commercial' },
        ],
      },
      {
        type: 'callout',
        tone: 'white',
        icon: 'clipboard',
        title: 'Getting ready for your quote',
        intro: 'It helps to have a few details to hand when you get in touch:',
        items: ['Which rooms or areas you would like to heat or cool', 'Roughly how each space is used', 'Your postcode', 'Any timing you have in mind'],
      },
      {
        type: 'split',
        icon: 'gauge',
        imageSide: 'right',
        eyebrow: 'After installation',
        title: 'Keeping your system performing at its best.',
        body: [
          'Regular service and maintenance helps keep your air conditioning efficient, reliable and operating as it should. We offer one-off servicing as well as planned maintenance for customers who require ongoing support.',
        ],
        links: [
          { label: 'Service & maintenance', href: '/air-conditioning-servicing-maintenance/', track: 'maintenance' },
          { label: 'Planned maintenance & service contracts', href: '/planned-maintenance-service-contracts/', track: 'maintenance' },
        ],
      },
    ],
    faqs: [
      { q: 'Do you install air conditioning for businesses as well as homes?', a: 'Yes. We install air conditioning for homes and for businesses, including offices, retail, hospitality, warehouses and other commercial premises.' },
      { q: 'How do you decide which system is right?', a: "We assess your property, the size and layout of the space, how it's used and your heating and cooling requirements. From there, we'll recommend a correctly sized system that best suits your needs." },
      { q: 'What happens after I request a quote?', a: "We'll get in touch to talk through your requirements, then recommend the right approach for your property." },
      { q: 'Can you service the system after it is installed?', a: 'Yes. We provide ongoing servicing and maintenance, as well as planned maintenance arrangements if you would prefer scheduled visits.' },
    ],
    relatedTitle: 'Other services we offer.',
    related: [REL_RESIDENTIAL, REL_COMMERCIAL, REL_SERVICE, REL_PLANNED],
    schema: { serviceType: 'Air conditioning installation' },
  },

  {
    slug: 'air-conditioning-repairs',
    group: 'residential',
    navLabel: 'Air Conditioning Repairs',
    seo: {
      title: 'Air Conditioning Repairs & Fault Finding | Coletrup Cooling',
      description:
        "Air conditioning not heating or cooling, leaking water or making unusual noises? We'll diagnose the fault and identify the right repair. Request a repair online or on WhatsApp.",
    },
    breadcrumb: [{ label: 'Residential Air Conditioning', href: '/residential-air-conditioning/' }],
    hero: {
      eyebrow: 'Air conditioning repairs',
      h1: "When your air conditioning isn't performing properly, we're here to help.",
      lead: "If your air conditioning isn't performing as it should, we'll diagnose the fault and identify the right repair. From heating and cooling issues to leaks, unusual noises and electrical faults, we'll work to get your system back up and running.",
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
        eyebrow: 'Common air conditioning faults',
        title: 'Problems we can help with.',
        intro: "Air conditioning faults can show up in a number of ways. If your system isn't operating as it should, we can diagnose the problem and recommend the appropriate repair.",
        items: [
          { icon: 'thermometer', title: 'Not heating or cooling', text: 'System running but not reaching the required temperature.' },
          { icon: 'wind', title: 'Poor airflow', text: 'Weak or uneven airflow from the indoor unit.' },
          { icon: 'droplet', title: 'Water leaks', text: 'Water dripping from or collecting around the indoor unit.' },
          { icon: 'sound', title: 'Unusual noises', text: 'Rattling, buzzing, clicking or other unusual sounds.' },
          { icon: 'activity', title: 'Poor performance', text: 'Reduced output or the system taking longer to reach temperature.' },
          { icon: 'bolt', title: 'Electrical faults', text: 'Tripping, loss of power or intermittent operation.' },
          { icon: 'alert', title: 'System faults', text: 'Error codes, warning lights or unexpected shutdowns.' },
        ],
      },
      {
        type: 'steps',
        eyebrow: 'How repairs work',
        title: 'A straightforward approach to fault finding & repairs.',
        items: [
          { title: 'Tell us the problem', text: "Let us know what's happening, including any error codes or symptoms you've noticed." },
          { title: 'Fault finding & diagnosis', text: 'We thoroughly investigate the system to identify the cause of the fault.' },
          { title: 'Repair & resolution', text: "We explain what's required and, where possible, carry out the necessary repair to get your system back up and running." },
        ],
      },
      {
        type: 'callout',
        tone: 'white',
        icon: 'clipboard',
        title: 'Before you get in touch',
        intro: 'Providing a few details about your system can help us understand the issue:',
        items: ['Any error codes or flashing lights', 'A description of the problem or symptoms', 'When the issue first started', 'The make and model of your system, if known'],
      },
      {
        type: 'split',
        icon: 'search',
        imageSide: 'left',
        eyebrow: 'Preventative maintenance',
        title: 'Regular servicing helps keep problems at bay.',
        body: [
          'Routine servicing helps keep your air conditioning operating efficiently and reliably, while giving us the opportunity to identify potential issues before they develop into more costly repairs or unexpected breakdowns.',
        ],
        links: [
          { label: 'Air conditioning service & maintenance', href: '/air-conditioning-servicing-maintenance/', track: 'maintenance' },
          { label: 'Planned maintenance contracts', href: '/planned-maintenance-service-contracts/', track: 'maintenance' },
        ],
      },
    ],
    faqs: [
      { q: 'My air conditioning is running but not heating or cooling properly. What could be wrong?', a: "There are several possible causes, including restricted airflow, dirty filters, refrigerant issues or a system fault. We'll carry out the necessary checks to diagnose the problem and recommend the appropriate repair." },
      { q: 'Why is my indoor air conditioning unit leaking water?', a: "Water leaks can be caused by a blocked condensate drain, drainage issues or other system faults. We'll inspect the system, identify the cause and carry out the necessary repair to prevent further leakage." },
      { q: 'Do you repair commercial air conditioning systems?', a: 'Yes. We provide fault finding and repairs for commercial air conditioning systems across a range of businesses and premises, helping get your system back up and running as quickly as possible.' },
      { q: 'Can regular servicing help prevent breakdowns?', a: 'Yes. Regular servicing can identify potential issues early, helping reduce the risk of unexpected breakdowns and costly repairs while keeping your system operating efficiently and reliably.' },
    ],
    relatedTitle: 'Other services we offer.',
    related: [REL_RESIDENTIAL, REL_COMMERCIAL, REL_SERVICE, REL_PLANNED],
    schema: { serviceType: 'Air conditioning repairs' },
  },

  {
    slug: 'air-conditioning-servicing-maintenance',
    group: 'residential',
    navLabel: 'Air Conditioning Service & Maintenance',
    seo: {
      title: 'Air Conditioning Service & Maintenance | Coletrup Cooling',
      description:
        'Regular air conditioning servicing helps maintain performance, efficiency and reliability, and allows potential issues to be identified early.',
    },
    breadcrumb: [{ label: 'Residential Air Conditioning', href: '/residential-air-conditioning/' }],
    hero: {
      eyebrow: 'Service & maintenance',
      h1: 'Keep your air conditioning performing at its best.',
      lead: 'Regular servicing helps maintain performance, efficiency and reliability while keeping your system clean and operating as it should. It also allows potential issues to be identified early, helping reduce the risk of unexpected breakdowns and costly repairs.',
      image: 'engineerFilterCleanDark',
      imagePosition: '50% 45%',
      chips: ['Service', 'Maintenance'],
    },
    cta: { label: 'Book a service', service: 'servicing-maintenance', type: 'residential', track: 'maintenance' },
    whatsappMessage: "Hi Coletrup Cooling, I'd like to book an air conditioning service.",
    sections: [
      {
        type: 'checklist',
        tone: 'white',
        eyebrow: 'What a service covers',
        title: 'A thorough service of your system.',
        intro: 'Every service is tailored to your system and typically includes:',
        items: [
          { icon: 'eye', title: 'System inspection', text: 'Checking the overall condition of the system and components.' },
          { icon: 'filter', title: 'Filter cleaning', text: 'Cleaning filters and removing dust and debris build-up.' },
          { icon: 'ac-unit', title: 'Indoor unit checks', text: 'Inspecting and cleaning coils, fans, condensate drains and components.' },
          { icon: 'outdoor-unit', title: 'Outdoor unit checks', text: 'Inspecting the condenser, coil, fan and electrical components.' },
          { icon: 'activity', title: 'Performance checks', text: 'Checking temperatures and system operation to ensure correct performance.' },
          { icon: 'droplet', title: 'Refrigerant checks', text: 'Checking system operation for signs of refrigerant issues or leaks.' },
          { icon: 'bolt', title: 'Electrical checks', text: 'Inspecting electrical connections and components for signs of wear or faults.' },
          { icon: 'search', title: 'Fault identification', text: 'Identifying potential issues before they develop into breakdowns.' },
        ],
      },
      {
        type: 'features',
        variant: 'columns',
        tone: 'navy',
        eyebrow: 'Why regular servicing matters',
        title: 'Protect performance. Prevent problems.',
        items: [
          { icon: 'search', title: 'Spot issues early', text: 'Identify potential faults before they develop into more serious problems.' },
          { icon: 'gauge', title: 'Maintain performance', text: 'Keep your system clean, efficient and operating as it should.' },
          { icon: 'shield', title: 'Improve reliability', text: 'Regular maintenance helps reduce unexpected breakdowns and keeps your system running reliably.' },
        ],
      },
      {
        type: 'split',
        image: 'outdoorFan',
        imageSide: 'left',
        eyebrow: 'Homes & businesses',
        title: 'Servicing tailored to your system.',
        body: [
          'Whether you have a single air conditioning system at home or multiple systems across a commercial premises, we can provide servicing to suit your requirements. For businesses requiring regular scheduled visits, planned maintenance and service contracts are also available.',
        ],
        links: [
          { label: 'Planned service & maintenance contracts', href: '/planned-maintenance-service-contracts/', track: 'maintenance' },
          { label: 'Commercial air conditioning maintenance', href: '/commercial-air-conditioning-maintenance/', track: 'maintenance' },
        ],
      },
    ],
    faq: { title: 'Air conditioning servicing FAQs', intro: 'Everything you need to know about servicing and maintaining your air conditioning system.' },
    faqs: [
      { q: 'How often should air conditioning be serviced?', a: 'For most systems, we recommend servicing at least once a year. Systems that are used heavily or in commercial environments may benefit from more frequent maintenance.' },
      { q: "What's the difference between servicing and planned maintenance?", a: 'A service is a thorough check and clean of your system. Planned maintenance provides regular scheduled servicing throughout the year, making it ideal for businesses or properties with multiple systems.' },
      { q: 'Can a service identify potential faults?', a: 'Yes. Servicing can highlight signs of wear, performance issues and developing faults before they become more serious. While not every breakdown can be prevented, regular maintenance can help reduce the risk of unexpected problems.' },
      { q: 'Do you service both residential and commercial systems?', a: 'Yes. We service air conditioning systems in homes and a wide range of commercial premises, from individual split systems to larger multi-unit installations.' },
    ],
    relatedTitle: 'Other services we offer.',
    related: [REL_RESIDENTIAL, REL_COMMERCIAL, REL_REPAIRS, REL_PLANNED],
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
        'Professional air conditioning installation, servicing, maintenance and repairs for businesses across Manchester and the North West.',
    },
    breadcrumb: [],
    hero: {
      eyebrow: 'Commercial air conditioning',
      h1: 'Comfortable conditions for your business, all year round.',
      lead: 'Professional air conditioning installation, servicing, maintenance and repairs for businesses across Manchester and the North West. From individual workspaces to complete commercial premises, we provide reliable heating and cooling solutions tailored to your requirements.',
      image: 'commercialCassetteInstallDark',
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
        title: 'Air conditioning for all types of commercial premises.',
        items: [
          { icon: 'building', title: 'Offices', text: 'Reliable heating and cooling to maintain a comfortable working environment.' },
          { icon: 'store', title: 'Retail', text: 'Temperature control for shops and retail spaces, helping maintain comfortable conditions for customers and staff.' },
          { icon: 'hospitality', title: 'Hospitality', text: 'Heating and cooling for restaurants, bars, cafés and hospitality venues.' },
          { icon: 'warehouse', title: 'Warehouses', text: 'Air conditioning solutions for warehouses, storage areas and operational spaces.' },
          { icon: 'box', title: 'Commercial premises', text: 'Air conditioning for a wide range of commercial buildings and business premises.' },
          { icon: 'briefcase', title: 'Workspaces', text: 'Heating and cooling solutions for workshops, studios and other working environments.' },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Commercial services',
        title: 'Installation, service, maintenance and repairs.',
        items: [
          { icon: 'ac-unit', title: 'Installation', text: 'Air conditioning systems professionally designed and installed to suit your commercial premises.', href: '/air-conditioning-installation/', track: 'installation' },
          { icon: 'gauge', title: 'Service & maintenance', text: 'Planned maintenance tailored to your systems, premises and servicing requirements to keep your air conditioning performing reliably.', href: '/commercial-air-conditioning-maintenance/', track: 'maintenance' },
          { icon: 'wrench', title: 'Repairs', text: 'Professional fault finding and repairs to get your air conditioning back up and running.', href: '/commercial-air-conditioning-repairs/', track: 'repair' },
        ],
      },
      {
        type: 'features',
        variant: 'cards',
        tone: 'white',
        eyebrow: 'Systems we work on',
        title: 'Systems we install, service and repair.',
        items: [
          { icon: 'ac-unit', title: 'Split systems', text: 'Wall-mounted, cassette, ceiling-suspended and ducted air conditioning systems for commercial premises.' },
          { icon: 'rooms', title: 'Multi-split systems', text: 'Multiple indoor units connected to a single outdoor unit, ideal for businesses requiring air conditioning across several areas.' },
          { icon: 'outdoor-unit', title: 'VRV & VRF systems', text: 'Servicing, maintenance, fault finding and repairs for larger VRV and VRF air conditioning systems.' },
          { icon: 'thermometer', title: 'Heat pump air conditioning', text: 'Efficient heating and cooling systems providing year-round temperature control for commercial premises.' },
        ],
      },
      {
        type: 'gallery',
        tone: 'cream',
        eyebrow: 'On the job',
        title: 'Real jobs, carried out properly.',
        intro: 'A few photos from recent commercial work, from testing and diagnostics to electrical fault finding.',
        items: [{ image: 'jobClampMeter' }, { image: 'jobControlPanel' }, { image: 'jobUnitGauges' }],
      },
      {
        type: 'split',
        tone: 'white',
        image: 'restaurantCassette',
        imageSide: 'right',
        eyebrow: 'Working with businesses',
        title: 'Air conditioning built around your business.',
        body: [
          'Every commercial premises has different requirements. We consider how your building is used, the areas that require heating and cooling, and the practical requirements of the installation before recommending the right approach.',
          "From individual systems to larger multi-unit installations, we'll plan the work around your premises and minimise disruption to your day-to-day operations.",
        ],
        links: [{ label: 'Planned service & maintenance contracts', href: '/planned-maintenance-service-contracts/', track: 'maintenance' }],
      },
    ],
    faq: { title: 'Commercial air conditioning FAQs', intro: 'Answers to some of the most common questions about our commercial air conditioning services.' },
    faqs: [
      { q: 'What types of businesses do you work with?', a: 'We work with a wide range of businesses, including offices, shops, restaurants, cafés, hospitality venues, warehouses and other commercial premises across Manchester and the North West.' },
      { q: 'Can you maintain our existing systems?', a: 'Yes. We service and maintain existing commercial air conditioning systems, including split, multi-split and VRV/VRF systems. We can assess the condition and operation of your equipment and recommend the appropriate maintenance.' },
      { q: 'Do you offer maintenance contracts?', a: 'Yes. We offer planned maintenance and service contracts tailored to your premises and systems, with scheduled visits to help maintain performance, reliability and identify potential issues early.' },
      { q: 'How do I get a commercial quote?', a: "Get in touch by phone, WhatsApp or through our quote form. Tell us about your premises and what you require, and we'll discuss the next steps and arrange a site visit where required." },
    ],
    relatedTitle: 'Supporting your air conditioning, from installation to maintenance.',
    related: [
      rel('commercial-air-conditioning-repairs', 'Commercial Air Conditioning Repairs', 'Fault finding and repairs for commercial air conditioning systems, helping get your system back up and running when problems occur.'),
      rel('commercial-air-conditioning-maintenance', 'Commercial Air Conditioning Maintenance', 'Professional servicing and maintenance to keep your systems clean, operating correctly and performing reliably.'),
      rel('air-conditioning-installation', 'Air Conditioning Installation', 'Professional air conditioning installation for businesses and commercial premises, from individual systems to larger multi-unit installations.'),
      rel('planned-maintenance-service-contracts', 'Planned Service & Maintenance Contracts', 'Scheduled maintenance for businesses requiring ongoing support, with service arrangements tailored to your systems and premises.'),
    ],
    finalCta: { title: 'Need air conditioning support for your business?', text: "Whether you need a new installation, ongoing maintenance or help with a fault, get in touch and we'll discuss what you need." },
    schema: { serviceType: 'Commercial air conditioning installation, servicing, maintenance and repairs' },
  },

  {
    slug: 'commercial-air-conditioning-repairs',
    group: 'commercial',
    navLabel: 'Commercial Air Conditioning Service & Repairs',
    seo: {
      title: 'Commercial Air Conditioning Service & Repairs | Coletrup Cooling',
      description:
        'Professional fault finding and repairs for commercial air conditioning systems across Manchester and the North West.',
    },
    breadcrumb: [{ label: 'Commercial Air Conditioning', href: '/commercial-air-conditioning/' }],
    hero: {
      eyebrow: 'Commercial air conditioning service & repairs',
      h1: 'Commercial air conditioning faults, diagnosed and repaired.',
      lead: "When your air conditioning develops a fault, you need to know what's wrong and what's required to put it right. We provide professional fault finding and repairs for commercial air conditioning systems across Manchester and the North West.",
      image: 'commercialRooftopGauges',
      imagePosition: '50% 45%',
      chips: ['Fault finding', 'Diagnostics', 'Repairs'],
    },
    cta: { label: 'Request a repair', service: 'repair', type: 'commercial', track: 'repair' },
    whatsappMessage: "Hi Coletrup Cooling, we have a problem with our commercial air conditioning and need a repair.",
    sections: [
      {
        type: 'features',
        variant: 'cards',
        tone: 'white',
        eyebrow: 'What we do',
        title: 'Commercial fault finding and repairs.',
        items: [
          { icon: 'search', title: 'Fault finding', text: 'Thorough diagnostics to identify the cause of the fault, not just the symptoms.' },
          { icon: 'activity', title: 'System diagnostics', text: 'Testing system operation and components to pinpoint performance and operational issues.' },
          { icon: 'wrench', title: 'Repairs', text: 'Professional repairs carried out to restore your system to correct operation.' },
          { icon: 'settings', title: 'Parts replacement', text: 'Replacement of faulty components where required to get your system back up and running.' },
        ],
      },
      {
        type: 'features',
        variant: 'list',
        eyebrow: 'Common issues',
        title: 'Signs your air conditioning needs attention.',
        items: [
          { icon: 'thermometer', title: 'Not heating or cooling properly', text: 'System running but struggling to reach or maintain the required temperature.' },
          { icon: 'wind', title: 'Uneven temperatures', text: 'Some areas heating or cooling effectively while others remain uncomfortable.' },
          { icon: 'droplet', title: 'Water leaks', text: 'Water dripping or leaking from the indoor unit.' },
          { icon: 'sound', title: 'Unusual noises', text: 'Rattling, buzzing, clicking or other unusual sounds during operation.' },
          { icon: 'alert', title: 'Error codes', text: 'Fault codes, warning lights or error messages showing on the controller.' },
          { icon: 'bolt', title: 'Electrical faults', text: 'Systems tripping, cutting out, failing to start or losing power.' },
        ],
      },
      {
        type: 'gallery',
        tone: 'cream',
        eyebrow: 'On the job',
        title: 'Faults found. Repairs done.',
        intro: 'Photos from recent repair work, including faulty compressors being changed.',
        items: [{ image: 'jobCompressorSwap' }, { image: 'jobCompressorPack' }],
      },
      {
        type: 'split',
        tone: 'white',
        icon: 'calendar',
        imageSide: 'right',
        eyebrow: 'Beyond the repair',
        title: 'Keep your systems running reliably.',
        body: [
          'Once your system is back up and running, regular servicing can help identify developing issues early, maintain performance and reduce the risk of unexpected breakdowns.',
          'For businesses requiring ongoing support, we can provide planned maintenance tailored to your systems, premises and servicing requirements.',
        ],
        links: [
          { label: 'Commercial air conditioning maintenance', href: '/commercial-air-conditioning-maintenance/', track: 'maintenance' },
          { label: 'Planned service & maintenance contracts', href: '/planned-maintenance-service-contracts/', track: 'maintenance' },
        ],
      },
    ],
    faq: { title: 'Commercial air conditioning repair FAQs', intro: 'Answers to common questions about commercial air conditioning fault finding and repairs.' },
    faqs: [
      { q: 'Do you diagnose the fault before carrying out repairs?', a: "Yes. We carry out fault finding and system diagnostics to identify the cause of the problem before recommending the appropriate repair. We'll explain what we've found and what work is required." },
      { q: 'Do you repair systems in offices, shops and hospitality venues?', a: 'Yes. We provide fault finding and repairs for commercial air conditioning across offices, retail, hospitality and other commercial premises. We work on a wide range of systems such as split, multi-split and VRV/VRF systems.' },
      { q: 'Can regular maintenance help reduce breakdowns?', a: 'Yes. Regular servicing can help identify developing issues before they lead to more serious faults. While not every breakdown can be prevented, planned maintenance can help improve system reliability and reduce the risk of unexpected problems.' },
    ],
    relatedTitle: 'More commercial air conditioning services.',
    related: [
      rel('commercial-air-conditioning', 'Commercial Air Conditioning', 'Installation, servicing, maintenance and repairs for businesses and commercial premises across Manchester and the North West.'),
      rel('commercial-air-conditioning-maintenance', 'Commercial Air Conditioning Maintenance', 'Professional servicing and maintenance to help keep your systems performing efficiently and reliably.'),
      rel('planned-maintenance-service-contracts', 'Planned Maintenance & Service Contracts', 'Scheduled maintenance and ongoing support tailored to your air conditioning systems and business requirements.'),
      rel('air-conditioning-installation', 'Air Conditioning Installation', 'Professional installation of split, multi-split and VRV/VRF air conditioning systems for commercial premises.'),
    ],
    finalCta: { title: 'Having problems with your air conditioning?', text: "Tell us what's happening and we'll help identify the fault and get your system back up and running.", quoteLabel: 'Request a repair' },
    schema: { serviceType: 'Commercial air conditioning repairs' },
  },

  {
    slug: 'commercial-air-conditioning-maintenance',
    group: 'commercial',
    navLabel: 'Commercial Air Conditioning Maintenance',
    seo: {
      title: 'Commercial Air Conditioning Maintenance | Coletrup Cooling',
      description:
        'Planned maintenance for commercial air conditioning, tailored to your systems, premises and how frequently your equipment is used.',
    },
    breadcrumb: [{ label: 'Commercial Air Conditioning', href: '/commercial-air-conditioning/' }],
    hero: {
      eyebrow: 'Commercial air conditioning maintenance',
      h1: 'Keep your air conditioning performing reliably.',
      lead: 'Regular planned maintenance helps keep your commercial air conditioning operating efficiently and reliably, while giving us the opportunity to identify developing issues before they lead to more serious problems. Maintenance can be tailored to your systems, premises and how frequently your equipment is used.',
      image: 'commercialOfficeFilter',
      imagePosition: '50% 40%',
      chips: ['Planned servicing', 'Tailored maintenance'],
    },
    cta: { label: 'Request a maintenance quote', service: 'servicing-maintenance', type: 'commercial', track: 'maintenance' },
    whatsappMessage: "Hi Coletrup Cooling, I'd like a maintenance quote for our commercial air conditioning.",
    sections: [
      {
        type: 'features',
        variant: 'cards',
        tone: 'white',
        eyebrow: "What's included",
        title: 'Maintenance tailored to your systems.',
        items: [
          { icon: 'calendar', title: 'Scheduled servicing', text: 'Regular maintenance visits scheduled around your systems and business requirements.' },
          { icon: 'sparkles', title: 'System checks & cleaning', text: 'Inspection, cleaning and operational checks to help maintain system performance.' },
          { icon: 'search', title: 'Early fault identification', text: 'Identifying signs of wear, developing faults and performance issues before they become more serious.' },
          { icon: 'settings', title: 'Tailored maintenance', text: 'A maintenance schedule based on your equipment, premises and how your systems are used.' },
        ],
      },
      {
        type: 'steps',
        eyebrow: 'How it works',
        title: 'Setting up your maintenance plan.',
        items: [
          { title: 'We assess your systems', text: 'We review your air conditioning systems, their condition, location and how they are used.' },
          { title: 'We agree a schedule', text: 'We recommend a servicing schedule based on your equipment, usage and business requirements.' },
          { title: 'Scheduled maintenance', text: 'Servicing is carried out at agreed intervals, with inspection, cleaning and operational checks completed as required.' },
          { title: 'Clear reporting', text: "We keep you informed of your systems' condition and highlight any faults, recommendations or remedial work required." },
        ],
      },
      {
        type: 'gallery',
        tone: 'cream',
        eyebrow: 'On the job',
        title: 'What a service uncovers.',
        intro: 'Blocked filters and dirty outdoor units reduce performance. This is what we find, and clean, during servicing.',
        items: [{ image: 'jobDirtyFilters' }, { image: 'jobOutdoorClean' }],
      },
      {
        type: 'split',
        tone: 'white',
        icon: 'fridge',
        imageSide: 'left',
        eyebrow: 'Air conditioning & refrigeration',
        title: 'One service for your air conditioning and refrigeration.',
        body: [
          'For businesses that rely on both air conditioning and commercial refrigeration, we can provide servicing, maintenance and repairs across both. This makes it easier to keep your essential cooling systems maintained and operating reliably.',
        ],
        links: [
          { label: 'Air conditioning planned service & maintenance contracts', href: '/planned-maintenance-service-contracts/', track: 'maintenance' },
          { label: 'Refrigeration repairs & maintenance', href: '/refrigeration-repairs-maintenance/', track: 'refrigeration' },
        ],
      },
    ],
    faq: { title: 'Commercial maintenance FAQs', intro: 'Answers to common questions about planned maintenance for your air conditioning and refrigeration systems.' },
    faqs: [
      { q: 'Can a maintenance plan cover several systems?', a: 'Yes. We can tailor a maintenance plan around multiple air conditioning systems across your premises, with servicing scheduled to suit your equipment and requirements.' },
      { q: 'Do you also maintain refrigeration equipment?', a: 'Yes. We provide servicing and maintenance for commercial refrigeration as well as air conditioning, allowing both to be included within your planned maintenance requirements.' },
      { q: 'What if a fault is found during a maintenance visit?', a: "If we identify a fault or an issue requiring further attention, we'll explain what we've found and recommend the appropriate next steps. Any additional repair work required can then be discussed before it is carried out." },
    ],
    relatedTitle: 'You might also need.',
    related: [
      rel('commercial-air-conditioning', 'Commercial Air Conditioning', 'Installation, servicing, maintenance and repairs for air conditioning systems across a range of commercial premises.'),
      rel('commercial-air-conditioning-repairs', 'Commercial Air Conditioning Repairs', 'Professional fault finding and repairs for commercial air conditioning systems, from performance issues and error codes to electrical and mechanical faults.'),
      rel('planned-maintenance-service-contracts', 'Planned Maintenance & Service Contracts', 'Scheduled maintenance for commercial air conditioning and refrigeration, tailored around your systems, premises and servicing requirements.'),
      rel('refrigeration-repairs-maintenance', 'Refrigeration Repairs & Maintenance', 'Servicing, maintenance, fault finding and repairs for commercial refrigeration, including display cabinets, cold rooms, freezers and other refrigeration systems.'),
    ],
    finalCta: { title: 'Need support with your commercial air conditioning?', text: 'From installations and maintenance to fault finding and repairs, get in touch to discuss what you need.', quoteLabel: 'Enquire' },
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
      title: 'Commercial Refrigeration Repairs & Maintenance | Coletrup Cooling',
      description:
        'Professional servicing, maintenance, fault finding and repairs for commercial refrigeration systems across Manchester and the North West.',
    },
    breadcrumb: [],
    hero: {
      eyebrow: 'Refrigeration',
      h1: 'Keep your refrigeration equipment running reliably.',
      lead: 'Professional servicing, maintenance, fault finding and repairs for commercial refrigeration systems across Manchester and the North West.',
      image: 'coldRoomEngineer',
      imagePosition: '40% 50%',
      chips: ['Service & maintenance', 'Repairs'],
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
        title: 'Specialist commercial refrigeration services.',
        intro: 'Professional servicing, maintenance, fault finding and repairs to keep your refrigeration systems operating reliably.',
        items: [
          { icon: 'calendar', title: 'Servicing', text: 'Thorough servicing to keep systems clean, efficient and operating correctly.' },
          { icon: 'clipboard', title: 'Maintenance', text: 'Planned maintenance to help maintain reliability and identify issues early.' },
          { icon: 'search', title: 'Fault finding', text: 'Systematic diagnosis to identify the cause of faults and performance issues.' },
          { icon: 'wrench', title: 'Repairs', text: 'Professional repairs to restore operation and get systems back to temperature.' },
        ],
      },
      {
        type: 'features',
        variant: 'tiles',
        eyebrow: 'Equipment we work on',
        title: 'Commercial refrigeration equipment we look after.',
        items: [
          { icon: 'display', title: 'Display cabinets', text: 'Chilled and frozen display cabinets for retail and hospitality.', href: '/display-fridge-repairs-maintenance/' },
          { icon: 'cold-room', title: 'Cold rooms & freezer rooms', text: 'Walk-in chilled and frozen storage systems.', href: '/cold-room-repairs-maintenance/' },
          { icon: 'ice', title: 'Cellar cooling systems', text: 'Cellar cooling equipment for pubs, bars and hospitality premises.', href: '/cellar-cooling-repairs-maintenance/' },
          { icon: 'fridge', title: 'Integral refrigeration', text: 'Self-contained commercial fridges, freezers and refrigerated cabinets.', href: '/commercial-chiller-freezer-repairs/' },
          { icon: 'outdoor-unit', title: 'Remote refrigeration systems', text: 'Remote systems serving display cabinets, cold rooms and other refrigeration equipment.' },
          { icon: 'box', title: 'Commercial refrigeration equipment', text: 'Servicing, fault finding and repairs across a wide range of commercial refrigeration systems.' },
        ],
      },
      {
        type: 'links',
        tone: 'white',
        eyebrow: 'Refrigeration services',
        title: 'Refrigeration services for your business.',
        items: [
          { icon: 'fridge', title: 'Commercial Refrigeration Repairs & Maintenance', text: 'Servicing, fault finding, maintenance and repairs for a wide range of commercial refrigeration equipment.', href: '/commercial-chiller-freezer-repairs/', track: 'refrigeration' },
          { icon: 'cold-room', title: 'Cold Room & Freezer Room Repairs', text: 'Fault finding, servicing and repairs for chilled and frozen cold room systems.', href: '/cold-room-repairs-maintenance/', track: 'refrigeration' },
          { icon: 'display', title: 'Display Cabinet Repairs & Maintenance', text: 'Servicing, maintenance and repairs for chilled and frozen display cabinets.', href: '/display-fridge-repairs-maintenance/', track: 'refrigeration' },
          { icon: 'ice', title: 'Cellar Cooling Repairs & Maintenance', text: 'Servicing, fault finding and repairs for commercial cellar cooling systems.', href: '/cellar-cooling-repairs-maintenance/', track: 'refrigeration' },
        ],
      },
      {
        type: 'gallery',
        tone: 'white',
        eyebrow: 'On the job',
        title: 'Out on site.',
        intro: 'Photos from recent refrigeration work on display cabinets and chilled equipment.',
        items: [{ image: 'jobCabinetGauges' }, { image: 'jobCabinetCompressor' }, { image: 'jobShopFloorTools' }],
      },
      {
        type: 'features',
        variant: 'list',
        eyebrow: 'Warning signs',
        title: 'Signs your refrigeration system needs attention.',
        items: [
          { icon: 'thermometer', title: 'Temperature problems', text: 'Equipment struggling to reach or maintain the correct temperature.' },
          { icon: 'ice', title: 'Ice build-up', text: 'Excessive frost or ice forming on or around the system.' },
          { icon: 'sound', title: 'Unusual noises', text: 'New or unusual rattling, buzzing, knocking or other noises.' },
          { icon: 'droplet', title: 'Water leaks', text: 'Water leaking or pooling around the equipment.' },
          { icon: 'activity', title: 'Running continuously', text: 'Equipment running for long periods or failing to cycle off normally.' },
          { icon: 'alert', title: 'Alarms or error codes', text: 'Fault codes, warning lights or alarms appearing on the controller or display.' },
        ],
      },
      {
        type: 'split',
        tone: 'white',
        icon: 'calendar',
        imageSide: 'right',
        eyebrow: 'Planned maintenance',
        title: 'Keep your refrigeration running reliably.',
        body: [
          'Regular planned maintenance helps keep your refrigeration equipment operating as it should, while identifying potential issues before they develop into costly breakdowns.',
        ],
        links: [{ label: 'Planned service & maintenance contracts', href: '/planned-maintenance-service-contracts/', track: 'maintenance' }],
      },
    ],
    midCta: { title: 'Need refrigeration support?', text: "Tell us what you need and we'll take it from there.", after: 2 },
    faqs: [
      { q: 'What types of refrigeration equipment do you work on?', a: 'We work on a range of commercial refrigeration equipment, including fridges, freezers, display cabinets, cold rooms and cellar cooling systems.' },
      { q: "Can you help if my chiller / freezer isn't holding temperature?", a: "Yes. We can fault-find the system to identify why it isn't maintaining temperature and advise on the repairs required." },
      { q: 'Do you offer planned refrigeration maintenance?', a: 'Yes. We offer scheduled maintenance for commercial refrigeration equipment to help maintain reliable operation and identify potential faults early.' },
    ],
    relatedTitle: 'You might also need.',
    related: [REL_CHILLER, REL_COLD_ROOM, REL_DISPLAY, REL_CELLAR],
    schema: { serviceType: 'Refrigeration servicing, maintenance, fault finding and repairs' },
  },

  {
    slug: 'commercial-chiller-freezer-repairs',
    group: 'refrigeration',
    navLabel: 'Commercial Chiller & Freezer Repairs',
    seo: {
      title: 'Commercial Chiller & Freezer Repairs | Coletrup Cooling',
      description:
        'Commercial chiller or freezer not holding temperature? Fault finding and repairs for temperature problems, ice build-up, leaks, unusual noises and breakdowns.',
    },
    breadcrumb: [{ label: 'Refrigeration', href: '/refrigeration-repairs-maintenance/' }],
    hero: {
      eyebrow: 'Commercial refrigeration',
      h1: 'Commercial chiller or freezer not holding temperature?',
      lead: "From temperature problems and ice build-up to leaks, unusual noises and complete breakdowns, we'll diagnose the fault and carry out the necessary repairs.",
      image: 'engineerGauges',
      imagePosition: '55% 40%',
      chips: ['Fault finding', 'Repairs'],
    },
    cta: { label: 'Request a repair', service: 'refrigeration', type: 'commercial', track: 'refrigeration' },
    stickyPrompt: 'Need refrigeration support?',
    whatsappMessage: "Hi Coletrup Cooling, I have a commercial chiller or freezer that needs repairing.",
    sections: [
      {
        type: 'features',
        variant: 'cards',
        tone: 'white',
        eyebrow: 'Common problems',
        title: 'Signs your refrigeration needs attention.',
        items: [
          { icon: 'thermometer', title: 'Not holding temperature', text: 'Struggling to maintain the correct operating temperature.' },
          { icon: 'ice', title: 'Ice build-up', text: "Excessive frost or ice forming where it shouldn't." },
          { icon: 'sound', title: 'Unusual noises', text: 'New or excessive humming, buzzing, knocking or clicking.' },
          { icon: 'droplet', title: 'Leaks', text: 'Water or other signs of leakage around the equipment.' },
          { icon: 'bolt', title: 'Electrical faults', text: 'Tripping, cutting out, failing to start or losing power.' },
          { icon: 'activity', title: 'Running constantly', text: 'Equipment running continuously or cycling more frequently than normal.' },
          { icon: 'alert', title: 'Alarms & error codes', text: 'Warning lights, alarms or fault codes showing on the controller.' },
        ],
      },
      {
        type: 'callout',
        icon: 'clipboard',
        title: 'Before you get in touch',
        intro: 'A few details can help us understand the fault:',
        items: ['What the equipment is doing, or not doing', 'The current temperature, if displayed', 'Any alarms or error codes showing', 'When the problem started', 'The make and model, if known'],
      },
      {
        type: 'steps',
        tone: 'white',
        eyebrow: 'How it works',
        title: 'From fault to repair.',
        items: [
          { title: "Tell us what's happening", text: 'Tell us the symptoms, temperature readings and any error codes showing.' },
          { title: 'We diagnose the fault', text: 'We carry out fault finding to identify the cause of the problem.' },
          { title: 'We get it sorted', text: "We explain what's required and carry out the necessary repair." },
        ],
      },
      {
        type: 'split',
        icon: 'display',
        imageSide: 'right',
        eyebrow: 'More refrigeration support',
        title: 'Commercial refrigeration covered.',
        body: ['Alongside commercial fridges and freezers, we service, maintain and repair display refrigeration, cold rooms and cellar cooling systems.'],
        links: [
          { label: 'Display refrigeration repairs & maintenance', href: '/display-fridge-repairs-maintenance/', track: 'refrigeration' },
          { label: 'Cold room repairs & maintenance', href: '/cold-room-repairs-maintenance/', track: 'refrigeration' },
          { label: 'Cellar cooling repairs & maintenance', href: '/cellar-cooling-repairs-maintenance/', track: 'refrigeration' },
        ],
      },
    ],
    midCta: { title: 'Need help with a refrigeration fault?', text: "Tell us what's happening and we'll arrange the next steps.", after: 1 },
    faqs: [
      { q: "My refrigeration equipment isn't holding temperature. What should I do?", a: 'If the temperature is rising or fluctuating, get in touch as soon as possible. We can diagnose the cause and advise on the repair required.' },
      { q: 'Why does my refrigeration equipment keep icing up?', a: 'Excessive ice build-up can indicate an underlying issue with airflow, defrost, controls or the refrigeration system. We can fault-find the cause and carry out the necessary repair.' },
      { q: 'Do you offer refrigeration servicing and maintenance?', a: 'Yes. We provide servicing and planned maintenance for commercial refrigeration equipment to help maintain performance, identify developing faults and reduce the risk of unexpected breakdowns.' },
    ],
    relatedTitle: 'You might also need.',
    related: [REL_REFRIGERATION, REL_COLD_ROOM, REL_DISPLAY, REL_CELLAR],
    schema: { serviceType: 'Commercial chiller and freezer repairs' },
  },

  {
    slug: 'cold-room-repairs-maintenance',
    group: 'refrigeration',
    navLabel: 'Cold Room Repairs & Maintenance',
    seo: {
      title: 'Cold Room Repairs & Maintenance | Coletrup Cooling',
      description:
        'Cold room fault finding, servicing, repairs and planned maintenance to keep your system operating reliably and holding temperature.',
    },
    breadcrumb: [{ label: 'Refrigeration', href: '/refrigeration-repairs-maintenance/' }],
    hero: {
      eyebrow: 'Cold rooms',
      h1: 'Cold room repairs & maintenance.',
      lead: 'Reliable temperature control is essential for any cold room. We provide fault finding, servicing, repairs and planned maintenance to keep your system operating reliably.',
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
        title: 'Complete support for your cold room.',
        items: [
          { icon: 'search', title: 'Fault finding', text: 'Accurate diagnosis to identify the cause of temperature or performance issues.' },
          { icon: 'calendar', title: 'Servicing', text: 'Routine servicing to keep your cold room clean, efficient and operating correctly.' },
          { icon: 'wrench', title: 'Repairs', text: 'Fault repairs to restore reliable operation and temperature control.' },
          { icon: 'clipboard', title: 'Maintenance', text: 'Planned maintenance tailored to your cold room and how your business uses it.' },
        ],
      },
      {
        type: 'features',
        variant: 'list',
        eyebrow: 'Warning signs',
        title: 'When to get in touch.',
        items: [
          { icon: 'thermometer', title: 'Temperature not holding', text: 'The cold room is struggling to maintain its set temperature.' },
          { icon: 'ice', title: 'Ice build-up', text: 'Excessive frost or ice forming on the evaporator or within the cold room.' },
          { icon: 'sound', title: 'Unusual noises', text: 'New or unusual noises coming from the refrigeration system.' },
          { icon: 'alert', title: 'Alarms or controller errors', text: 'Fault codes, alarms or warning indicators showing on the controller.' },
          { icon: 'activity', title: 'Running constantly', text: 'The refrigeration system is running continuously or rarely cycling off.' },
          { icon: 'droplet', title: 'Water leaks', text: 'Water leaking or pooling inside or around the cold room.' },
        ],
      },
      {
        type: 'split',
        tone: 'white',
        icon: 'calendar',
        imageSide: 'right',
        eyebrow: 'Planned maintenance',
        title: 'Keep your cold room running reliably.',
        body: [
          'Regular planned maintenance helps keep your cold room operating efficiently, maintain consistent temperatures and identify potential issues before they develop into unexpected breakdowns.',
        ],
        links: [{ label: 'Planned service & maintenance contracts', href: '/planned-maintenance-service-contracts/', track: 'maintenance' }],
      },
    ],
    midCta: { title: 'Need refrigeration support?', text: "Tell us what's happening and we'll take it from there.", after: 1 },
    faq: { title: 'Cold room FAQs.' },
    faqs: [
      { q: "What should I do if my cold room isn't holding temperature?", a: 'If the temperature is rising or fluctuating, get in touch as soon as possible. We can diagnose the cause and carry out the necessary repairs to get the system operating correctly again.' },
      { q: 'Do you offer planned maintenance for cold rooms?', a: 'Yes. We offer scheduled servicing and planned maintenance to help keep your cold room reliable, maintain performance and identify potential faults early.' },
      { q: 'Do you work on other commercial refrigeration equipment?', a: 'Yes. We also service and repair commercial fridges, freezers, display refrigeration and cellar cooling systems.' },
    ],
    relatedTitle: 'You might also need.',
    related: [
      REL_REFRIGERATION,
      rel('display-fridge-repairs-maintenance', 'Display Refrigeration Repairs & Maintenance', 'Servicing, maintenance, fault finding and repairs to keep display refrigeration operating reliably and holding the correct temperature.'),
      rel('commercial-chiller-freezer-repairs', 'Commercial Chiller & Freezer Repairs', "Fault finding and repairs for commercial fridges and freezers that aren't cooling, holding temperature or operating as they should."),
      REL_PLANNED_REFRIG,
    ],
    schema: { serviceType: 'Cold room repairs and maintenance' },
  },

  {
    slug: 'display-fridge-repairs-maintenance',
    group: 'refrigeration',
    navLabel: 'Display Refrigeration Repairs & Maintenance',
    seo: {
      title: 'Display Refrigeration Service & Repairs | Coletrup Cooling',
      description:
        'Servicing, maintenance, fault finding and repairs for commercial display refrigeration, helping keep your equipment operating reliably and products at the correct temperature.',
    },
    breadcrumb: [{ label: 'Refrigeration', href: '/refrigeration-repairs-maintenance/' }],
    hero: {
      eyebrow: 'Display refrigeration',
      h1: 'Display refrigeration service & repairs.',
      lead: 'We provide servicing, maintenance, fault finding and repairs for commercial display refrigeration, helping keep your equipment operating reliably and products at the correct temperature.',
      image: 'displayFridges',
      imagePosition: '60% 50%',
      chips: ['Service', 'Maintenance', 'Fault finding', 'Repairs'],
    },
    cta: { label: 'Request support', service: 'refrigeration', type: 'commercial', track: 'refrigeration' },
    stickyPrompt: 'Need refrigeration support?',
    whatsappMessage: "Hi Coletrup Cooling, I'd like to arrange a service or repair for display refrigeration.",
    sections: [
      {
        type: 'features',
        variant: 'cards',
        tone: 'white',
        eyebrow: 'What we do',
        title: 'Complete support for your display refrigeration.',
        items: [
          { icon: 'calendar', title: 'Servicing', text: 'Routine servicing to keep your display refrigeration clean, efficient and operating correctly.' },
          { icon: 'clipboard', title: 'Maintenance', text: 'Planned maintenance to help maintain performance and identify potential issues early.' },
          { icon: 'search', title: 'Fault finding', text: 'Thorough diagnosis to identify the cause of faults and performance issues.' },
          { icon: 'wrench', title: 'Repairs', text: 'Professional repairs to restore operation and get your refrigeration back to the correct temperature.' },
        ],
      },
      {
        type: 'features',
        variant: 'list',
        eyebrow: 'Warning signs',
        title: 'Signs your display refrigeration needs attention.',
        items: [
          { icon: 'thermometer', title: 'Products not staying cold', text: 'Products not maintaining the required temperature.' },
          { icon: 'droplet', title: 'Condensation or misting', text: 'Excessive condensation or misting on doors or display glass.' },
          { icon: 'ice', title: 'Ice build-up', text: 'Excessive frost or ice forming inside the cabinet.' },
          { icon: 'activity', title: 'Temperature fluctuations', text: 'Temperatures rising, falling or struggling to remain consistent.' },
          { icon: 'sound', title: 'Unusual noises', text: 'New or unusually loud noises from the refrigeration system.' },
          { icon: 'alert', title: 'Alarms or error codes', text: 'Warnings, alarms or fault codes showing on the controller or display.' },
        ],
      },
      {
        type: 'features',
        variant: 'columns',
        tone: 'navy',
        eyebrow: 'Where it matters',
        title: 'Display refrigeration for a range of businesses.',
        items: [
          { icon: 'store', title: 'Retail', text: 'Shops, convenience stores and supermarkets with chilled and frozen displays.' },
          { icon: 'hospitality', title: 'Hospitality', text: 'Restaurants, cafés, bars and other hospitality venues relying on refrigerated displays.' },
          { icon: 'box', title: 'Food & drink', text: 'Delis, bakeries, butchers and other food businesses requiring reliable product refrigeration.' },
        ],
      },
      {
        type: 'split',
        icon: 'calendar',
        imageSide: 'right',
        eyebrow: 'Planned maintenance',
        title: 'Keep your display refrigeration running reliably.',
        body: ['Regular planned maintenance helps keep your display refrigeration performing as it should, while giving us the opportunity to identify potential issues before they develop into costly breakdowns.'],
        links: [
          { label: 'Planned service & maintenance contracts', href: '/planned-maintenance-service-contracts/', track: 'maintenance' },
          { label: 'Commercial refrigeration services', href: '/refrigeration-repairs-maintenance/', track: 'refrigeration' },
        ],
      },
    ],
    faqs: [
      { q: 'Why are my display fridge doors misting up?', a: "Misting can have several causes. If it's happening more than usual, or products aren't staying cold, it's worth having the equipment looked at." },
      { q: 'Can you service several display cabinets at once?', a: "Yes. We can service multiple display cabinets, and set up planned maintenance if you'd like regular scheduled visits." },
      { q: 'Do you work on cold rooms and cellar cooling too?', a: 'Yes. We provide fault finding, servicing, repairs and maintenance for cold rooms and cellar cooling systems.' },
    ],
    relatedTitle: 'You might also need.',
    related: [
      REL_REFRIGERATION,
      rel('cold-room-repairs-maintenance', 'Cold Room Repairs & Maintenance', 'Fault finding, servicing, maintenance and repairs to keep cold rooms operating reliably and holding the correct temperature.'),
      rel('cellar-cooling-repairs-maintenance', 'Cellar Cooling Repairs & Maintenance', 'Servicing, fault finding, maintenance and repairs for cellar cooling systems, helping maintain reliable temperature control.'),
      REL_PLANNED_REFRIG,
    ],
    schema: { serviceType: 'Display refrigeration repairs and maintenance' },
  },

  // Cellar cooling — DRAFT wording (follows the cold room page pattern) for Brad to approve
  {
    slug: 'cellar-cooling-repairs-maintenance',
    group: 'refrigeration',
    navLabel: 'Cellar Cooling Repairs & Maintenance',
    seo: {
      title: 'Cellar Cooling Repairs & Maintenance | Coletrup Cooling',
      description:
        'Servicing, maintenance, fault finding and repairs for cellar cooling systems in pubs, bars and hospitality premises, helping maintain the correct storage temperature.',
    },
    breadcrumb: [{ label: 'Refrigeration', href: '/refrigeration-repairs-maintenance/' }],
    hero: {
      eyebrow: 'Cellar cooling',
      h1: 'Cellar cooling repairs & maintenance.',
      lead: 'A cellar that holds the correct temperature is essential for pubs, bars and hospitality venues. We provide servicing, maintenance, fault finding and repairs to keep your cellar cooling system operating reliably.',
      chips: ['Fault finding', 'Servicing', 'Repairs', 'Maintenance'],
    },
    cta: { label: 'Request a repair', service: 'refrigeration', type: 'commercial', track: 'refrigeration' },
    stickyPrompt: 'Need refrigeration support?',
    whatsappMessage: "Hi Coletrup Cooling, I need help with a cellar cooling system.",
    sections: [
      {
        type: 'features',
        variant: 'cards',
        tone: 'white',
        eyebrow: 'What we do',
        title: 'Complete support for your cellar cooling.',
        items: [
          { icon: 'search', title: 'Fault finding', text: 'Accurate diagnosis to identify the cause of temperature or performance issues.' },
          { icon: 'calendar', title: 'Servicing', text: 'Routine servicing to keep your cellar cooling clean, efficient and operating correctly.' },
          { icon: 'wrench', title: 'Repairs', text: 'Fault repairs to restore reliable operation and temperature control.' },
          { icon: 'clipboard', title: 'Maintenance', text: 'Planned maintenance tailored to your cellar and how your business uses it.' },
        ],
      },
      {
        type: 'features',
        variant: 'list',
        eyebrow: 'Warning signs',
        title: 'When to get in touch.',
        items: [
          { icon: 'thermometer', title: 'Cellar too warm', text: 'The cellar is struggling to reach or maintain its set temperature.' },
          { icon: 'ice', title: 'Ice build-up', text: 'Excessive frost or ice forming on the cooler.' },
          { icon: 'sound', title: 'Unusual noises', text: 'New or unusual noises coming from the cooling system.' },
          { icon: 'alert', title: 'Alarms or controller errors', text: 'Fault codes, alarms or warning indicators showing on the controller.' },
          { icon: 'activity', title: 'Running constantly', text: 'The system is running continuously or rarely cycling off.' },
          { icon: 'droplet', title: 'Water leaks', text: 'Water leaking or pooling around the cooler.' },
        ],
      },
      {
        type: 'split',
        tone: 'white',
        icon: 'calendar',
        imageSide: 'right',
        eyebrow: 'Planned maintenance',
        title: 'Keep your cellar cooling running reliably.',
        body: [
          'Regular planned maintenance helps keep your cellar cooling operating efficiently, maintain consistent temperatures and identify potential issues before they develop into unexpected breakdowns.',
        ],
        links: [{ label: 'Planned service & maintenance contracts', href: '/planned-maintenance-service-contracts/', track: 'maintenance' }],
      },
    ],
    midCta: { title: 'Need refrigeration support?', text: "Tell us what's happening and we'll take it from there.", after: 1 },
    faq: { title: 'Cellar cooling FAQs.' },
    faqs: [
      { q: "What should I do if my cellar isn't holding temperature?", a: 'If the temperature is rising or fluctuating, get in touch as soon as possible. We can diagnose the cause and carry out the necessary repairs to get the system operating correctly again.' },
      { q: 'Do you offer planned maintenance for cellar cooling?', a: 'Yes. We offer scheduled servicing and planned maintenance to help keep your cellar cooling reliable, maintain performance and identify potential faults early.' },
      { q: 'Do you work on other commercial refrigeration equipment?', a: 'Yes. We also service and repair commercial fridges, freezers, display refrigeration and cold rooms.' },
    ],
    relatedTitle: 'You might also need.',
    related: [REL_REFRIGERATION, REL_COLD_ROOM, REL_DISPLAY, REL_PLANNED_REFRIG],
    schema: { serviceType: 'Cellar cooling repairs and maintenance' },
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
      image: 'commercialRestaurantCheckDark',
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
          { icon: 'ac-unit', eyebrow: 'Air conditioning', title: 'Commercial air conditioning', text: 'Planned maintenance for air conditioning in offices, retail, hospitality, warehouses and other premises.', href: '/commercial-air-conditioning-maintenance/', linkLabel: 'Commercial maintenance', track: 'maintenance' },
          { icon: 'fridge', eyebrow: 'Refrigeration', title: 'Refrigeration equipment', text: 'Planned maintenance for fridges, freezers, display refrigeration, cold rooms, cellar cooling and other commercial refrigeration equipment.', href: '/refrigeration-repairs-maintenance/', linkLabel: 'Refrigeration support', track: 'refrigeration' },
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
        icon: 'shield',
        imageSide: 'left',
        eyebrow: 'Why plan maintenance',
        title: 'Prevention is better than a breakdown.',
        body: [
          'Planned maintenance helps you stay ahead of problems rather than reacting to them. Regular servicing gives potential issues the chance to be spotted early, and gives you a clearer picture of your equipment over time.',
          'Looking for servicing at home? Our air conditioning service and maintenance is designed for homes.',
        ],
        links: [
          { label: 'Air conditioning service & maintenance', href: '/air-conditioning-servicing-maintenance/', track: 'maintenance' },
          { label: 'Commercial air conditioning maintenance', href: '/commercial-air-conditioning-maintenance/', track: 'maintenance' },
        ],
      },
    ],
    faqs: [
      { q: 'What is a planned maintenance contract?', a: 'An ongoing arrangement where servicing and maintenance are scheduled in advance, rather than arranged only when something goes wrong.' },
      { q: 'What equipment can be covered?', a: 'Commercial air conditioning and refrigeration equipment, including display refrigeration, cold rooms and cellar cooling. Every arrangement is tailored to your equipment.' },
      { q: 'Can the arrangement be tailored?', a: 'Yes. We shape each arrangement around your equipment, your premises and how you use them.' },
      { q: 'I only have air conditioning at home. What do you recommend?', a: 'Our air conditioning service and maintenance is designed for homes. For most systems, we recommend servicing at least once a year.' },
    ],
    related: ['commercial-air-conditioning-maintenance', 'refrigeration-repairs-maintenance', 'air-conditioning-servicing-maintenance', 'commercial-air-conditioning'],
    finalCta: { title: 'Need air conditioning or refrigeration support?' },
    schema: { serviceType: 'Planned maintenance and service contracts for air conditioning and refrigeration' },
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
