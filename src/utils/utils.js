const apiConfig = {
  baseUrl: 'http://localhost:3000/',
  appJSONType: 'application/json'
};

const moviesApiConfig = {
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
};

function isTrue(value) {
  return value === 'true';
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function tokenize(input) {
  const initString = input || '';
  return initString.toLowerCase().replace(/[^a-z0-9_а-я\s]/g, '').split(/\s+/g);
}

/**
 * Modifies object with buildFunc
 * @param {Object} obj
 * @param {Function} buildFunc
 * @returns {Object}
 */
const buildNewObj = (obj, buildFunc) => {
  return Object.fromEntries(
    Object.entries(obj)
    .map(([k,v]) => buildFunc(k,v))
  );
}

/**
 * Transforms cards to form api expects
 * @param {Array} data
 * @returns {Array}
 */
function transformData(data) {
  const imgUrlBase = 'https://api.nomoreparties.co';

  //my api accepts only these
  const cardFields = ['country', 'director', 'duration', 'year', 'description',
    'image', 'trailer', 'thumbnail', 'movieId', 'nameRU', 'nameEN'];

  //my api has it this way
  const renamedFields = {'id': 'movieId', 'trailerLink': 'trailer'};

  //add thumbnail field
  data.map(obj =>
    obj.thumbnail = `${imgUrlBase}${obj.image.formats.thumbnail.url}`);

  //rename keys api way + make image a url string
  //replace null fields with none string to pass my api check
  const changeKV = (key,value) => {
    let newKey = (key in renamedFields) ? renamedFields[key] : key;
    let newValue = (key === 'image') ? `${imgUrlBase}${value.url}` : value;
    newValue = ((newValue === null) || (newValue === '')) ? 'none' : newValue;
    return [newKey, newValue];
  }
  data = data.map(obj => buildNewObj(obj, (key, val) => changeKV(key, val) ));

  //only return fields that my api accepts
  data = data.map(obj => Object.fromEntries(
    cardFields
    .filter(key => key in obj)
    .map(key => [key, obj[key]]))
  );

  return data;
}

/**
 * Initializes savedMoviesFlags object
 * @param {Array} allMovies
 * @param {Array} savedMovies
 * @returns {Object}
 */
function initSaved(allMovies, savedMovies) {
  let result = {};
  if (!isEmpty(allMovies)) {
    result = Object.fromEntries(
      allMovies.map(obj => [obj['movieId'], false])
    );
  }

  if (!isEmpty(allMovies) && !isEmpty(savedMovies)) {
    savedMovies.map(obj => (result[obj.movieId] = obj._id));
  }

  return result;
}

/**
 * Returns savedMovies that still have a value set in savedMoviesFlags table
 * @param {*} savedMovies
 * @param {*} savedMoviesFlags
 * @returns
 */
function syncSavedMovies(savedMovies, savedMoviesFlags) {
  let result = savedMovies || [];
  if (!isEmpty(savedMovies)  && !isEmpty(savedMoviesFlags)) {
    result = savedMovies.filter(movie => savedMoviesFlags[movie.movieId]);
    localStorage.setItem('savedMovies', JSON.stringify(result));
    localStorage.setItem('savedMoviesFlags', JSON.stringify(savedMoviesFlags));
  }
  return result;
}

/**
 * Performs search in movies array based on parameters
 * @param {Array} movies
 * @param {String} searchString
 * @param {Boolean} short
 * @returns {Array}
 */
function filterMovies(movies, searchString, short) {
  const tokens = tokenize(searchString);
  const checker = value =>
    tokens.some(element => value.includes(element));

  return movies.filter(
    obj => ((tokenize(obj.nameRU).filter(checker).length > 0)
     || (tokenize(obj.nameEN).filter(checker).length > 0))
     && (short ? (parseInt(obj.duration) <= 40) : true)
  )
}

/**
 * Prepares movie duration in "_h _m"/"_h"/"_m" format
 * @param {Number} duration
 * @returns {String}
 */
function convertDuration(duration) {
  duration = parseInt(duration);
  const hours = (duration / 60);
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);

  if (rhours && rminutes) {
    return `${rhours}ч ${rminutes}м`;
  } else if (rhours) {
    return `${rhours}ч`;
  } else {
    return `${rminutes}м`;
  }
}

export { apiConfig, moviesApiConfig, isTrue, isEmpty, tokenize, transformData, initSaved, syncSavedMovies, filterMovies, convertDuration };