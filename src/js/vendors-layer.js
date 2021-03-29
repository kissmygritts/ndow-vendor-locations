import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import { Style, Circle, Fill, Stroke } from 'ol/style'
import vendors from '../data/vendors.geojson'

// const vendorsStyle = new Style({
//   image: new Circle({
//     radius: 7,
//     fill: new Fill({ color: [90, 100, 125, 0.5] }),
//     stroke: new Stroke({
//       color: [53, 85, 166, 0.5],
//       width: 2
//     })
//   })
// })

const vendorsSource = new VectorSource({
  format: new GeoJSON(),
  url: vendors
})

const vendorsLayer = new VectorLayer({
  source: vendorsSource,
  style: function (feature) {
    if (feature.values_.pos_agent === 'FALSE') {
      return new Style({
        image: new Circle({
          radius: 7,
          fill: new Fill({ color: [240, 81, 89, 0.5] }),
          stroke: new Stroke({
            color: [140, 35, 40, 0.5],
            width: 2
          })
        })
      })
    } else {
      return new Style({
        image: new Circle({
          radius: 7,
          fill: new Fill({ color: [90, 100, 125, 0.5] }),
          stroke: new Stroke({
            color: [53, 85, 166, 0.5],
            width: 2
          })
        })
      })
    }
  }
})

vendorsLayer.set('name', 'vendors')

export { vendorsLayer }
