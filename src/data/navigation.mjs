/**
 * Site navigation — header, mobile menu and footer all read from here.
 * `short` is the compact desktop label; `label` is the full name used in
 * dropdowns, the mobile menu, the footer and accessible names.
 */
export const mainNav = [
  { label: 'Home', href: '/' },
  {
    label: 'Residential Air Conditioning',
    short: 'Residential',
    href: '/residential-air-conditioning/',
    children: [
      { label: 'Residential Air Conditioning', href: '/residential-air-conditioning/', desc: 'Comfortable cooling designed around your home' },
      { label: 'Air Conditioning Installation', href: '/air-conditioning-installation/', desc: 'The right system, professionally installed' },
      { label: 'Air Conditioning Repairs', href: '/air-conditioning-repairs/', desc: 'Fault finding and repairs' },
      { label: 'Air Conditioning Servicing & Maintenance', href: '/air-conditioning-servicing-maintenance/', desc: 'Keep your system performing at its best' },
    ],
  },
  {
    label: 'Commercial Air Conditioning',
    short: 'Commercial',
    href: '/commercial-air-conditioning/',
    children: [
      { label: 'Commercial Air Conditioning', href: '/commercial-air-conditioning/', desc: 'Reliable cooling for your business' },
      { label: 'Commercial Air Conditioning Repairs', href: '/commercial-air-conditioning-repairs/', desc: 'Fault finding and repairs for businesses' },
      { label: 'Commercial Air Conditioning Maintenance', href: '/commercial-air-conditioning-maintenance/', desc: 'Planned maintenance for commercial systems' },
    ],
  },
  {
    label: 'Refrigeration',
    short: 'Refrigeration',
    href: '/refrigeration-repairs-maintenance/',
    children: [
      { label: 'Refrigeration Repairs & Maintenance', href: '/refrigeration-repairs-maintenance/', desc: 'Specialist servicing, maintenance and repairs' },
      { label: 'Fridge & Freezer Repairs', href: '/fridge-freezer-repairs/', desc: 'Fault finding and repairs' },
      { label: 'Cold Room Repairs & Maintenance', href: '/cold-room-repairs-maintenance/', desc: 'Cold room service and repairs' },
      { label: 'Display Fridge Repairs & Maintenance', href: '/display-fridge-repairs-maintenance/', desc: 'Keep display refrigeration performing' },
    ],
  },
  { label: 'Planned Maintenance & Service Contracts', short: 'Maintenance', href: '/planned-maintenance-service-contracts/' },
  { label: 'About', href: '/about/' },
  { label: 'Areas We Cover', href: '/areas-we-cover/' },
  { label: 'Contact', href: '/contact/' },
];

export const footerNav = {
  residential: {
    title: 'Residential',
    links: [
      { label: 'Residential Air Conditioning', href: '/residential-air-conditioning/' },
      { label: 'Air Conditioning Installation', href: '/air-conditioning-installation/' },
      { label: 'Air Conditioning Repairs', href: '/air-conditioning-repairs/' },
      { label: 'Servicing & Maintenance', href: '/air-conditioning-servicing-maintenance/' },
    ],
  },
  commercial: {
    title: 'Commercial',
    links: [
      { label: 'Commercial Air Conditioning', href: '/commercial-air-conditioning/' },
      { label: 'Commercial Repairs', href: '/commercial-air-conditioning-repairs/' },
      { label: 'Commercial Maintenance', href: '/commercial-air-conditioning-maintenance/' },
      { label: 'Planned Maintenance & Contracts', href: '/planned-maintenance-service-contracts/' },
    ],
  },
  refrigeration: {
    title: 'Refrigeration',
    links: [
      { label: 'Refrigeration Repairs & Maintenance', href: '/refrigeration-repairs-maintenance/' },
      { label: 'Fridge & Freezer Repairs', href: '/fridge-freezer-repairs/' },
      { label: 'Cold Room Repairs & Maintenance', href: '/cold-room-repairs-maintenance/' },
      { label: 'Display Fridge Repairs & Maintenance', href: '/display-fridge-repairs-maintenance/' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About', href: '/about/' },
      { label: 'Areas We Cover', href: '/areas-we-cover/' },
      { label: 'Contact & Get a Quote', href: '/contact/' },
    ],
  },
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy/' },
    { label: 'Cookie Policy', href: '/cookie-policy/' },
    { label: 'Terms', href: '/terms/' },
  ],
};
