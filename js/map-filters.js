import { getData } from './api.js';
import { renderAds } from './map-render.js';
import { debounce } from './util.js';

const SIMILAR_ADS_COUNT = 10;
const DEBOUNCE_TIMEOUT = 500;

const mapForm = document.querySelector('.map__filters');

let ads = [];
const getFirstTenAds = () => ads.slice(0, SIMILAR_ADS_COUNT);

getData()
  .then((gettedAds) => {
    ads = gettedAds;
  })
  .then(() => renderAds(getFirstTenAds()));

const priceRange = {
  any: {min: 0, max: Infinity},
  low: { min: 0, max: 10000 },
  middle: { min: 10001, max: 50000 },
  high: { min: 50001, max: Infinity },
};

const checkAdProperties = (filterName, filterValue, adObj) => {
  if (filterName === 'housing-price') {
    return adObj.offer.price >= priceRange[filterValue].min && adObj.offer.price <= priceRange[filterValue].max;
  }

  if (filterName === 'features') {
    return adObj.offer.features ? adObj.offer.features.includes(filterValue) : false;
  }

  return filterValue === String(adObj.offer[filterName.replace('housing-', '')]) || filterValue === 'any';
};

const renderFilteredAds = () => {

  const activeFilters = {};

  const filteredAds = ads.filter((ad) => {

    for (const formValue of new FormData(mapForm).entries()) {
      activeFilters[formValue[0]] = checkAdProperties(...formValue, ad);
    }

    if (!Object.values(activeFilters).includes(false))  {
      return true;
    }

    return false;
  });

  renderAds(filteredAds.slice(0, SIMILAR_ADS_COUNT));

};

mapForm.addEventListener('change', debounce(renderFilteredAds, DEBOUNCE_TIMEOUT));

export { getFirstTenAds };
