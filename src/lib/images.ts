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
// ---- Homes (no people). The five room photos are stock photos of real homes — sources and licence in tools/photo-credits.md
import livingRoom from '../assets/images/living-room-with-wall-mounted-air-conditioning-unit.jpg';
import livingRoomBifold from '../assets/images/living-room-bifold-doors-air-conditioning.jpg';
import bedroom from '../assets/images/bedroom-with-wall-mounted-air-conditioning-unit.jpg';
import homeOffice from '../assets/images/home-office-with-wall-mounted-air-conditioning-unit.jpg';
import gardenRoom from '../assets/images/garden-room-with-timber-ceiling-and-air-conditioning-unit.jpg';
import openPlanLiving from '../assets/images/living-room-corner-sofa-wall-mounted-air-conditioning.jpg';
import kitchenDiner from '../assets/images/open-plan-kitchen-dining-living-space-with-air-conditioning-unit.jpg';
import thermostat from '../assets/images/air-conditioning-wall-controller-temperature-display.jpg';
import outdoorFan from '../assets/images/air-conditioning-outdoor-unit-fan.jpg';
import stairsUnit from '../assets/images/wall-mounted-air-conditioning-above-staircase.jpg';
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
import outdoorTablet from '../assets/images/commercial-rooftop-air-conditioning-outdoor-units.jpg';
import engineerPortrait from '../assets/images/coletrup-cooling-engineer-outside-premises.jpg';
// ---- Commercial spaces (no people)
import officeBoardroom from '../assets/images/office-meeting-room-ceiling-cassette-air-conditioning.jpg';
import restaurantCassette from '../assets/images/restaurant-ceiling-cassette-air-conditioning.jpg';
// ---- Refrigeration (coat)
import displayFridges from '../assets/images/commercial-display-fridges.jpg';
import supermarketChillers from '../assets/images/supermarket-chilled-and-frozen-food-display-cabinets.jpg';
import coldRoom from '../assets/images/cold-room-refrigeration.jpg';
import coldRoomEngineer from '../assets/images/refrigeration-engineer-repairing-cold-room-evaporator.jpg';
import fridgeGaugesCoat from '../assets/images/refrigeration-gauges-connected-commercial-cabinet.jpg';
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
// ---- Homes: real installs (gallery photos supplied 5 Oct)
import galRoofLightBlack from '../assets/images/black-wall-mounted-air-conditioning-unit-roof-light.jpg';
import galOutdoorWindow from '../assets/images/outdoor-air-conditioning-unit-below-window.jpg';
import galSlattedWall from '../assets/images/wall-mounted-air-conditioning-unit-slatted-wall-panel.jpg';
import galTrunking from '../assets/images/wall-mounted-air-conditioning-unit-white-pipe-trunking.jpg';
import galOutdoorBrick from '../assets/images/outdoor-air-conditioning-unit-side-of-brick-house.jpg';
import galWhiteUnit from '../assets/images/white-wall-mounted-air-conditioning-unit-beside-picture.jpg';
import galOutdoorGable from '../assets/images/outdoor-air-conditioning-unit-gable-wall-pipe-covers.jpg';
import galBlackCupboards from '../assets/images/black-wall-mounted-air-conditioning-unit-above-cupboards.jpg';
import galUpstairsRoom from '../assets/images/wall-mounted-air-conditioning-unit-upstairs-room.jpg';
import galOutdoorBetween from '../assets/images/outdoor-air-conditioning-unit-wall-brackets-between-houses.jpg';
import repairOutdoorOpen from '../assets/images/outdoor-air-conditioning-unit-opened-for-repair-clamp-meter.jpg';
// ---- Servicing: before and after (supplied 5 Oct)
import baOutdoorBefore from '../assets/images/outdoor-air-conditioning-unit-before-cleaning.jpg';
import baOutdoorAfter from '../assets/images/outdoor-air-conditioning-unit-after-cleaning.jpg';
import baTwinFanBefore from '../assets/images/twin-fan-outdoor-air-conditioning-unit-before-cleaning.jpg';
import baTwinFanAfter from '../assets/images/twin-fan-outdoor-air-conditioning-unit-after-cleaning.jpg';
import baFilterBefore from '../assets/images/air-conditioning-filter-before-cleaning.jpg';
import baFilterAfter from '../assets/images/air-conditioning-filter-after-cleaning.jpg';
import baTempCheck from '../assets/images/infrared-thermometer-temperature-check-ceiling-cassette.jpg';
import jobCassetteDeepClean from '../assets/images/ceiling-cassette-air-conditioning-deep-clean-in-progress.jpg';
// ---- Commercial: real installs (gallery photos supplied 5 Oct)
import galOfficeWallUnit from '../assets/images/office-wall-mounted-air-conditioning-unit-suspended-ceiling.jpg';
import galOfficeCassette from '../assets/images/office-ceiling-cassette-air-conditioning-unit.jpg';
import galOfficeDesk from '../assets/images/office-wall-mounted-air-conditioning-unit-above-desk.jpg';
// ---- Chiller & freezer repairs: on the job (supplied 5 Oct; story captions cropped off)
import jobFreezerPanel from '../assets/images/refrigeration-control-panel-fault-finding-with-test-tools.jpg';
import jobFreezerPack from '../assets/images/new-scroll-compressor-beside-refrigeration-compressor-pack.jpg';
import jobFreezerCabinet from '../assets/images/freezer-cabinet-compressor-repair-with-tools.jpg';
import jobFreezerSwap from '../assets/images/old-and-new-refrigeration-compressors-side-by-side.jpg';
import jobFreezerFanGuard from '../assets/images/refrigeration-fan-guard-clogged-with-dust.jpg';
import cellarCooler from '../assets/images/cellar-cooling-unit-above-beer-kegs-in-pub-cellar.jpg';
import maintenanceContract from '../assets/images/planned-maintenance-service-contract-clipboard-and-engineer.jpg';
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
  | 'stairsUnit'
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
  | 'galRoofLightBlack'
  | 'galOutdoorWindow'
  | 'galSlattedWall'
  | 'galTrunking'
  | 'galOutdoorBrick'
  | 'galWhiteUnit'
  | 'galOutdoorGable'
  | 'galBlackCupboards'
  | 'galUpstairsRoom'
  | 'galOutdoorBetween'
  | 'repairOutdoorOpen'
  | 'baOutdoorBefore'
  | 'baOutdoorAfter'
  | 'baTwinFanBefore'
  | 'baTwinFanAfter'
  | 'baFilterBefore'
  | 'baFilterAfter'
  | 'baTempCheck'
  | 'jobCassetteDeepClean'
  | 'galOfficeWallUnit'
  | 'galOfficeCassette'
  | 'galOfficeDesk'
  | 'jobFreezerPanel'
  | 'jobFreezerPack'
  | 'jobFreezerCabinet'
  | 'jobFreezerSwap'
  | 'jobFreezerFanGuard'
  | 'cellarCooler'
  | 'maintenanceContract'
  | 'airflow'
  | 'graphicWaves'
  | 'graphicDeepWave'
  | 'graphicRising'
  | 'graphicSoft';

