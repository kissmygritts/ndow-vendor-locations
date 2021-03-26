import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Control from 'ol/control/Control'
import { Fill, Stroke, Style, Circle } from 'ol/style'

const geolocationStyle = new Style({
  image: new Circle({
    radius: 7,
    fill: new Fill({ color: [92, 49, 57, 0.90] }),
    stroke: new Stroke({
      color: [125, 40, 57, 0.90], width: 2
    })
  })
})

const geolocationSource = new VectorSource()
const geolocationLayer = new VectorLayer({
  source: geolocationSource,
  style: geolocationStyle
})

const geolocateControl = () => {
  const locate = document.createElement('div')

  locate.className = 'ol-control ol-unselectable locate'
  locate.innerHTML = '<button title="Locate Me">◎</button>'

  locate.onclick = () => {
    const event = new Event('locate-me', { bubbles: true })
    locate.dispatchEvent(event)
  }

  return new Control({ element: locate })
}

export {
  geolocationSource,
  geolocationLayer,
  geolocateControl
}
