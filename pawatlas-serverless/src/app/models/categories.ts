/*
This file contains the categories for the different types of markers
It is used in the map component to filter the categories
It also provide icons for the different categories
*/

import L from 'leaflet';

export const interestCategories = [
  { value: 'SPA', label: 'SPA' },
  { value: 'Veterinaire', label: 'Vétérinaire' },
  { value: 'Toilettage', label: 'Toilettage' },
  { value: 'Animalerie', label: 'Animalerie' },
  { value: 'Medecine', label: 'Médecine alternative' },
  { value: 'Poubelle', label: 'Poubelle avec sacs' },
  { value: 'Eau', label: "Point d'eau" },
  { value: 'Parc', label: 'Parc' },
  { value: 'Centre', label: 'Centre animalier' },
  { value: 'Garde', label: "Garde d'animaux" },
  { value: 'Baignade', label: 'Zone de baignade' },
  { value: 'Loisirs', label: 'Centre de loisirs' },
  { value: 'Autre intérêt', label: 'Autre intérêt' },
];

export const dangerCategories = [
  { value: 'Toxique', label: 'Toxique' },
  { value: 'Patous', label: 'Présence de patous' },
  { value: 'Cyanobactéries', label: 'Présence de cyanobactéries' },
  { value: 'Rage', label: 'Présence de rage' },
  { value: 'Chasse', label: 'Zone de chasse' },
  { value: 'Bétail', label: 'Présence de bétails' },
  { value: 'Interdit', label: 'Zone interdite aux animaux' },
  { value: 'Autre danger', label: 'Autre danger' },
];

// Icon size
const width = 35;
const height = 35;
const shadowWidth = 50;
const shadowHeight = 50;
const shadowHorizontalOffset = 10;
const shadowVerticalOffset = 30;

// SVG icon for SPA
const svgSpa =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#08462a" d="M269.4 6C280.5-2 295.5-2 306.6 6l224 160c7.4 5.3 12.2 13.5 13.2 22.5l32 288c1 9-1.9 18.1-8 24.9s-14.7 10.7-23.8 10.7H464 435.8c-12.1 0-23.2-6.8-28.6-17.7L306.7 293.5c-1.7-3.4-5.1-5.5-8.8-5.5c-5.5 0-9.9 4.4-9.9 9.9V480c0 17.7-14.3 32-32 32H240 32c-9.1 0-17.8-3.9-23.8-10.7s-9-15.8-8-24.9l32-288c1-9 5.8-17.2 13.2-22.5L269.4 6z"/></svg>';
const spaSVGUrl = 'data:image/svg+xml;base64,' + btoa(svgSpa);
const spaURL = 'assets/icons/spa.png';
export const spaIcon = L.icon({
  // iconUrl: spaSVGUrl,
  iconUrl: spaURL,
  iconSize: [width, height],
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  shadowAnchor: [shadowHorizontalOffset, shadowVerticalOffset],
  shadowSize: [shadowWidth, shadowHeight],
});

// SVG icon for Veterinaire
const veterinaireSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#08462a" d="M142.4 21.9c5.6 16.8-3.5 34.9-20.2 40.5L96 71.1V192c0 53 43 96 96 96s96-43 96-96V71.1l-26.1-8.7c-16.8-5.6-25.8-23.7-20.2-40.5s23.7-25.8 40.5-20.2l26.1 8.7C334.4 19.1 352 43.5 352 71.1V192c0 77.2-54.6 141.6-127.3 156.7C231 404.6 278.4 448 336 448c61.9 0 112-50.1 112-112V265.3c-28.3-12.3-48-40.5-48-73.3c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V336c0 97.2-78.8 176-176 176c-92.9 0-168.9-71.9-175.5-163.1C87.2 334.2 32 269.6 32 192V71.1c0-27.5 17.6-52 43.8-60.7l26.1-8.7c16.8-5.6 34.9 3.5 40.5 20.2zM480 224a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>';
const veterinaireSVGUrl = 'data:image/svg+xml;base64,' + btoa(veterinaireSVG);
const veterinaireURL = 'assets/icons/veterinaire.png';
export const veterinaireIcon = L.icon({
  // iconUrl: veterinaireSVGUrl,
  iconUrl: veterinaireURL,
  iconSize: [width, height],
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  shadowAnchor: [shadowHorizontalOffset, shadowVerticalOffset],
  shadowSize: [shadowWidth, shadowHeight],
});

