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
      { label: 'Residential Air Conditioning', href: '/residential-air-conditioning/', desc: 'Year-round comfort, tailored to your home' },
      { label: 'Air Conditioning Installation', href: '/air-conditioning-installation/', desc: 'The right system, professionally installed' },
      { label: 'Air Conditioning Repairs', href: '/air-conditioning-repairs/', desc: 'Fault finding and repairs' },
      { label: 'Air Conditioning Service & Maintenance', href: '/air-conditioning-servicing-maintenance/', desc: 'Keep your system performing at its best' },
    ],
  },
  {
    label: 'Commercial Air Conditioning',
    short: 'Commercial',
    href: '/commercial-air-conditioning/',
    children: [
      { label: 'Commercial Air Conditioning Installation', href: '/commercial-air-conditioning/', desc: 'Reliable heating & cooling for your business' },
      { label: 'Commercial Air Conditioning Service & Repairs', href: '/commercial-air-conditioning-repairs/', desc: 'Fault finding, diagnostics and repairs' },
      { label: 'Commercial Air Conditioning Maintenance', href: '/commercial-air-conditioning-maintenance/', desc: 'Planned maintenance for commercial systems' },
    ],
  },
  {
    label: 'Refrigeration',
    short: 'Refrigeration',
    href: '/refrigeration-repairs-maintenance/',
    children: [
      { label: 'Refrigeration Repairs & Maintenance', href: '/refrigeration-repairs-maintenance/', desc: 'Commercial refrigeration servicing, maintenance and repairs' },
      { label: 'Commercial Chiller & Freezer Repairs', href: '/commercial-chiller-freezer-repairs/', desc: 'Fault finding and repairs' },
      { label: 'Cold Room Repairs & Maintenance', href: '/cold-room-repairs-maintenance/', desc: 'Cold room and freezer room service and repairs' },
      { label: 'Display Refrigeration Repairs & Maintenance', href: '/display-fridge-repairs-maintenance/', desc: 'Display cabinets serviced and repaired' },
      { label: 'Cellar Cooling Repairs & Maintenance', href: '/cellar-cooling-repairs-maintenance/', desc: 'Cellar cooling for pubs, bars and hospitality' },
      { label: 'Planned Maintenance & Service Contracts', href: '/planned-maintenance-service-contracts/', desc: 'Scheduled refrigeration maintenance' },
    ],
  },
  { label: 'About', href: '/about/' },
  { label: 'Areas We Cover', href: '/areas-we-cover/' },
  { label: 'Contact', href: '/contact/' },
];

export const footerNav = {
  residential: {
    title: 'Residential',
    links: [
      { label: 'Home Air Conditioning', href: '/residential-air-conditioning/' },
      { label: 'Air Conditioning Installation', href: '/air-conditioning-installation/' },
      { label: 'Service & Maintenance', href: '/air-conditioning-servicing-maintenance/' },
      { label: 'Fault Finding & Repairs', href: '/air-conditioning-repairs/' },
      { label: 'Planned Maintenance', href: '/air-conditioning-servicing-maintenance/' },
    ],
  },
  commercial: {
    title: 'Commercial',
    links: [
      { label: 'Commercial Air Conditioning', href: '/commercial-air-conditioning/' },
      { label: 'Installation & Replacement', href: '/commercial-air-conditioning/' },
      { label: 'Service & Maintenance', href: '/commercial-air-conditioning-maintenance/' },
      { label: 'Fault Finding & Repairs', href: '/commercial-air-conditioning-repairs/' },
      { label: 'Planned Maintenance', href: '/planned-maintenance-service-contracts/' },
    ],
  },
  refrigeration: {
    title: 'Refrigeration',
    links: [
      { label: 'Commercial Refrigeration', href: '/refrigeration-repairs-maintenance/' },
      { label: 'Service & Maintenance', href: '/refrigeration-repairs-maintenance/' },
      { label: 'Fault Finding & Repairs', href: '/refrigeration-repairs-maintenance/' },
      { label: 'Chillers & Freezers Maintenance & Repairs', href: '/commercial-chiller-freezer-repairs/' },
      { label: 'Display Cases Maintenance & Repairs', href: '/display-fridge-repairs-maintenance/' },
      { label: 'Cold Rooms Maintenance & Repairs', href: '/cold-room-repairs-maintenance/' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About Coletrup Cooling', href: '/about/' },
      { label: 'Areas We Cover', href: '/areas-we-cover/' },
      { label: 'Contact', href: '/contact/' },
      { label: 'Get a Quote', href: '/contact/#quote' },
    ],
  },
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy/' },
    { label: 'Cookie Policy', href: '/cookie-policy/' },
    { label: 'Terms', href: '/terms/' },
  ],
};
