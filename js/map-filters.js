import {getData} from './api.js';
import {renderSimilarAds} from './map-render.js';

const SIMILAR_ADS_COUNT = 10;

const filters = document.querySelectorAll('[name^=housing]');
const features = document.querySelectorAll('[name=features]');

const adsData = getData().then((ads) => ads.slice());
// adsData.then((data) => console.log(data));

const renderDefaultMarkers = () => {
  adsData.then((data) => renderSimilarAds(data, SIMILAR_ADS_COUNT));
};

renderDefaultMarkers();

const priceRange = {
  low: {min: 0, max: 10000},
  middle: {min: 10001, max: 50000},
  high: {min: 50000, max: Infinity}
};

const filterBy = (value, filterName) => adsData.then((ads) => ads.filter((ad) => String(ad.offer[filterName]) === value));
const filterByPrice = (value) => adsData.then((ads) => ads.filter((ad) => ad.offer.price >= priceRange[value].min && ad.offer.price <= priceRange[value].max));
const hasFeature = (featuresInData, value) => featuresInData ? featuresInData.some((feature) => feature === value) : false;
const filterByFeatures = (value) => adsData.then((ads) => ads.filter((ad) => hasFeature(ad.offer.features, value)));

filters.forEach((filter) => filter.addEventListener('change', () => {
  if (filter.value === 'any') {
    renderDefaultMarkers();
    return;
  }
  if (filter.name === 'housing-price') {
    filterByPrice(filter.value).then((filteredData) => renderSimilarAds(filteredData, SIMILAR_ADS_COUNT));
  } else {
    filterBy(filter.value, filter.name.replace('housing-', '')).then((filteredData) => renderSimilarAds(filteredData, SIMILAR_ADS_COUNT));
  }
}));

features.forEach((feature) => {
  feature.addEventListener('change', () => {
    if (feature.checked) {
      filterByFeatures(feature.value).then((filteredData) => renderSimilarAds(filteredData, SIMILAR_ADS_COUNT));
    } else {
      renderDefaultMarkers();
    }
  });
});