// SVG icon for Toilettage
const toilettageSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#08462a" d="M256 192l-39.5-39.5c4.9-12.6 7.5-26.2 7.5-40.5C224 50.1 173.9 0 112 0S0 50.1 0 112s50.1 112 112 112c14.3 0 27.9-2.7 40.5-7.5L192 256l-39.5 39.5c-12.6-4.9-26.2-7.5-40.5-7.5C50.1 288 0 338.1 0 400s50.1 112 112 112s112-50.1 112-112c0-14.3-2.7-27.9-7.5-40.5L499.2 76.8c7.1-7.1 7.1-18.5 0-25.6c-28.3-28.3-74.1-28.3-102.4 0L256 192zm22.6 150.6L396.8 460.8c28.3 28.3 74.1 28.3 102.4 0c7.1-7.1 7.1-18.5 0-25.6L342.6 278.6l-64 64zM64 112a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm48 240a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>';
const toilettageSVGUrl = 'data:image/svg+xml;base64,' + btoa(toilettageSVG);
const toilettageURL = 'assets/icons/toilettage.png';
export const toilettageIcon = L.icon({
  // iconUrl: toilettageSVGUrl,
  iconUrl: toilettageURL,
  iconSize: [width, height],
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  shadowAnchor: [shadowHorizontalOffset, shadowVerticalOffset],
  shadowSize: [shadowWidth, shadowHeight],
});

// SVG icon for Animalerie
const animalerieSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#08462a" d="M547.6 103.8L490.3 13.1C485.2 5 476.1 0 466.4 0H109.6C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM499.7 254.9l-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3V384H128V250.6c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3V384v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V384 252.6c-4 1-8 1.8-12.3 2.3z"/></svg>';
const animalerieSVGUrl = 'data:image/svg+xml;base64,' + btoa(animalerieSVG);
const animalerieURL = 'assets/icons/animalerie.png';
export const animalerieIcon = L.icon({
  // iconUrl: animalerieSVGUrl,
  iconUrl: animalerieURL,
  iconSize: [width, height],
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  shadowAnchor: [shadowHorizontalOffset, shadowVerticalOffset],
  shadowSize: [shadowWidth, shadowHeight],
});

// SVG icon for Medecine
const medecineSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#08462a" d="M192 48c0-26.5 21.5-48 48-48H400c26.5 0 48 21.5 48 48V512H368V432c0-26.5-21.5-48-48-48s-48 21.5-48 48v80H192V48zM48 96H160V512H48c-26.5 0-48-21.5-48-48V320H80c8.8 0 16-7.2 16-16s-7.2-16-16-16H0V224H80c8.8 0 16-7.2 16-16s-7.2-16-16-16H0V144c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v48H560c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v64H560c-8.8 0-16 7.2-16 16s7.2 16 16 16h80V464c0 26.5-21.5 48-48 48H480V96H592zM312 64c-8.8 0-16 7.2-16 16v24H272c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h24v24c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16V152h24c8.8 0 16-7.2 16-16V120c0-8.8-7.2-16-16-16H344V80c0-8.8-7.2-16-16-16H312z"/></svg>';
const medecineSVGUrl = 'data:image/svg+xml;base64,' + btoa(medecineSVG);
// TODO : CREATE ICON
// const medecineURL = 'assets/icons/medecine.png';
export const medecineIcon = L.icon({
  iconUrl: medecineSVGUrl,
  iconSize: [width, height],
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  shadowAnchor: [shadowHorizontalOffset, shadowVerticalOffset],
  shadowSize: [shadowWidth, shadowHeight],
});

