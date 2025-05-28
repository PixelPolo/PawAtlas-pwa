import L from 'leaflet';

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