export const images: Record<ImageKey, { src: ImageMetadata; alt: string; title?: string }> = {
  // ---- Homes
  livingRoom: {
    src: livingRoom,
    alt: 'Living room with a corner sofa and a wall-mounted air conditioning unit beside the window',
    title: 'Living room air conditioning',
  },
  livingRoomBifold: {
    src: livingRoomBifold,
    alt: 'Living room with bifold doors to the garden and a wall-mounted air conditioning unit above the sofa',
    title: 'Home air conditioning — living room with bifold doors',
  },
  bedroom: {
    src: bedroom,
    alt: 'Bedroom with a wall-mounted air conditioning unit high on the wall beside the curtains',
    title: 'Bedroom air conditioning',
  },
  homeOffice: {
    src: homeOffice,
    alt: 'Home office with a desk chair, framed prints and a wall-mounted air conditioning unit above',
    title: 'Home office air conditioning',
  },
  gardenRoom: {
    src: gardenRoom,
    alt: 'Timber-lined garden room with a sofa, glazed doors and a wall-mounted air conditioning unit',
    title: 'Air conditioning for garden rooms and extensions',
  },
  openPlanLiving: {
    src: openPlanLiving,
    alt: 'Living room with a wall-mounted air conditioning unit above a corner sofa',
    title: 'Home air conditioning — living room',
  },
  kitchenDiner: {
    src: kitchenDiner,
    alt: 'Open-plan kitchen, dining and living space with a wall-mounted air conditioning unit above the kitchen',
    title: 'Open-plan air conditioning',
  },
  thermostat: {
    src: thermostat,
    alt: 'Wall-mounted air conditioning controller showing cool mode, room temperature 23°C and a set temperature of 22°C',
    title: 'Temperature control for several rooms',
  },
  stairsUnit: {
    src: stairsUnit,
    alt: 'Wall-mounted air conditioning unit on the wall above a timber staircase with a glass balustrade',
    title: 'Home air conditioning installation',
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
    alt: 'Row of commercial air conditioning outdoor units on a rooftop',
    title: 'Commercial air conditioning outdoor units',
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
    alt: 'Refrigeration gauges connected to the pipework of a commercial refrigeration cabinet',
    title: 'Commercial refrigeration fault finding and repair',
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
  // ---- Gallery: real installs
  galRoofLightBlack: {
    src: galRoofLightBlack,
    alt: 'Black wall-mounted air conditioning unit in a room with a roof light',
    title: 'Black wall-mounted unit',
  },
  galOutdoorWindow: {
    src: galOutdoorWindow,
    alt: 'Outdoor air conditioning unit on wall brackets below a window on a brick house',
    title: 'Outdoor unit below a window',
  },
  galSlattedWall: {
    src: galSlattedWall,
    alt: 'Wall-mounted air conditioning unit on a slatted panel wall above a wooden sideboard',
    title: 'Wall-mounted unit on a panelled wall',
  },
  galTrunking: {
    src: galTrunking,
    alt: 'Close-up of a white wall-mounted air conditioning unit with white pipe trunking',
    title: 'Wall-mounted unit with pipe trunking',
  },
  galOutdoorBrick: {
    src: galOutdoorBrick,
    alt: 'Outdoor air conditioning unit on wall brackets at the side of a brick house',
    title: 'Outdoor unit at the side of a house',
  },
  galWhiteUnit: {
    src: galWhiteUnit,
    alt: 'White wall-mounted air conditioning unit on a painted wall beside a framed picture',
    title: 'White wall-mounted unit',
  },
  galOutdoorGable: {
    src: galOutdoorGable,
    alt: 'Outdoor air conditioning unit on wall brackets on the gable wall of a house, with black pipe covers',
    title: 'Outdoor unit on a gable wall',
  },
  galBlackCupboards: {
    src: galBlackCupboards,
    alt: 'Black wall-mounted air conditioning unit fitted above built-in cupboards',
    title: 'Black wall-mounted unit above cupboards',
  },
  galUpstairsRoom: {
    src: galUpstairsRoom,
    alt: 'White wall-mounted air conditioning unit fitted high on the wall of an upstairs room',
    title: 'Wall-mounted unit in an upstairs room',
  },
  galOutdoorBetween: {
    src: galOutdoorBetween,
    alt: 'Outdoor air conditioning unit mounted on wall brackets on the side of a house',
    title: 'Outdoor unit on wall brackets',
  },
  repairOutdoorOpen: {
    src: repairOutdoorOpen,
    alt: 'Outdoor air conditioning unit with its casing removed for repair, with a clamp meter and hand tools on the unit',
    title: 'Air conditioning repair and fault finding',
  },
  // ---- Servicing: before and after
  baOutdoorBefore: {
    src: baOutdoorBefore,
    alt: 'Wall-mounted outdoor air conditioning unit marked with dirt and grime before cleaning',
    title: 'Outdoor unit before cleaning',
  },
  baOutdoorAfter: {
    src: baOutdoorAfter,
    alt: 'The same wall-mounted outdoor air conditioning unit after cleaning',
    title: 'Outdoor unit after cleaning',
  },
  baTwinFanBefore: {
    src: baTwinFanBefore,
    alt: 'Twin-fan outdoor air conditioning unit with dirt and green staining before cleaning',
    title: 'Twin-fan outdoor unit before cleaning',
  },
  baTwinFanAfter: {
    src: baTwinFanAfter,
    alt: 'Twin-fan outdoor air conditioning unit after cleaning',
    title: 'Twin-fan outdoor unit after cleaning',
  },
  baFilterBefore: {
    src: baFilterBefore,
    alt: 'Air conditioning filter clogged with dust before cleaning',
    title: 'Filter before cleaning',
  },
  baFilterAfter: {
    src: baFilterAfter,
    alt: 'Air conditioning filter after cleaning',
    title: 'Filter after cleaning',
  },
  baTempCheck: {
    src: baTempCheck,
    alt: 'Infrared thermometer held up to a ceiling cassette air conditioning unit, showing a temperature reading',
    title: 'Temperature check at a ceiling cassette',
  },
  jobCassetteDeepClean: {
    src: jobCassetteDeepClean,
    alt: 'Ceiling cassette air conditioning unit being deep cleaned, with a cleaning cover fitted and draining into a bucket',
    title: 'Ceiling cassette deep clean',
  },
  // ---- Commercial gallery: real installs
  galOfficeWallUnit: {
    src: galOfficeWallUnit,
    alt: 'Wall-mounted air conditioning unit fitted below a suspended ceiling in an office',
    title: 'Office wall-mounted unit',
  },
  galOfficeCassette: {
    src: galOfficeCassette,
    alt: 'Ceiling cassette air conditioning unit set into a suspended office ceiling',
    title: 'Office ceiling cassette',
  },
  galOfficeDesk: {
    src: galOfficeDesk,
    alt: 'Wall-mounted air conditioning unit on an office wall above a desk and chair',
    title: 'Office wall-mounted unit above a desk',
  },
  // ---- Chiller & freezer repairs: on the job
  jobFreezerPanel: {
    src: jobFreezerPanel,
    alt: 'Refrigeration control panel with contactors and wiring, with a clamp meter and hand tools below',
    title: 'Control panel fault finding',
  },
  jobFreezerPack: {
    src: jobFreezerPack,
    alt: 'New scroll compressor on the floor beside a refrigeration compressor pack, with tools ready',
    title: 'Compressor pack repair',
  },
  jobFreezerCabinet: {
    src: jobFreezerCabinet,
    alt: 'Compressor and pipework inside a commercial freezer cabinet during a compressor repair, with a drill and socket set',
    title: 'Freezer compressor repair',
  },
  jobFreezerSwap: {
    src: jobFreezerSwap,
    alt: 'New and old scroll compressors side by side on the floor during a repair',
    title: 'Faulty compressor changed',
  },
  jobFreezerFanGuard: {
    src: jobFreezerFanGuard,
    alt: 'Fan guard on a refrigerated cabinet clogged with dust',
    title: 'Fan guard clogged with dust',
  },
  cellarCooler: {
    src: cellarCooler,
    alt: 'Cellar cooling unit mounted on the wall of a pub cellar above beer kegs',
    title: 'Cellar cooling repairs and maintenance',
  },
  maintenanceContract: {
    src: maintenanceContract,
    alt: 'Coletrup Cooling planned maintenance service contract on a clipboard beside a service visit calendar, with an engineer checking a cold room controller in the background',
    title: 'Planned maintenance and service contracts',
  },
  airflow: { src: airflow, alt: '' },
  graphicWaves: { src: graphicWaves, alt: '' },
  graphicDeepWave: { src: graphicDeepWave, alt: '' },
  graphicRising: { src: graphicRising, alt: '' },
  graphicSoft: { src: graphicSoft, alt: '' },
};

/** Decorative graphics — allowed to sit alongside photos without counting as a photo. */
export const GRAPHIC_KEYS: ImageKey[] = ['airflow', 'graphicWaves', 'graphicDeepWave', 'graphicRising', 'graphicSoft'];