// SVG icon for Poubelle
const poubelleSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#08462a" d="M254.4 6.6c3.5-4.3 9-6.5 14.5-5.7C315.8 7.2 352 47.4 352 96c0 11.2-1.9 22-5.5 32H352c35.3 0 64 28.7 64 64c0 19.1-8.4 36.3-21.7 48H408c39.8 0 72 32.2 72 72c0 23.2-11 43.8-28 57c34.1 5.7 60 35.3 60 71c0 39.8-32.2 72-72 72H72c-39.8 0-72-32.2-72-72c0-35.7 25.9-65.3 60-71c-17-13.2-28-33.8-28-57c0-39.8 32.2-72 72-72h13.7C104.4 228.3 96 211.1 96 192c0-35.3 28.7-64 64-64h16.2c44.1-.1 79.8-35.9 79.8-80c0-9.2-1.5-17.9-4.3-26.1c-1.8-5.2-.8-11.1 2.8-15.4z"/></svg>';
const poubelleSVGUrl = 'data:image/svg+xml;base64,' + btoa(poubelleSVG);
const poubelleURL = 'assets/icons/poubelle.png';
export const poubelleIcon = L.icon({
  // iconUrl: poubelleSVGUrl,
  iconUrl: poubelleURL,
  iconSize: [width, height],
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  shadowAnchor: [shadowHorizontalOffset, shadowVerticalOffset],
  shadowSize: [shadowWidth, shadowHeight],
});

// SVG icon for Eau
const eauSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#08462a" d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/></svg>';
const eauSVGUrl = 'data:image/svg+xml;base64,' + btoa(eauSVG);
const eauURL = 'assets/icons/eau.png';
export const eauIcon = L.icon({
  // iconUrl: eauSVGUrl,
  iconUrl: eauURL,
  iconSize: [width, height],
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  shadowAnchor: [shadowHorizontalOffset, shadowVerticalOffset],
  shadowSize: [shadowWidth, shadowHeight],
});

// SVG icon for Park
const parkSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#08462a" d="M210.6 5.9L62 169.4c-3.9 4.2-6 9.8-6 15.5C56 197.7 66.3 208 79.1 208H104L30.6 281.4c-4.2 4.2-6.6 10-6.6 16C24 309.9 34.1 320 46.6 320H80L5.4 409.5C1.9 413.7 0 419 0 424.5c0 13 10.5 23.5 23.5 23.5H192v32c0 17.7 14.3 32 32 32s32-14.3 32-32V448H424.5c13 0 23.5-10.5 23.5-23.5c0-5.5-1.9-10.8-5.4-15L368 320h33.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L344 208h24.9c12.7 0 23.1-10.3 23.1-23.1c0-5.7-2.1-11.3-6-15.5L237.4 5.9C234 2.1 229.1 0 224 0s-10 2.1-13.4 5.9z"/></svg>';
const parkSVGUrl = 'data:image/svg+xml;base64,' + btoa(parkSVG);
const parkURL = 'assets/icons/park.png';
export const parkIcon = L.icon({
  // iconUrl: parkSVGUrl,
  iconUrl: parkURL,
  iconSize: [width, height],
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  shadowAnchor: [shadowHorizontalOffset, shadowVerticalOffset],
  shadowSize: [shadowWidth, shadowHeight],
});

// SVG icon for Centre
const centreSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#08462a" d="M320 32c0-9.9-4.5-19.2-12.3-25.2S289.8-1.4 280.2 1l-179.9 45C79 51.3 64 70.5 64 92.5V448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H96 288h32V480 32zM256 256c0 17.7-10.7 32-24 32s-24-14.3-24-32s10.7-32 24-32s24 14.3 24 32zm96-128h96V480c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H512V128c0-35.3-28.7-64-64-64H352v64z"/></svg>';
const centreSVGUrl = 'data:image/svg+xml;base64,' + btoa(centreSVG);
const centreURL = 'assets/icons/centre.png';
export const centreIcon = L.icon({
  // iconUrl: centreSVGUrl,
  iconUrl: centreURL,
  iconSize: [width, height],
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  shadowAnchor: [shadowHorizontalOffset, shadowVerticalOffset],
  shadowSize: [shadowWidth, shadowHeight],
});

