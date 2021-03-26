const watchPosition = (options) => {
  return new Promise((resolve, reject) => {
    const hasGeolocation = 'geolocation' in navigator

    if (!hasGeolocation) {
      console.error('Geolocation is not available.')
      reject(new Error('Geolocation is not available.'))
    }

    navigator.geolocation.watchPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          altitude: position.coords.altitude,
          accuracy: position.coords.accuracy
        })
      },
      (err) => {
        reject(err)
      },
      options
    )
  })
}

export { watchPosition }
