import { getData } from './api.js';
import { renderAds } from './map-render.js';
import { debounce } from './util.js';

const SIMILAR_ADS_COUNT = 10;
const DEBOUNCE_TIMEOUT = 500;

const mapFilters = document.querySelector('.map__filters');

let ads = [];
const getDefaultAds = () => ads.slice(0, SIMILAR_ADS_COUNT);

getData()
  .then((gettedAds) => {
    ads = gettedAds;
  })
  .then(() => renderAds(getDefaultAds()));

const priceRange = {
  any: { min: 0, max: Infinity },
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
  const filteredAds = ads.filter((ad) => {
    const resultAfterAllChecks = [];

    for (const filter of new FormData(mapFilters).entries()) {
      resultAfterAllChecks.push(checkAdProperties(...filter, ad));
    }

    return !resultAfterAllChecks.includes(false);
  });

  renderAds(filteredAds.slice(0, SIMILAR_ADS_COUNT));
};

mapFilters.addEventListener('change', debounce(renderFilteredAds, DEBOUNCE_TIMEOUT));

export { getDefaultAds };