// SVG icon for Garde
const gardeSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#08462a" d="M480 0c-17.7 0-32 14.3-32 32V192 512h64V192H624c8.8 0 16-7.2 16-16V48c0-8.8-7.2-16-16-16H512c0-17.7-14.3-32-32-32zM416 159L276.8 39.7c-12-10.3-29.7-10.3-41.7 0l-224 192C1 240.4-2.7 254.5 2 267.1S18.6 288 32 288H64V480c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V384c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v96c0 17.7 14.3 32 32 32h64.7l.2 0h-1V159z"/></svg>';
const gardeSVGUrl = 'data:image/svg+xml;base64,' + btoa(gardeSVG);
const gardeURL = 'assets/icons/garde.png';
export const gardeIcon = L.icon({
  // iconUrl: gardeSVGUrl,
  iconUrl: gardeURL,
  iconSize: [width, height],
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  shadowAnchor: [shadowHorizontalOffset, shadowVerticalOffset],
  shadowSize: [shadowWidth, shadowHeight],
});

// SVG icon for Baignade
const baignadeSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#08462a" d="M128 127.7C128 74.9 170.9 32 223.7 32c48.3 0 89 36 95 83.9l1 8.2c2.2 17.5-10.2 33.5-27.8 35.7s-33.5-10.2-35.7-27.8l-1-8.2c-2-15.9-15.5-27.8-31.5-27.8c-17.5 0-31.7 14.2-31.7 31.7V224H384V127.7C384 74.9 426.9 32 479.7 32c48.3 0 89 36 95 83.9l1 8.2c2.2 17.5-10.2 33.5-27.8 35.7s-33.5-10.2-35.7-27.8l-1-8.2c-2-15.9-15.5-27.8-31.5-27.8c-17.5 0-31.7 14.2-31.7 31.7V361c-1.6 1-3.3 2-4.8 3.1c-18 12.4-40.1 20.3-59.2 20.3h0V288H192v96.5c-19 0-41.2-7.9-59.1-20.3c-1.6-1.1-3.2-2.2-4.9-3.1V127.7zM306.5 389.9C329 405.4 356.5 416 384 416c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 469.7 417 480 384 480c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7l0 0C136.7 405.2 165.1 416 192 416c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0z"/></svg>';
const baignadeSVGUrl = 'data:image/svg+xml;base64,' + btoa(baignadeSVG);
const baignadeURL = 'assets/icons/baignade.png';
export const baignadeIcon = L.icon({
  // iconUrl: baignadeSVGUrl,
  iconUrl: baignadeURL,
  iconSize: [width, height],
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  shadowAnchor: [shadowHorizontalOffset, shadowVerticalOffset],
  shadowSize: [shadowWidth, shadowHeight],
});

// SVG icon for Loisirs
const loisirsSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#08462a" d="M155.6 17.3C163 3 179.9-3.6 195 1.9L320 47.5l125-45.6c15.1-5.5 32 1.1 39.4 15.4l78.8 152.9c28.8 55.8 10.3 122.3-38.5 156.6L556.1 413l41-15c16.6-6 35 2.5 41 19.1s-2.5 35-19.1 41l-71.1 25.9L476.8 510c-16.6 6.1-35-2.5-41-19.1s2.5-35 19.1-41l41-15-31.3-86.2c-59.4 5.2-116.2-34-130-95.2L320 188.8l-14.6 64.7c-13.8 61.3-70.6 100.4-130 95.2l-31.3 86.2 41 15c16.6 6 25.2 24.4 19.1 41s-24.4 25.2-41 19.1L92.2 484.1 21.1 458.2c-16.6-6.1-25.2-24.4-19.1-41s24.4-25.2 41-19.1l41 15 31.3-86.2C66.5 292.5 48.1 226 76.9 170.2L155.6 17.3zm44 54.4l-27.2 52.8L261.6 157l13.1-57.9L199.6 71.7zm240.9 0L365.4 99.1 378.5 157l89.2-32.5L440.5 71.7z"/></svg>';
const loisirsSVGUrl = 'data:image/svg+xml;base64,' + btoa(loisirsSVG);
// TODO : CREATE ICON
// const loisirsURL = 'assets/icons/loisirs.png';
export const loisirsIcon = L.icon({
  iconUrl: loisirsSVGUrl,
  iconSize: [width, height],
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  shadowAnchor: [shadowHorizontalOffset, shadowVerticalOffset],
  shadowSize: [shadowWidth, shadowHeight],
});

