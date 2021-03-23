import 'ol/ol.css'
import { Map, View } from 'ol'
import { useGeographic } from 'ol/proj'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'

// makes it so the map view uses geographic coordinates
useGeographic()

// create a new openlayer map instance
const map = new Map({
  // target: means the dom element to put the map in
  target: 'map',

  // layers: tile layers to use within the map
  layers: [
    new TileLayer({
      // shortcut to specify OpenStreetMaps, instead of needing the url
      source: new OSM()
    })
  ],

  // the initial view of the map
  view: new View({
    center: [-117, 39],
    zoom: 5
  })
})
