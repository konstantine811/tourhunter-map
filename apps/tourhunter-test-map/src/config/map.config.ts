const access_token =
  'pk.eyJ1Ijoia29uc3RhbnRpbmU4MTEiLCJhIjoiY2themphMDhpMGsyazJybWlpbDdmMGthdSJ9.m2RIe_g8m5dqbce0JrO73w';

export const mapConfig = {
  link: `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${access_token}`,
  attr: {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 16,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: access_token,
  },
};
