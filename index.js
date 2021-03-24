import 'ol/ol.css'
import { Map, View } from 'ol'
import { useGeographic } from 'ol/proj'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';

import data from './data/test_vendor_location_data.geojson';

// makes it so the map view uses geographic coordinates
useGeographic()

const test_source =  new VectorSource({
  format: new GeoJSON(),
  url: data,
})

const test_layer =  new VectorLayer({
  source: test_source,
})

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

  // the initial view of the map
  view: new View({
    center: [-117, 39],
    zoom: 5
  })
})
