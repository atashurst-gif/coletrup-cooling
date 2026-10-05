/**
 * IMAGE REGISTRY — every photo on the site, with an SEO filename and descriptive alt text.
 * Filenames double as the image's "name" for search engines; alt text describes what is
 * genuinely in the photo (no keyword stuffing). Add a photo here once and reference it
 * by key anywhere. Responsive AVIF/WebP sets are generated at build time.
 *
 * RULE (site owner): every photo is used on exactly ONE page — `node tools/image-audit.mjs`
 * fails the build if a photo appears on two pages or twice on one page. Uniform rule:
 * engineers indoors wear the shirt; outdoors and around fridges/freezers/cold rooms they
 * wear the black coat. Earlier navy-uniform variants live in tools/photo-originals/retired/.
 */
// ---- Homes (no people)
import livingRoom from '../assets/images/residential-air-conditioning-living-room.jpg';
import livingRoomBifold from '../assets/images/living-room-corner-sofa-wall-mounted-air-conditioning.jpg';
import bedroom from '../assets/images/bedroom-wall-mounted-air-conditioning.jpg';
import homeOffice from '../assets/images/home-office-wall-mounted-air-conditioning.jpg';
import gardenRoom from '../assets/images/garden-room-home-office-air-conditioning.jpg';
import openPlanLiving from '../assets/images/open-plan-living-kitchen-air-conditioning.jpg';
import kitchenDiner from '../assets/images/kitchen-diner-wall-mounted-air-conditioning.jpg';
import thermostat from '../assets/images/home-air-conditioning-thermostat-room-temperature.jpg';
import outdoorFan from '../assets/images/air-conditioning-outdoor-unit-fan.jpg';
// ---- Engineers indoors (shirt)
import engineerHomeDark from '../assets/images/engineer-inspecting-wall-mounted-air-conditioning-unit.jpg';
import engineerFilterCleanDark from '../assets/images/engineer-cleaning-wall-mounted-air-conditioning-filter.jpg';
import engineerInstallDiningDark from '../assets/images/engineer-fitting-wall-mounted-air-conditioning-kitchen-diner.jpg';
import commercialRestaurantCheckDark from '../assets/images/engineer-inspecting-restaurant-ceiling-cassette-air-conditioning.jpg';
import commercialCassetteInstallDark from '../assets/images/engineer-fitting-ceiling-cassette-air-conditioning-meeting-room.jpg';
import commercialOfficeFilter from '../assets/images/engineer-cleaning-ceiling-cassette-air-conditioning-filter-office.jpg';
// ---- Engineers outdoors (coat)
import engineerOutdoorGauges from '../assets/images/engineer-testing-outdoor-air-conditioning-unit-gauges.jpg';
import commercialRooftopGauges from '../assets/images/commercial-rooftop-air-conditioning-unit-repair-gauges.jpg';
import engineerGauges from '../assets/images/engineer-refrigerant-gauges-diagnostics.jpg';
import outdoorElectrical from '../assets/images/engineer-wiring-outdoor-air-conditioning-unit.jpg';
import outdoorTablet from '../assets/images/engineer-recording-commercial-air-conditioning-checks-tablet.jpg';
import engineerPortrait from '../assets/images/coletrup-cooling-engineer-outside-premises.jpg';
// ---- Commercial spaces (no people)
import officeBoardroom from '../assets/images/office-meeting-room-ceiling-cassette-air-conditioning.jpg';
import restaurantCassette from '../assets/images/restaurant-ceiling-cassette-air-conditioning.jpg';
// ---- Refrigeration (coat)
import displayFridges from '../assets/images/commercial-display-fridges.jpg';
import supermarketChillers from '../assets/images/supermarket-chilled-and-frozen-food-display-cabinets.jpg';
import coldRoom from '../assets/images/cold-room-refrigeration.jpg';
import coldRoomEngineer from '../assets/images/refrigeration-engineer-repairing-cold-room-evaporator.jpg';
import fridgeGaugesCoat from '../assets/images/refrigeration-engineer-testing-display-fridge-gauges.jpg';
// ---- Brand & planning
import van from '../assets/images/coletrup-cooling-service-van.jpg';
import maintenanceChecklist from '../assets/images/planned-maintenance-service-contract-checklist.jpg';
// ---- On the job (real photos supplied by Brad, 2 Oct)
import jobCabinetGauges from '../assets/images/refrigerant-gauges-on-display-cabinet-refrigeration-system.jpg';
import jobUnitGauges from '../assets/images/manifold-gauges-connected-to-air-conditioning-unit.jpg';
import jobShopFloorTools from '../assets/images/refrigeration-engineer-tools-and-gauges-on-shop-floor.jpg';
import jobCompressorSwap from '../assets/images/old-and-new-scroll-compressors-during-repair.jpg';
import jobCabinetCompressor from '../assets/images/compressor-and-pipework-inside-refrigerated-cabinet.jpg';
import jobCompressorPack from '../assets/images/new-compressor-beside-commercial-compressor-pack.jpg';
import jobControlPanel from '../assets/images/control-panel-contactors-and-wiring-fault-finding.jpg';
import jobClampMeter from '../assets/images/clamp-meter-testing-ceiling-cassette-air-conditioning.jpg';
import jobOutdoorClean from '../assets/images/outdoor-air-conditioning-unit-being-cleaned.jpg';
import jobDirtyFilters from '../assets/images/dirty-air-conditioning-filters-removed-for-cleaning.jpg';
import airflow from '../assets/images/coletrup-airflow-graphic.jpg';
import graphicWaves from '../assets/images/coletrup-airflow-graphic-blue-orange-waves.jpg';
import graphicDeepWave from '../assets/images/coletrup-airflow-graphic-deep-blue-wave.jpg';
import graphicRising from '../assets/images/coletrup-airflow-graphic-rising-waves.jpg';
import graphicSoft from '../assets/images/coletrup-airflow-graphic-soft-blue-waves.jpg';

