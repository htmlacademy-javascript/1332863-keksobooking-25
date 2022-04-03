import { getRandomInt } from './util.js';
import { getData } from './api.js';
import { renderAds } from './map-render.js';
import { showErrorMessage } from './util.js';
import { debounce } from './util.js';

const SIMILAR_ADS_COUNT = 10;
const MESSAGE_TEXT = 'Объявления под заданные фильтры отсутствуют, будут показаны 10 случайных объявлений';
const ALERT_SHOW_TIME = 5000;
const DEBOUNCE_TIMEOUT = 500;

const mapForm = document.querySelector('.map__filters');
const filters = mapForm.querySelectorAll('[name^=housing]');
const features = mapForm.querySelectorAll('[name=features]');

const adsData = getData().then((ads) => ads.slice());

const getRandomIndex = (arrLength) => {
  const randomIndex = getRandomInt(0, arrLength) - SIMILAR_ADS_COUNT;
  return randomIndex < 0 ? 0 : randomIndex;
};

const renderRandomAds = () => {
  adsData
    .then((data) => {
      const randomIndex = getRandomIndex(data.length);
      const randomAds = data.slice(randomIndex, randomIndex + SIMILAR_ADS_COUNT);
      return randomAds;
    })
    .then((randomAds) => renderAds(randomAds));
};

renderRandomAds();

const alertNotSuchAds = () => {
  showErrorMessage(MESSAGE_TEXT, ALERT_SHOW_TIME);
  renderRandomAds();
};

const priceRange = {
  low: { min: 0, max: 10000 },
  middle: { min: 10001, max: 50000 },
  high: { min: 50001, max: Infinity },
};

const renderFilteredAds = () => {
  const activeFilters = [];

  filters.forEach((filter) => {
    if (filter.name === 'housing-rooms' && filter.value !== 'any') {
      activeFilters.push(`${filter.value}rooms`);
    } else if (filter.name === 'housing-guests' && filter.value !== 'any') {
      activeFilters.push(`${filter.value}guests`);
    } else if (filter.value !== 'any') {
      activeFilters.push(filter.value);
    }
  });

  features.forEach((feature) => feature.checked ? activeFilters.push(feature.value) : activeFilters);

  const rankedAds = [];

  adsData
    .then((ads) =>
      ads.forEach((ad) => {
        ad.rank = 0;

        if (activeFilters.some((value) => ad.offer.type === value)) {
          ad.rank++;
        }
        if (activeFilters.some((value) => value.endsWith('rooms') ? ad.offer.rooms === parseInt(value, 10) : false)) {
          ad.rank++;
        }
        if (activeFilters.some((value) => value.endsWith('guests') ? ad.offer.guests === parseInt(value, 10) : false)) {
          ad.rank++;
        }

        activeFilters.some((value) => {
          if (value === 'low' || value === 'middle' || value === 'high') {
            if (ad.offer.price >= priceRange[value].min && ad.offer.price <= priceRange[value].max) {
              ad.rank++;
            }
          }
        });

        activeFilters.some((value) => {
          if (ad.offer.features) {
            ad.offer.features.forEach((feature) => (feature === value ? ad.rank++ : ad.rank));
          }
        });

        if (ad.rank === activeFilters.length) {
          rankedAds.push(ad);
        }
      }),
    )
    .then(() => rankedAds.sort((prev, next) => next.rank - prev.rank))
    .then(() => rankedAds.slice(0, SIMILAR_ADS_COUNT))
    .then((filteredAds) => filteredAds.length ? renderAds(filteredAds) : alertNotSuchAds());
};

mapForm.addEventListener('change', debounce(renderFilteredAds, DEBOUNCE_TIMEOUT));
