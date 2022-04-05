import { getData } from './api.js';
import { renderAds } from './map-render.js';
import { debounce } from './util.js';

const SIMILAR_ADS_COUNT = 10;
const DEBOUNCE_TIMEOUT = 500;
const NON_CHECKBOX_FILTERS = 4;

const mapForm = document.querySelector('.map__filters');

let ads = [];
const getFirstTenAds = () => ads.slice(0, SIMILAR_ADS_COUNT);

getData()
  .then((gettedAds) => {
    ads = gettedAds;
  })
  .then(() => renderAds(getFirstTenAds()));

const priceRange = {
  low: { min: 0, max: 10000 },
  middle: { min: 10001, max: 50000 },
  high: { min: 50001, max: Infinity },
};

const hasAllFeatures = (featuresArr, filterArr) => {
  if (featuresArr) {
    let match = 0;
    for (let i = NON_CHECKBOX_FILTERS; i < filterArr.length; i++) {
      if (featuresArr.includes(filterArr[i])) {
        match++;
      }
    }

    if (match === filterArr.length - NON_CHECKBOX_FILTERS) {
      return true;
    }

    return false;
  }

  return false;
};

const renderFilteredAds = () => {

  const activeFilters = [];

  for (const formValue of new FormData(mapForm).entries()) {
    activeFilters.push(formValue[1]);
  }

  const filterAds = (ad) => (
    (activeFilters[0] === 'any' || activeFilters[0] === ad.offer.type) &&
    (activeFilters[1] === 'any' || (ad.offer.price >= priceRange[activeFilters[1]].min && ad.offer.price <= priceRange[activeFilters[1]].max)) &&
    (activeFilters[2] === 'any' || Number(activeFilters[2]) === ad.offer.rooms) &&
    (activeFilters[3] === 'any' || Number(activeFilters[3]) === ad.offer.guests) &&
    (activeFilters.length > NON_CHECKBOX_FILTERS ? hasAllFeatures(ad.offer.features, activeFilters) : true)
  );

  const filteredAds = ads.filter((ad) => filterAds(ad));


  if (activeFilters.every((filter) => filter === 'any')) {
    renderAds(getFirstTenAds());
  } else {
    renderAds(filteredAds.slice(0, SIMILAR_ADS_COUNT));
  }
};

mapForm.addEventListener('change', debounce(renderFilteredAds, DEBOUNCE_TIMEOUT));

export { getFirstTenAds };