// SVG icon for AutreInteret
const autreInteretSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#08462a" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>';
const autreInteretSVGUrl = 'data:image/svg+xml;base64,' + btoa(autreInteretSVG);
// TODO : CREATE ICON
// const autreInteretURL = 'assets/icons/autreInteret.png';
export const autreInteretIcon = L.icon({
  iconUrl: autreInteretSVGUrl,
  iconSize: [width, height],
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  shadowAnchor: [shadowHorizontalOffset, shadowVerticalOffset],
  shadowSize: [shadowWidth, shadowHeight],
});

// SVG icon for Toxique
const toxiqueSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ff0000" d="M368 128c0 44.4-25.4 83.5-64 106.4V256c0 17.7-14.3 32-32 32H176c-17.7 0-32-14.3-32-32V234.4c-38.6-23-64-62.1-64-106.4C80 57.3 144.5 0 224 0s144 57.3 144 128zM168 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm144-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM3.4 273.7c7.9-15.8 27.1-22.2 42.9-14.3L224 348.2l177.7-88.8c15.8-7.9 35-1.5 42.9 14.3s1.5 35-14.3 42.9L295.6 384l134.8 67.4c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3L224 419.8 46.3 508.6c-15.8 7.9-35 1.5-42.9-14.3s-1.5-35 14.3-42.9L152.4 384 17.7 316.6C1.9 308.7-4.5 289.5 3.4 273.7z"/></svg>';
const toxiqueSVGUrl = 'data:image/svg+xml;base64,' + btoa(toxiqueSVG);
const toxiqueURL = 'assets/icons/toxique.png';
export const toxiqueIcon = L.icon({
  // iconUrl: toxiqueSVGUrl,
  iconUrl: toxiqueURL,
  iconSize: [width, height],
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  shadowAnchor: [shadowHorizontalOffset, shadowVerticalOffset],
  shadowSize: [shadowWidth, shadowHeight],
});

// SVG icon for Patous
const patousSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ff0000" d="M407 47c9.4-9.4 24.6-9.4 33.9 0l17.2 17.2c1.9-.1 3.9-.2 5.8-.2h32c11.2 0 21.9 2.3 31.6 6.5L543 55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L564 101.9c7.6 12.2 12 26.7 12 42.1c0 10.2 7.4 18.8 16.7 23c27.9 12.5 47.3 40.5 47.3 73c0 26.2-12.6 49.4-32 64v32c0 8.8-7.2 16-16 16H560c-8.8 0-16-7.2-16-16V320H480v16c0 8.8-7.2 16-16 16H432c-8.8 0-16-7.2-16-16V318.4c-11.8-2.4-22.7-7.4-32-14.4c-1.5-1.1-2.9-2.3-4.3-3.5c-17-14.7-27.7-36.4-27.7-60.5c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 44.7 26.2 83.2 64 101.2V352c0 17.7 14.3 32 32 32h32v64c0 17.7-14.3 32-32 32H352c-17.7 0-32-14.3-32-32V372c-19.8 7.7-41.4 12-64 12s-44.2-4.3-64-12v76c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V329.1L45.9 369.7c-5.4 12.1-19.6 17.6-31.7 12.2S-3.3 362.4 2.1 350.3L24 300.9c5.3-11.9 8-24.7 8-37.7C32 155.7 117.2 68 223.8 64.1l.2-.1h7.2H256h32c41.7 0 83.4 12.1 117.2 25.7c1.7-1.8 3.5-3.6 5.3-5.2L407 81c-9.4-9.4-9.4-24.6 0-33.9zm73 185a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm88 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48zM480 144a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm48 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/></svg>';
const patousSVGUrl = 'data:image/svg+xml;base64,' + btoa(patousSVG);
const patousURL = 'assets/icons/patous.png';
export const patousIcon = L.icon({
  // iconUrl: patousSVGUrl,
  iconUrl: patousURL,
  iconSize: [width, height],
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  shadowAnchor: [shadowHorizontalOffset, shadowVerticalOffset],
  shadowSize: [shadowWidth, shadowHeight],
});

