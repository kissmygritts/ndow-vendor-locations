import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import { Style, Circle, Fill, Stroke, Icon } from 'ol/style'
import vendors from '../data/vendor.geojson'
import shop from '../data/shop.svg'
import capitol from '../data/capitol.svg'

const stateStyle = new Style({
  image: new Icon({
    src: capitol,
    scale: 2,
    opacity: 0.9
  })
})

const vendorsStyle = new Style({
  image: new Icon({
    src: shop,
    scale: 1.1,
    opacity: 0.9
  })
})

const vendorsSource = new VectorSource({
  format: new GeoJSON(),
  url: vendors
})

const vendorsLayer = new VectorLayer({
  source: vendorsSource,
  style: function (feature) {
    if (feature.values_.state_office === 'FALSE') {
      return vendorsStyle
    } else {
      return stateStyle
    }
  }
})

vendorsLayer.set('name', 'vendors')

export { vendorsLayer }
