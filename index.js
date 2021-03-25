import 'ol/ol.css'
import { Map, Overlay, View } from 'ol'
import { toLonLat, useGeographic } from 'ol/proj'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';

import data from './data/test_vendor_location_data.geojson';
import { toStringHDMS } from 'ol/coordinate'

// makes it so the map view uses geographic coordinates
useGeographic()

//Elements that make up the popup
let container = document.getElementById('popup');
let content = document.getElementById('popup-content');
let closer = document.getElementById('popup-closer');

//Create an overlay to anchor the popup to the map
const overlay = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
});

//Add a click handler to hide the popup
closer.onclick = function() {
  overlay.setPosition(undefined);
  closer.blur();
  return false
};

const test_source =  new VectorSource({
  format: new GeoJSON(),
  url: data,
});

const test_layer =  new VectorLayer({
  source: test_source,
});

// create a new openlayer map instance
const map = new Map({
  // target: means the dom element to put the map in
  target: 'map',

  // layers: tile layers to use within the map
  layers: [
    
    new TileLayer({
      // shortcut to specify OpenStreetMaps, instead of needing the url
      source: new OSM()
    }), test_layer,
  ],

  overlays: [overlay],

  // the initial view of the map
  view: new View({
    center: [-117, 39],
    zoom: 5
  })
})

map.on('singleclick', function(evt) {
  var coordinate = evt.coordinate;
  var hdms = toStringHDMS((coordinate));

  content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
  overlay.setPosition(coordinate);
});
