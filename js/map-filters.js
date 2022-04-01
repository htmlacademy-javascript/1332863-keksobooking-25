/* eslint-disable no-unused-vars */
import {getData} from './api.js';
import {renderSimilarAds} from './map-render.js';

const SIMILAR_ADS_COUNT = 10;

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const filterWifi = mapFilters.querySelectorAll('#filter-wifi');
const filterWasher = mapFilters.querySelectorAll('#filter-washer');
const filterParking = mapFilters.querySelectorAll('#filter-parking');
const filterElevator = mapFilters.querySelectorAll('#filter-elevator');
const filterDishwasher = mapFilters.querySelectorAll('#filter-dishwasher');
const filterConditioner = mapFilters.querySelectorAll('#filter-conditioner');

const adsData = getData().then((ads) => ads.slice());

renderSimilarAds(adsData, SIMILAR_ADS_COUNT);

// const hasFeature = (features, value) => features ? features.some((feature) => feature === value): false;

// filterParking.addEventListener('change', () => {
//   markerGroup.clearLayers();

//   getData().then((ads) => ads.forEach((ad) => {
//     if (hasFeature(ad.offer.features, 'parking')) {
//       const marker = createMarker(ad.location.lat, ad.location.lng, commonIcon);

//       marker.addTo(markerGroup).bindPopup(createSimilarAd(ad));
//     }
//   }));
// });
