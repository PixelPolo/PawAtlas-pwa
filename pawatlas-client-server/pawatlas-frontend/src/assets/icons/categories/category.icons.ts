import L from 'leaflet';

// Icon size
const width = 35;
const height = 35;
const shadowWidth = 50;
const shadowHeight = 50;
const shadowHorizontalOffset = 10;
const shadowVerticalOffset = 30;

// Default leaflet shadow icon
const defaultShadowURL = 'assets/leaflet/marker-shadow.png';

// TODO : CREATE ICON
// Médecine alternative === c05
// Loisirs === c12
// Autre intérêt === c13
// Rage === c17
// Autre danger === c21

const iconsUrls: { [key: string]: string } = {
  c01: '/assets/icons/categories/c01.png', // SPA === c01
  c02: '/assets/icons/categories/c02.png', // Vétérinaire === c02
  c03: '/assets/icons/categories/c03.png', // Toilettage === c03
  c04: '/assets/icons/categories/c04.png', // Animalerie === c04
  c05: '/assets/icons/categories/c01.png', // Médecine alternative === c05 TODO
  c06: '/assets/icons/categories/c06.png', // Poubelle === c06
  c07: '/assets/icons/categories/c07.png', // Eau potable === c07
  c08: '/assets/icons/categories/c08.png', // Parc === c08
  c09: '/assets/icons/categories/c09.png', // Centre animalier === c09
  c10: '/assets/icons/categories/c10.png', // Service de garde === c10
  c11: '/assets/icons/categories/c11.png', // Baignade === c11
  c12: '/assets/icons/categories/c01.png', // Loisirs === c12 TODO
  c13: '/assets/icons/categories/c01.png', // Autre intérêt === c13 TODO
  c14: '/assets/icons/categories/c14.png', // Toxique === c14
  c15: '/assets/icons/categories/c15.png', // Patous === c15
  c16: '/assets/icons/categories/c16.png', // Cyanobactéries === c16
  c17: '/assets/icons/categories/c01.png', // Rage === c17 TODO
  c18: '/assets/icons/categories/c18.png', // Chasse === c18
  c19: '/assets/icons/categories/c19.png', // Bétail === c19
  c20: '/assets/icons/categories/c20.png', // Interdit === c20
  c21: '/assets/icons/categories/c01.png', // Autre danger === c21
};

const icons: { [key: string]: L.Icon } = {
  c01: L.icon({
    iconUrl: iconsUrls['c01'],
  }),
  c02: L.icon({
    iconUrl: iconsUrls['c02'],
  }),
  c03: L.icon({
    iconUrl: iconsUrls['c03'],
  }),
  c04: L.icon({
    iconUrl: iconsUrls['c04'],
  }),
  c05: L.icon({
    iconUrl: iconsUrls['c05'],
  }),
  c06: L.icon({
    iconUrl: iconsUrls['c06'],
  }),
  c07: L.icon({
    iconUrl: iconsUrls['c07'],
  }),
  c08: L.icon({
    iconUrl: iconsUrls['c08'],
  }),
  c09: L.icon({
    iconUrl: iconsUrls['c09'],
  }),
  c10: L.icon({
    iconUrl: iconsUrls['c10'],
  }),
  c11: L.icon({
    iconUrl: iconsUrls['c11'],
  }),
  c12: L.icon({
    iconUrl: iconsUrls['c12'],
  }),
  c13: L.icon({
    iconUrl: iconsUrls['c13'],
  }),
  c14: L.icon({
    iconUrl: iconsUrls['c14'],
  }),
  c15: L.icon({
    iconUrl: iconsUrls['c15'],
  }),
  c16: L.icon({
    iconUrl: iconsUrls['c16'],
  }),
  c17: L.icon({
    iconUrl: iconsUrls['c17'],
  }),
  c18: L.icon({
    iconUrl: iconsUrls['c18'],
  }),
  c19: L.icon({
    iconUrl: iconsUrls['c19'],
  }),
  c20: L.icon({
    iconUrl: iconsUrls['c20'],
  }),
  c21: L.icon({
    iconUrl: iconsUrls['c21'],
  }),
};

Object.values(icons).forEach((icon: L.Icon) => {
  icon.options.iconSize = [width, height];
  icon.options.shadowUrl = defaultShadowURL;
  icon.options.shadowAnchor = [shadowHorizontalOffset, shadowVerticalOffset];
  icon.options.shadowSize = [shadowWidth, shadowHeight];
});

// Function to get the Leaflet icon for a given category
export function getIcon(category: string): L.Icon {
  return icons[category];
}

// Function to get the SVG icon URL for a given category
export function getSvgUrl(category: string): string {
  return iconsUrls[category];
}
