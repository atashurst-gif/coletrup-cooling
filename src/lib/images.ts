/**
 * IMAGE REGISTRY — every photo on the site, with an SEO filename and descriptive alt text.
 * Filenames double as the image's "name" for search engines; alt text describes what is
 * genuinely in the photo (no keyword stuffing). Add a photo here once and reference it
 * by key anywhere. Responsive AVIF/WebP sets are generated at build time.
 */
import livingRoom from '../assets/images/residential-air-conditioning-living-room.jpg';
import engineerHome from '../assets/images/air-conditioning-engineer-servicing-home-unit.jpg';
import engineerRooftop from '../assets/images/commercial-air-conditioning-engineer-rooftop.jpg';
import displayFridges from '../assets/images/commercial-display-fridges.jpg';
import outdoorFan from '../assets/images/air-conditioning-outdoor-unit-fan.jpg';
import thermostat from '../assets/images/home-air-conditioning-thermostat-room-temperature.jpg';
import coldRoom from '../assets/images/cold-room-refrigeration.jpg';
import engineerGauges from '../assets/images/engineer-refrigerant-gauges-diagnostics.jpg';
import airflow from '../assets/images/coletrup-airflow-graphic.jpg';
import van from '../assets/images/coletrup-cooling-service-van.jpg';
import coldRoomEngineer from '../assets/images/refrigeration-engineer-repairing-cold-room-evaporator.jpg';
import supermarketChillers from '../assets/images/supermarket-chilled-and-frozen-food-display-cabinets.jpg';
import restaurantCassette from '../assets/images/restaurant-ceiling-cassette-air-conditioning.jpg';
import officeBoardroom from '../assets/images/office-meeting-room-ceiling-cassette-air-conditioning.jpg';
import openPlanLiving from '../assets/images/open-plan-living-kitchen-air-conditioning.jpg';
import gardenRoom from '../assets/images/garden-room-home-office-air-conditioning.jpg';
import homeOffice from '../assets/images/home-office-wall-mounted-air-conditioning.jpg';
import kitchenDiner from '../assets/images/kitchen-diner-wall-mounted-air-conditioning.jpg';
import bedroom from '../assets/images/bedroom-wall-mounted-air-conditioning.jpg';
import livingRoomBifold from '../assets/images/living-room-bifold-doors-air-conditioning.jpg';
import engineerFilterClean from '../assets/images/air-conditioning-engineer-cleaning-filter-wall-unit.jpg';
import engineerOutdoorGauges from '../assets/images/engineer-testing-outdoor-air-conditioning-unit-gauges.jpg';
import engineerInstallDining from '../assets/images/engineer-installing-wall-mounted-air-conditioning-dining-room.jpg';
import commercialRestaurantCheck from '../assets/images/commercial-air-conditioning-engineer-restaurant-tablet-check.jpg';
import commercialOfficeFilter from '../assets/images/engineer-cleaning-ceiling-cassette-air-conditioning-filter-office.jpg';
import commercialRooftopGauges from '../assets/images/commercial-rooftop-air-conditioning-unit-repair-gauges.jpg';
import commercialCassetteInstall from '../assets/images/engineer-installing-ceiling-cassette-air-conditioning-boardroom.jpg';
import engineerHomeDark from '../assets/images/engineer-inspecting-wall-mounted-air-conditioning-unit.jpg';
import engineerFilterCleanDark from '../assets/images/engineer-cleaning-wall-mounted-air-conditioning-filter.jpg';
import engineerInstallDiningDark from '../assets/images/engineer-fitting-wall-mounted-air-conditioning-kitchen-diner.jpg';
import commercialRestaurantCheckDark from '../assets/images/engineer-inspecting-restaurant-ceiling-cassette-air-conditioning.jpg';
import commercialCassetteInstallDark from '../assets/images/engineer-fitting-ceiling-cassette-air-conditioning-meeting-room.jpg';