export type ImageKey =
  | 'livingRoom'
  | 'livingRoomBifold'
  | 'bedroom'
  | 'homeOffice'
  | 'gardenRoom'
  | 'openPlanLiving'
  | 'kitchenDiner'
  | 'thermostat'
  | 'outdoorFan'
  | 'engineerHomeDark'
  | 'engineerFilterCleanDark'
  | 'engineerInstallDiningDark'
  | 'commercialRestaurantCheckDark'
  | 'commercialCassetteInstallDark'
  | 'commercialOfficeFilter'
  | 'engineerOutdoorGauges'
  | 'commercialRooftopGauges'
  | 'engineerGauges'
  | 'outdoorElectrical'
  | 'outdoorTablet'
  | 'engineerPortrait'
  | 'officeBoardroom'
  | 'restaurantCassette'
  | 'displayFridges'
  | 'supermarketChillers'
  | 'coldRoom'
  | 'coldRoomEngineer'
  | 'fridgeGaugesCoat'
  | 'van'
  | 'maintenanceChecklist'
  | 'jobCabinetGauges'
  | 'jobUnitGauges'
  | 'jobShopFloorTools'
  | 'jobCompressorSwap'
  | 'jobCabinetCompressor'
  | 'jobCompressorPack'
  | 'jobControlPanel'
  | 'jobClampMeter'
  | 'jobOutdoorClean'
  | 'jobDirtyFilters'
  | 'airflow'
  | 'graphicWaves'
  | 'graphicDeepWave'
  | 'graphicRising'
  | 'graphicSoft';

