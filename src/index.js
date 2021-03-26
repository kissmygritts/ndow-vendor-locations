import 'ol/ol.css'
import { Map, Overlay, View } from 'ol'
import { useGeographic } from 'ol/proj'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import { Fill, Stroke, Style, Circle } from 'ol/style'
import Feature from 'ol/Feature'
// import { circular } from 'ol/geom/Polygon'
import Point from 'ol/geom/Point'
import Control from 'ol/control/Control'

import data from './data/vendors.geojson'

// makes it so the map view uses geographic coordinates
useGeographic()

// elements that make up the popup
const container = document.getElementById('popup')
const closer = document.getElementById('popup-closer')

// create an overlay to anchor the popup to the map
const overlay = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
})

// add a click handler to hide the popup
closer.onclick = function () {
  overlay.setPosition(undefined)
  closer.blur()
  return false
}

// vendor layer point styling
const pointStyle = new Style({
  image: new Circle({
    radius: 7,
    fill: new Fill({ color: [90, 100, 125, 0.5] }),
    stroke: new Stroke({
      color: [53, 85, 166, 0.5], width: 2
    })
  })
})

// vendor location data source for vector data layer
const vendorLocationSource = new VectorSource({
  format: new GeoJSON(),
  url: data
})

// vendor location data layer
const vendorLocationLayer = new VectorLayer({
  source: vendorLocationSource,
  style: pointStyle
})

// geolocation layer point styling
const geolocationStyle = new Style({
  image: new Circle({
    radius: 7,
    fill: new Fill({ color: [92, 49, 57, 0.90] }),
    stroke: new Stroke({
      color: [125, 40, 57, 0.90], width: 2
    })
  })
})

// vector data source and vector data layer for geolocation
const geolocationSource = new VectorSource()
const geolocationLayer = new VectorLayer({
  source: geolocationSource,
  style: geolocationStyle
})

// create a new open layer map instance
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    vendorLocationLayer,
    geolocationLayer
  ],
  overlays: [overlay],
  view: new View({
    center: [-117, 39],
    zoom: 7
  })
})

// display agent data on single click
map.on('singleclick', function (evt) {
  const feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => feature)

  if (feature) {
    const coordinates = feature.getGeometry().getCoordinates()
    const properties = feature.values_
    const googleMapsLink = `https://google.com/maps/place/${properties.address.replaceAll(' ', '+')}`
    console.log({ googleMapsLink })

    overlay.setPosition(coordinates)

    const popupTitle = document.getElementById('ol-popup-title')
    const popupBody = document.getElementById('ol-popup-body')
    const popupLink = document.getElementById('ol-popup-link')

    popupTitle.innerHTML = `${properties.name.toLowerCase()}`
    popupBody.innerHTML = `
      <p><bold>Phone: </bold>${properties.phone}</p>
      <p>${properties.address.toLowerCase()}</p>
    `
    popupLink.href = googleMapsLink
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
  alert(`ERROR: ${error.message}`)
}, {
  enableHighAccuracy: true
})

// button to zoom to soure
const locate = document.createElement('div')
locate.className = 'ol-control ol-unselectable locate'
locate.innerHTML = '<button title="Locate Me">◎</button>'
locate.addEventListener('click', function () {
  if (!geolocationSource.isEmpty()) {
    map.getView().fit(geolocationSource.getExtent(), {
      maxZoom: 14,
      duration: 500
    })
  }
})
map.addControl(new Control({
  element: locate
}))
