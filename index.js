import 'ol/ol.css'
import { Map, Overlay, View } from 'ol'
import { useGeographic } from 'ol/proj'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';

import data from './data/vendors.geojson';

// makes it so the map view uses geographic coordinates
useGeographic()

// elements that make up the popup
let container = document.getElementById('popup');
let content = document.getElementById('popup-content');
let closer = document.getElementById('popup-closer');

// create an overlay to anchor the popup to the map
const overlay = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
});

// add a click handler to hide the popup
closer.onclick = function() {
  overlay.setPosition(undefined);
  closer.blur();
  return false
};

// vector data source for vector data layer
const test_source =  new VectorSource({
  format: new GeoJSON(),
  url: data,
});

// vector data layer
const test_layer =  new VectorLayer({
  source: test_source,
});

// create a new open layer map instance
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

  // overlay that controls the popup
  overlays: [overlay],

  // the initial view of the map
  view: new View({
    center: [-117, 39],
    zoom: 7
  })
})

// display agent data on single click
map.on('singleclick', function(evt) {
  let feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    return feature;
  });
  if (feature) {
    let coordinates = feature.getGeometry().getCoordinates();
    overlay.setPosition(coordinates);
    let agent_name = feature.get('AGENT_NAME')
    let address = feature.get('ADDRESS')
    let phone = feature.get('PHONE')
    content.innerHTML = '<p>Agent Name:</p>' + agent_name + '<p>Address:</p>' + address + '<p>Phone Number:</p>' + phone;
  }
});