// SVG icon for Cyanobactéries
const cyanobacteriesSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ff0000" d="M423.1 30.6c3.6-12.7-3.7-26-16.5-29.7s-26 3.7-29.7 16.5l-4.2 14.7c-9.8-.4-19.9 .5-29.9 2.8c-12.1 2.8-23.7 5.9-34.9 9.4l-5.9-13.7c-5.2-12.2-19.3-17.8-31.5-12.6s-17.8 19.3-12.6 31.5l4.9 11.3c-22 9.4-42 20.1-60.2 31.8L196 82.7c-7.4-11-22.3-14-33.3-6.7s-14 22.3-6.7 33.3l7.8 11.6c-18 15-33.7 30.8-47.3 47.1L103 157.3c-10.4-8.3-25.5-6.6-33.7 3.7s-6.6 25.5 3.7 33.7l15 12c-2.1 3.2-4.1 6.5-6 9.7c-9.4 15.7-17 31-23.2 45.3l-9.9-3.9c-12.3-4.9-26.3 1.1-31.2 13.4s1.1 26.3 13.4 31.2l11.6 4.6c-.3 1.1-.6 2.1-.9 3.1c-3.5 12.5-5.7 23.2-7.1 31.3c-.7 4.1-1.2 7.5-1.6 10.3c-.2 1.4-.3 2.6-.4 3.6l-.1 1.4-.1 .6 0 .3 0 .1c0 0 0 .1 39.2 3.7l0 0-39.2-3.6c-.5 5-.6 10-.4 14.9l-14.7 4.2C4.7 380.6-2.7 393.8 .9 406.6s16.9 20.1 29.7 16.5l13.8-3.9c10.6 20.7 27.6 37.8 48.5 48.5l-3.9 13.7c-3.6 12.7 3.7 26 16.5 29.7s26-3.7 29.7-16.5l4.2-14.7c23.8 1 46.3-5.5 65.1-17.6L215 473c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-10.6-10.6c9.1-14.1 15.1-30.5 17-48.3l.1-.8c.3-1.7 1-5.1 2.3-9.8l.2-.8 12.6 5.4c12.2 5.2 26.3-.4 31.5-12.6s-.4-26.3-12.6-31.5l-11.3-4.8c9.9-14.9 24.9-31.6 48.6-46l2.1 7.5c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7L371 259.2c6.9-2.2 14.3-4.3 22.2-6.1c12.9-3 24.7-8 35.2-14.8L439 249c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-10.6-10.6c12.2-19 18.6-41.6 17.6-65.1l14.7-4.2c12.7-3.6 20.1-16.9 16.5-29.7s-16.9-20.1-29.7-16.5l-13.7 3.9c-10.8-21.2-28-38-48.5-48.5l3.9-13.8zM92.1 363.3l0 0L144 368l-51.9-4.7zM112 320a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM240 184a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>';
const cyanobacteriesSVGUrl =
  'data:image/svg+xml;base64,' + btoa(cyanobacteriesSVG);
const cyanobacteriesURL = 'assets/icons/cyanobacteries.png';
export const cyanobacteriesIcon = L.icon({
  // iconUrl: cyanobacteriesSVGUrl,
  iconUrl: cyanobacteriesURL,
  iconSize: [width, height],
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  shadowAnchor: [shadowHorizontalOffset, shadowVerticalOffset],
  shadowSize: [shadowWidth, shadowHeight],
});

// SVG icon for Rage
const rageSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ff0000" d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V43.5c0 49.9-60.3 74.9-95.6 39.6L120.2 75C107.7 62.5 87.5 62.5 75 75s-12.5 32.8 0 45.3l8.2 8.2C118.4 163.7 93.4 224 43.5 224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H43.5c49.9 0 74.9 60.3 39.6 95.6L75 391.8c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l8.2-8.2c35.3-35.3 95.6-10.3 95.6 39.6V480c0 17.7 14.3 32 32 32s32-14.3 32-32V468.5c0-49.9 60.3-74.9 95.6-39.6l8.2 8.2c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-8.2-8.2c-35.3-35.3-10.3-95.6 39.6-95.6H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H468.5c-49.9 0-74.9-60.3-39.6-95.6l8.2-8.2c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-8.2 8.2C348.3 118.4 288 93.4 288 43.5V32zM176 224a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm128 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>';
const rageSVGUrl = 'data:image/svg+xml;base64,' + btoa(rageSVG);
// TODO : CREATE ICON
// const rageURL = 'assets/icons/rage.png';
export const rageIcon = L.icon({
  iconUrl: rageSVGUrl,
  iconSize: [width, height],
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  shadowAnchor: [shadowHorizontalOffset, shadowVerticalOffset],
  shadowSize: [shadowWidth, shadowHeight],
});