export const images: Record<ImageKey, { src: ImageMetadata; alt: string; title?: string }> = {
  // ---- Homes
  livingRoom: {
    src: livingRoom,
    alt: 'Modern living room with a white wall-mounted air conditioning unit above a cream sofa and patio doors',
    title: 'Living room air conditioning',
  },
  livingRoomBifold: {
    src: livingRoomBifold,
    alt: 'Living room with a wall-mounted air conditioning unit above a corner sofa',
    title: 'Home air conditioning — living room',
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
  openPlanLiving: {
    src: openPlanLiving,
    alt: 'Open-plan living, dining and kitchen space with two wall-mounted air conditioning units',
    title: 'Air conditioning for open-plan living spaces',
  },
  kitchenDiner: {
    src: kitchenDiner,
    alt: 'Kitchen diner with a wall-mounted air conditioning unit beside doors to the garden',
    title: 'Kitchen diner air conditioning',
  },
  thermostat: {
    src: thermostat,
    alt: 'Wall-mounted digital thermostat showing a room temperature of 21.5°C',
    title: 'Temperature control for several rooms',
  },
  outdoorFan: {
    src: outdoorFan,
    alt: 'Close-up of the fan grille on an air conditioning outdoor unit',
    title: 'Air conditioning outdoor unit',
  },
  // ---- Engineers indoors
  engineerHomeDark: {
    src: engineerHomeDark,
    alt: 'Coletrup Cooling engineer inspecting the filters of a wall-mounted air conditioning unit in a bright room',
    title: 'Home air conditioning inspection',
  },
  engineerFilterCleanDark: {
    src: engineerFilterCleanDark,
    alt: 'Coletrup Cooling engineer lifting the filter out of a wall-mounted air conditioning unit in a living room',
    title: 'Air conditioning servicing and filter cleaning',
  },
  engineerInstallDiningDark: {
    src: engineerInstallDiningDark,
    alt: 'Coletrup Cooling engineer fitting a wall-mounted air conditioning unit in a kitchen diner',
    title: 'Home air conditioning installation',
  },
  commercialRestaurantCheckDark: {
    src: commercialRestaurantCheckDark,
    alt: 'Coletrup Cooling engineer recording a ceiling cassette air conditioning check on a tablet in a restaurant',
    title: 'Planned maintenance visit',
  },
  commercialCassetteInstallDark: {
    src: commercialCassetteInstallDark,
    alt: 'Coletrup Cooling engineer securing a ceiling cassette air conditioning unit in a meeting room',
    title: 'Commercial air conditioning installation',
  },
  commercialOfficeFilter: {
    src: commercialOfficeFilter,
    alt: 'Engineer removing the filter from a ceiling cassette air conditioning unit in an office',
    title: 'Commercial air conditioning maintenance',
  },
  // ---- Engineers outdoors
  engineerOutdoorGauges: {
    src: engineerOutdoorGauges,
    alt: 'Coletrup Cooling engineer checking refrigerant pressures with gauges on an outdoor air conditioning unit',
    title: 'Air conditioning fault diagnosis',
  },
  commercialRooftopGauges: {
    src: commercialRooftopGauges,
    alt: 'Coletrup Cooling engineer testing a commercial rooftop air conditioning unit with refrigerant gauges',
    title: 'Commercial air conditioning repair',
  },
  engineerGauges: {
    src: engineerGauges,
    alt: 'Coletrup Cooling engineer in safety glasses checking system pressures with manifold gauges',
    title: 'Fault finding and diagnostics',
  },
  outdoorElectrical: {
    src: outdoorElectrical,
    alt: 'Coletrup Cooling engineer wiring the control panel of an outdoor air conditioning unit',
    title: 'Air conditioning installation — outdoor unit',
  },
  outdoorTablet: {
    src: outdoorTablet,
    alt: 'Coletrup Cooling engineer recording checks on a tablet beside a commercial air conditioning unit',
    title: 'Commercial air conditioning servicing',
  },
  engineerPortrait: {
    src: engineerPortrait,
    alt: 'Coletrup Cooling engineer standing outside a commercial unit beside the branded van',
    title: 'Coletrup Cooling',
  },
  // ---- Commercial spaces
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
  // ---- Refrigeration
  displayFridges: {
    src: displayFridges,
    alt: 'Row of illuminated glass-door display fridges stocked with chilled food',
    title: 'Refrigeration servicing and repairs',
  },
  supermarketChillers: {
    src: supermarketChillers,
    alt: 'Supermarket aisle of chilled and frozen food display cabinets',
    title: 'Display fridge servicing and repairs',
  },
  coldRoom: {
    src: coldRoom,
    alt: 'Clean cold room with stainless steel shelving and a ceiling-mounted evaporator unit',
    title: 'Cold room servicing and repairs',
  },
  coldRoomEngineer: {
    src: coldRoomEngineer,
    alt: 'Coletrup Cooling engineer repairing the evaporator unit inside a commercial cold room',
    title: 'Refrigeration repairs and maintenance',
  },
  fridgeGaugesCoat: {
    src: fridgeGaugesCoat,
    alt: 'Coletrup Cooling engineer testing a glass-door display fridge with refrigerant gauges in a shop',
    title: 'Commercial refrigeration servicing',
  },
  // ---- Brand & planning
  van: {
    src: van,
    alt: 'Coletrup Cooling branded service van parked outside a commercial unit',
    title: 'Coletrup Cooling service van',
  },
  maintenanceChecklist: {
    src: maintenanceChecklist,
    alt: 'Coletrup Cooling maintenance checklist on a clipboard beside a tablet showing a service schedule',
    title: 'Planned maintenance and service contracts',
  },
  // ---- On the job
  jobCabinetGauges: { src: jobCabinetGauges, alt: 'Manifold gauges connected to the system on top of a display cabinet during fault finding', title: 'Checking system pressures' },
  jobUnitGauges: { src: jobUnitGauges, alt: 'Manifold gauges connected to the pipework inside an air conditioning unit', title: 'System diagnostics' },
  jobShopFloorTools: { src: jobShopFloorTools, alt: 'Gas cylinder, manifold gauges, clamp meter and tool bag set out on a shop floor', title: 'On site and ready to work' },
  jobCompressorSwap: { src: jobCompressorSwap, alt: 'A new scroll compressor beside the worn compressor it is replacing, with tools laid out', title: 'Faulty component changed' },
  jobCabinetCompressor: { src: jobCabinetCompressor, alt: 'Compressor, valves and insulated pipework inside the top of a chilled cabinet', title: 'Inside the cabinet' },
  jobCompressorPack: { src: jobCompressorPack, alt: 'New compressor on the floor beside a commercial compressor pack, ready to be fitted', title: 'Compressor pack repair' },
  jobControlPanel: { src: jobControlPanel, alt: 'Open control panel with contactors, fuses and wiring, with a clamp meter and insulated tools', title: 'Electrical fault finding' },
  jobClampMeter: { src: jobClampMeter, alt: 'Clamp meter held up to a ceiling cassette air conditioning unit during testing', title: 'Testing a ceiling cassette' },
  jobOutdoorClean: { src: jobOutdoorClean, alt: 'Outdoor air conditioning unit with its fan guard removed, part-way through a deep clean', title: 'Outdoor unit deep clean' },
  jobDirtyFilters: { src: jobDirtyFilters, alt: 'Two air conditioning filters clogged with dust, removed for cleaning during a service', title: 'Filters before cleaning' },
  // ---- Decorative graphics (empty alt: purely visual)
  airflow: { src: airflow, alt: '' },
  graphicWaves: { src: graphicWaves, alt: '' },
  graphicDeepWave: { src: graphicDeepWave, alt: '' },
  graphicRising: { src: graphicRising, alt: '' },
  graphicSoft: { src: graphicSoft, alt: '' },
};

/** Decorative graphics — allowed to sit alongside photos without counting as a photo. */
export const GRAPHIC_KEYS: ImageKey[] = ['airflow', 'graphicWaves', 'graphicDeepWave', 'graphicRising', 'graphicSoft'];
