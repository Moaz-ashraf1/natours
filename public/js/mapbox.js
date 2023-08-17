export const displayMap = locations => {
  //1) this token allows the code to access Mapbox services.
  mapboxgl.accessToken =
    'pk.eyJ1IjoibW9hemFzaHJhZiIsImEiOiJjbGtzOXU5MjEwMW0wM2RvYjhjbTBneDd1In0.paHLQEEw-LrDfejnMI-88w';

  //2)  creates a map object using the Mapbox library.
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/moazashraf/clksalkau005901qv4ez6bx8s',
    scrollZoom: false
  });

  //used to ensure that all the markers are visible on the map.
  const bounds = new mapboxgl.LngLatBounds();

  // create marker
  locations.forEach(loc => {
    const el = document.createElement('div');
    el.className = 'marker';
    // add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      reight: 100
    }
  });
};
