const ONE_ITEM = 1;
const TWO_ITEMS = 2;
const FOUR_ITEMS = 4;
const TEN_ITEMS = 10;
const ELEVEN_ITEMS = 11;
const TWENTY_ITEMS = 20;
const DIVIDER_TEN = 10;
const DIVIDER_ONE_HUNDRED = 100;
const FOR_ONE_ITEM = 0;
const FOR_MANY_ITEMS = 1;
const DEFAULT_END = 2;

const pluralizeRus = (number, wordEndForms) => {
  if (number % DIVIDER_TEN === ONE_ITEM && number % DIVIDER_ONE_HUNDRED !== ELEVEN_ITEMS) {
    return wordEndForms[FOR_ONE_ITEM];
  }

  if (number % DIVIDER_TEN >= TWO_ITEMS && number % DIVIDER_TEN <= FOUR_ITEMS && (number % DIVIDER_ONE_HUNDRED < TEN_ITEMS || number % DIVIDER_ONE_HUNDRED >= TWENTY_ITEMS)) {
    return wordEndForms[FOR_MANY_ITEMS];
  }

  return wordEndForms[DEFAULT_END];
};

export {pluralizeRus};
