import 'ol/ol.css'
import { Map, View } from 'ol'
import { useGeographic } from 'ol/proj'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { vendorsLayer } from './js/vendors-layer.js'
import { popupOverlay, createVendorPopup } from './js/vendors-popup.js'
import { geolocateControl, geolocationLayer, geolocationSource } from './js/geolocation-layer.js'

useGeographic()

// create a new open layer map instance
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    vendorsLayer,
    geolocationLayer
  ],
  overlays: [popupOverlay],
  view: new View({
    center: [-117, 39],
    zoom: 7
  })
})

// display agent data on single click
map.on('singleclick', function (evt) {
  const feature = map.forEachFeatureAtPixel(
    evt.pixel,
    (feature) => feature,
    {
      layerFilter: (layer) => layer.get('name') === 'vendors'
    }
  )

  if (feature) {
    createVendorPopup(feature)
  }
})

// geolocation to display current location
navigator.geolocation.watchPosition(function (pos) {
  const coords = [pos.coords.longitude, pos.coords.latitude]

  geolocationSource.clear(true)
  geolocationSource.addFeatures([
    new Feature(new Point(coords))
  ])
}, function (error) {
  console.error('Geolocation rejected.', error)
}, {
  enableHighAccuracy: true
})

// add control, and event listener
map.addControl(geolocateControl())

document.addEventListener('locate-me', (event) => {
  if (!geolocationSource.isEmpty()) {
    map.getView().fit(geolocationSource.getExtent(), {
      maxZoom: 14,
      duration: 500
    })
  }
})
