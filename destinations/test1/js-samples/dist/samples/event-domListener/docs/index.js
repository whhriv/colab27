/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// [START maps_event_domListener]
async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  const mapDiv = document.getElementById("map");
  const map = new google.maps.Map(mapDiv, {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644),
  });

  // We add a DOM event here to show an alert if the DIV containing the
  // map is clicked.
  google.maps.event.addDomListener(mapDiv, "click", () => {
    window.alert("Map was clicked!");
  });
}

initMap();
// [END maps_event_domListener]