// SVG icon for Chasse
const chasseSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ff0000" d="M265.2 192c25.4 0 49.8 7.1 70.8 19.9V512H144V337.7L90.4 428.3c-11.2 19-35.8 25.3-54.8 14.1s-25.3-35.8-14.1-54.8L97.7 258.8c24.5-41.4 69-66.8 117.1-66.8h50.4zM160 80a80 80 0 1 1 160 0A80 80 0 1 1 160 80zM448 0c8.8 0 16 7.2 16 16V132.3c9.6 5.5 16 15.9 16 27.7V269.3l16-5.3V208c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v84.5c0 6.9-4.4 13-10.9 15.2L480 325.3V352h48c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H484l23 92.1c2.5 10.1-5.1 19.9-15.5 19.9H432c-8.8 0-16-7.2-16-16V400H400c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32V160c0-11.8 6.4-22.2 16-27.7V32c-8.8 0-16-7.2-16-16s7.2-16 16-16h16 16z"/></svg>';
const chasseSVGUrl = 'data:image/svg+xml;base64,' + btoa(chasseSVG);
const chasseURL = 'assets/icons/chasse.png';
export const chasseIcon = L.icon({
  // iconUrl: chasseSVGUrl,
  iconUrl: chasseURL,
  iconSize: [width, height],
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  shadowAnchor: [shadowHorizontalOffset, shadowVerticalOffset],
  shadowSize: [shadowWidth, shadowHeight],
});

// SVG icon for Bétail
const betailSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ff0000" d="M96 224v32V416c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V327.8c9.9 6.6 20.6 12 32 16.1V368c0 8.8 7.2 16 16 16s16-7.2 16-16V351.1c5.3 .6 10.6 .9 16 .9s10.7-.3 16-.9V368c0 8.8 7.2 16 16 16s16-7.2 16-16V343.8c11.4-4 22.1-9.4 32-16.1V416c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V256l32 32v49.5c0 9.5 2.8 18.7 8.1 26.6L530 427c8.8 13.1 23.5 21 39.3 21c22.5 0 41.9-15.9 46.3-38l20.3-101.6c2.6-13-.3-26.5-8-37.3l-3.9-5.5V184c0-13.3-10.7-24-24-24s-24 10.7-24 24v14.4l-52.9-74.1C496 86.5 452.4 64 405.9 64H272 256 192 144C77.7 64 24 117.7 24 184v54C9.4 249.8 0 267.8 0 288v17.6c0 8 6.4 14.4 14.4 14.4C46.2 320 72 294.2 72 262.4V256 224 184c0-24.3 12.1-45.8 30.5-58.9C98.3 135.9 96 147.7 96 160v64zM560 336a16 16 0 1 1 32 0 16 16 0 1 1 -32 0zM166.6 166.6c-4.2-4.2-6.6-10-6.6-16c0-12.5 10.1-22.6 22.6-22.6H361.4c12.5 0 22.6 10.1 22.6 22.6c0 6-2.4 11.8-6.6 16l-23.4 23.4C332.2 211.8 302.7 224 272 224s-60.2-12.2-81.9-33.9l-23.4-23.4z"/></svg>';
const betailSVGUrl = 'data:image/svg+xml;base64,' + btoa(betailSVG);
const betailURL = 'assets/icons/betail.png';
export const betailIcon = L.icon({
  // iconUrl: betailSVGUrl,
  iconUrl: betailURL,
  iconSize: [width, height],
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  shadowAnchor: [shadowHorizontalOffset, shadowVerticalOffset],
  shadowSize: [shadowWidth, shadowHeight],
});

