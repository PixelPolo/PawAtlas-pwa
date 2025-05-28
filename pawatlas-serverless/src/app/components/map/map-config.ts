import 'leaflet.locatecontrol';
import L from 'leaflet';

/*
This file contains the configuration of the map
It is used in the map component to initialize the map
Contains : Map initialization, tile layer, locate me button
*/

// https://javascript.plainenglish.io/a-simplified-journey-of-leaflet-js-integration-with-angular-step-by-step-guide-b223f19b71f0
// https://www.ultimateakash.com/blog-details/Ii1DQGAKYAo=/How-To-Integrate-Leaflet-Maps-in-Angular-2022
// https://github.com/domoritz/leaflet-locatecontrol?tab=readme-ov-file
// https://github.com/leaflet-extras/leaflet-providers?tab=readme-ov-file
// https://leaflet-extras.github.io/leaflet-providers/preview/

// ***** MAP INITIALIZATION *****

// Initialize the map with the current location
export function initMap(
  mapContainerId: string,
  layerControl: L.Control.Layers
): L.Map {
  // Create a map object and fit to the world
  const map = L.map(mapContainerId).fitWorld();
  // Add a tile layer to the map
  addTileLayer(map, layerControl);
  // Set the position of the zoom control
  // map.zoomControl.setPosition('bottomright');
  map.zoomControl.remove();
  // Locate the user on the map with "setView: true"
  map.locate({ setView: true, maxZoom: 12 });
  // Add a locate me button to the map (BAD PERFORMANCE)
  // addLocateMeButton(map);
  // Return the map object
  return map;
}

// ***** TILE LAYER *****

// Add the tile layer to the map
function addTileLayer(map: L.Map, layerControl: L.Control.Layers): void {
  // OpenStreetMap tile layer
  const OSM = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 18,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }
  );
  // OpenStreetMap Switzerland tile layer
  const OSM_CH = L.tileLayer(
    'https://tile.osm.ch/switzerland/{z}/{x}/{y}.png',
    {
      maxZoom: 20,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }
  );
  // OpenStreetMap France tile layer
  const OSM_FR = L.tileLayer(
    'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
    {
      maxZoom: 20,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }
  );
  // Add the tile layers to the layer control
  layerControl.addBaseLayer(OSM, 'OpenStreetMap');
  layerControl.addBaseLayer(OSM_CH, 'OpenStreetMap Switzerland');
  layerControl.addBaseLayer(OSM_FR, 'OpenStreetMap France');
  // Add the layer control to the map
  layerControl.addTo(map);
  // Add the OpenStreetMap tile layer to the map by default
  OSM.addTo(map);
}

// ***** LOCATE ME BUTTON *****

// Add a locate me button to the map
// NOT USED BECAUSE BAD PERFORMANCE WITH THIS PLUGIN
function addLocateMeButton(map: L.Map): void {
  L.control
    .locate({
      position: 'bottomright',
      strings: {
        title: 'Ma position',
      },
      locateOptions: {
        maxZoom: 16,
      },
    })
    .addTo(map);
}
