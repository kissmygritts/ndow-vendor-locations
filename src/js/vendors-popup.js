import { Overlay } from 'ol'

const popupOverlay = new Overlay({
  element: document.getElementById('popup'),
  autoPan: true,
  autoPanAnimation: { duration: 250 }
})

const createVendorPopup = (feature) => {
  const coordinates = feature.getGeometry().getCoordinates()
  const properties = feature.values_
  const googleMapsLink = `https://google.com/maps/place/${properties.address.replaceAll(' ', '+')}`

  popupOverlay.setPosition(coordinates)

  const popupTitle = document.getElementById('ol-popup-title')
  const popupBody = document.getElementById('ol-popup-body')
  const popupLink = document.getElementById('ol-popup-link')

  popupTitle.innerHTML = `${properties.name.toLowerCase()}`
  popupBody.innerHTML = `
      <!-- Not used until Sherrill provides phone numbers -->
      <!-- <p><bold>Phone: </bold>${properties.phone}</p> -->
      <p>${properties.address.toLowerCase()}</p>
    `
  popupLink.href = googleMapsLink

  // close button
  const closeBtn = document.getElementById('popup-closer')
  closeBtn.onclick = () => {
    popupOverlay.setPosition(undefined)
    closeBtn.blur()
    return false
  }
}

export {
  popupOverlay,
  createVendorPopup
}