// SVG icon for Interdit
const interditSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ff0000" d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>';
const interditSVGUrl = 'data:image/svg+xml;base64,' + btoa(interditSVG);
const interditURL = 'assets/icons/interdit.png';
export const interditIcon = L.icon({
  // iconUrl: interditSVGUrl,
  iconUrl: interditURL,
  iconSize: [width, height],
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  shadowAnchor: [shadowHorizontalOffset, shadowVerticalOffset],
  shadowSize: [shadowWidth, shadowHeight],
});

// SVG icon for AutreDanger
const autreDangerSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ff0000" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>';
const autreDangerSVGUrl = 'data:image/svg+xml;base64,' + btoa(autreDangerSVG);
// TODO : CREATE ICON
// const autreDangerURL = 'assets/icons/autreDanger.png';
export const autreDangerIcon = L.icon({
  iconUrl: autreDangerSVGUrl,
  iconSize: [width, height],
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  shadowAnchor: [shadowHorizontalOffset, shadowVerticalOffset],
  shadowSize: [shadowWidth, shadowHeight],
});

// Function to get the Leaflet icon for a given category
export function getIcon(category: string): L.Icon {
  switch (category) {
    case 'SPA':
      return spaIcon;
    case 'Veterinaire':
      return veterinaireIcon;
    case 'Toilettage':
      return toilettageIcon;
    case 'Animalerie':
      return animalerieIcon;
    case 'Medecine':
      return medecineIcon;
    case 'Poubelle':
      return poubelleIcon;
    case 'Eau':
      return eauIcon;
    case 'Parc':
      return parkIcon;
    case 'Centre':
      return centreIcon;
    case 'Garde':
      return gardeIcon;
    case 'Baignade':
      return baignadeIcon;
    case 'Loisirs':
      return loisirsIcon;
    case 'Autre intérêt':
      return autreInteretIcon;
    case 'Toxique':
      return toxiqueIcon;
    case 'Patous':
      return patousIcon;
    case 'Cyanobactéries':
      return cyanobacteriesIcon;
    case 'Rage':
      return rageIcon;
    case 'Chasse':
      return chasseIcon;
    case 'Bétail':
      return betailIcon;
    case 'Interdit':
      return interditIcon;
    case 'Autre danger':
      return autreDangerIcon;
    default:
      return autreDangerIcon;
  }
}

// Function to get the SVG icon URL for a given category
export function getSvgUrl(category: string): string {
  switch (category) {
    case 'SPA':
      // return spaSVGUrl;
      return spaURL;
    case 'Veterinaire':
      // return veterinaireSVGUrl;
      return veterinaireURL;
    case 'Toilettage':
      // return toilettageSVGUrl;
      return toilettageURL;
    case 'Animalerie':
      // return animalerieSVGUrl;
      return animalerieURL;
    case 'Medecine':
      return medecineSVGUrl;
    case 'Poubelle':
      // return poubelleSVGUrl;
      return poubelleURL;
    case 'Eau':
      // return eauSVGUrl;
      return eauURL;
    case 'Parc':
      // return parkSVGUrl;
      return parkURL;
    case 'Centre':
      // return centreSVGUrl;
      return centreURL;
    case 'Garde':
      // return gardeSVGUrl;
      return gardeURL;
    case 'Baignade':
      // return baignadeSVGUrl;
      return baignadeURL;
    case 'Loisirs':
      return loisirsSVGUrl;
    case 'Autre intérêt':
      return autreInteretSVGUrl;
    case 'Toxique':
      // return toxiqueSVGUrl;
      return toxiqueURL;
    case 'Patous':
      // return patousSVGUrl;
      return patousURL;
    case 'Cyanobactéries':
      // return cyanobacteriesSVGUrl;
      return cyanobacteriesURL;
    case 'Rage':
      return rageSVGUrl;
    case 'Chasse':
      // return chasseSVGUrl;
      return chasseURL;
    case 'Bétail':
      // return betailSVGUrl;
      return betailURL;
    case 'Interdit':
      // return interditSVGUrl;
      return interditURL;
    case 'Autre danger':
      return autreDangerSVGUrl;
    default:
      return autreDangerSVGUrl;
  }
}