export type ImageKey =
  | 'livingRoom'
  | 'engineerHome'
  | 'engineerRooftop'
  | 'displayFridges'
  | 'outdoorFan'
  | 'thermostat'
  | 'coldRoom'
  | 'engineerGauges'
  | 'airflow'
  | 'van'
  | 'coldRoomEngineer'
  | 'supermarketChillers'
  | 'restaurantCassette'
  | 'officeBoardroom'
  | 'openPlanLiving'
  | 'gardenRoom'
  | 'homeOffice'
  | 'kitchenDiner'
  | 'bedroom'
  | 'livingRoomBifold'
  | 'engineerFilterClean'
  | 'engineerOutdoorGauges'
  | 'engineerInstallDining'
  | 'commercialRestaurantCheck'
  | 'commercialOfficeFilter'
  | 'commercialRooftopGauges'
  | 'commercialCassetteInstall'
  | 'engineerHomeDark'
  | 'engineerFilterCleanDark'
  | 'engineerInstallDiningDark'
  | 'commercialRestaurantCheckDark'
  | 'commercialCassetteInstallDark';

export const images: Record<ImageKey, { src: ImageMetadata; alt: string; title?: string }> = {
  // ---- Residential
  livingRoom: {
    src: livingRoom,
    alt: 'Modern living room with a white wall-mounted air conditioning unit above a cream sofa and patio doors',
    title: 'Residential air conditioning — living room',
  },
  livingRoomBifold: {
    src: livingRoomBifold,
    alt: 'Living room with bifold doors to the garden and a wall-mounted air conditioning unit above the sofa',
    title: 'Home air conditioning — living room with bifold doors',
  },
  engineerFilterClean: {
    src: engineerFilterClean,
    alt: 'Coletrup Cooling engineer removing the filter from a wall-mounted air conditioning unit for cleaning',
    title: 'Air conditioning servicing and filter cleaning',
  },
  engineerOutdoorGauges: {
    src: engineerOutdoorGauges,
    alt: 'Coletrup Cooling engineer checking refrigerant pressures with gauges on an outdoor air conditioning unit',
    title: 'Air conditioning fault diagnosis',
  },
  engineerInstallDining: {
    src: engineerInstallDining,
    alt: 'Coletrup Cooling engineer fitting a wall-mounted air conditioning unit in an open-plan kitchen diner',
    title: 'Home air conditioning installation',
  },
  commercialRestaurantCheck: {
    src: commercialRestaurantCheck,
    alt: 'Coletrup Cooling engineer checking a ceiling cassette air conditioning unit in a restaurant using a tablet',
    title: 'Commercial air conditioning maintenance check',
  },
  commercialOfficeFilter: {
    src: commercialOfficeFilter,
    alt: 'Engineer removing the filter from a ceiling cassette air conditioning unit in an office',
    title: 'Office air conditioning servicing',
  },
  commercialRooftopGauges: {
    src: commercialRooftopGauges,
    alt: 'Coletrup Cooling engineer testing a commercial rooftop air conditioning unit with refrigerant gauges',
    title: 'Commercial air conditioning repair',
  },
  commercialCassetteInstall: {
    src: commercialCassetteInstall,
    alt: 'Coletrup Cooling engineer fitting a ceiling cassette air conditioning unit in a boardroom',
    title: 'Commercial air conditioning installation',
  },
  // ---- Charcoal-uniform set (supplied 30 Sep) — used so no photo repeats across the site
  engineerHomeDark: {
    src: engineerHomeDark,
    alt: 'Coletrup Cooling engineer inspecting the filters of a wall-mounted air conditioning unit in a bright room',
    title: 'Air conditioning inspection and repair',
  },
  engineerFilterCleanDark: {
    src: engineerFilterCleanDark,
    alt: 'Coletrup Cooling engineer lifting the filter out of a wall-mounted air conditioning unit in a living room',
    title: 'Air conditioning filter cleaning',
  },
  engineerInstallDiningDark: {
    src: engineerInstallDiningDark,
    alt: 'Coletrup Cooling engineer fitting a wall-mounted air conditioning unit in a kitchen diner',
    title: 'Wall-mounted air conditioning installation',
  },
  commercialRestaurantCheckDark: {
    src: commercialRestaurantCheckDark,
    alt: 'Coletrup Cooling engineer recording a ceiling cassette air conditioning check on a tablet in a restaurant',
    title: 'Restaurant air conditioning maintenance',
  },
  commercialCassetteInstallDark: {
    src: commercialCassetteInstallDark,
    alt: 'Coletrup Cooling engineer securing a ceiling cassette air conditioning unit in a meeting room',
    title: 'Ceiling cassette air conditioning installation',
  },
  openPlanLiving: {
    src: openPlanLiving,
    alt: 'Open-plan living, dining and kitchen space with two wall-mounted air conditioning units',
    title: 'Air conditioning for open-plan living spaces',
  },
  bedroom: {
    src: bedroom,
    alt: 'Bedroom with a wall-mounted air conditioning unit above the bed and doors to the garden',
    title: 'Bedroom air conditioning',
  },
  homeOffice: {
    src: homeOffice,
    alt: 'Home office with a wall-mounted air conditioning unit above the desk',
    title: 'Home office air conditioning',
  },
  gardenRoom: {
    src: gardenRoom,
    alt: 'Garden room home office with sliding doors and a wall-mounted air conditioning unit',
    title: 'Air conditioning for garden rooms and extensions',
  },
  kitchenDiner: {
    src: kitchenDiner,
    alt: 'Kitchen diner with a wall-mounted air conditioning unit beside doors to the garden',
    title: 'Kitchen diner air conditioning',
  },
  thermostat: {
    src: thermostat,
    alt: 'Wall-mounted digital thermostat showing a room temperature of 21.5°C',
    title: 'Temperature control',
  },
  engineerHome: {
    src: engineerHome,
    alt: 'Coletrup Cooling engineer servicing a wall-mounted air conditioning unit in a home',
    title: 'Air conditioning servicing at home',
  },
  // ---- Commercial
  engineerRooftop: {
    src: engineerRooftop,
    alt: 'Coletrup Cooling engineer working on a commercial air conditioning condenser unit on a rooftop',
    title: 'Commercial air conditioning maintenance',
  },
  officeBoardroom: {
    src: officeBoardroom,
    alt: 'Office meeting room with a ceiling cassette air conditioning unit',
    title: 'Office air conditioning',
  },
  restaurantCassette: {
    src: restaurantCassette,
    alt: 'Restaurant dining room with a ceiling cassette air conditioning unit',
    title: 'Hospitality air conditioning',
  },
  outdoorFan: {
    src: outdoorFan,
    alt: 'Close-up of the fan grille on an air conditioning outdoor unit',
    title: 'Air conditioning outdoor unit',
  },
  engineerGauges: {
    src: engineerGauges,
    alt: 'Coletrup Cooling engineer in safety glasses checking system pressures with manifold gauges',
    title: 'Fault finding and diagnostics',
  },
  // ---- Refrigeration (servicing, maintenance and repairs)
  displayFridges: {
    src: displayFridges,
    alt: 'Row of illuminated glass-door display fridges stocked with chilled food',
    title: 'Display fridge servicing and repairs',
  },
  supermarketChillers: {
    src: supermarketChillers,
    alt: 'Supermarket aisle of chilled and frozen food display cabinets',
    title: 'Commercial refrigeration servicing and repairs',
  },
  coldRoom: {
    src: coldRoom,
    alt: 'Clean cold room with stainless steel shelving and a ceiling-mounted evaporator unit',
    title: 'Cold room servicing and repairs',
  },
  coldRoomEngineer: {
    src: coldRoomEngineer,
    alt: 'Refrigeration engineer repairing the evaporator unit inside a commercial cold room',
    title: 'Cold room repairs',
  },
  // ---- Brand
  van: {
    src: van,
    alt: 'Coletrup Cooling branded service van outside a commercial building',
    title: 'Coletrup Cooling service van',
  },
  airflow: {
    src: airflow,
    alt: '',
  },
};
