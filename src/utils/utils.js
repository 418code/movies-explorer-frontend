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

function tokenize(input) {
  const initString = input || '';
  return initString.toLowerCase().replace(/[^a-z0-9_а-я\s]/g, '').split(/\s+/g);
}

export { apiConfig, moviesApiConfig, isTrue, tokenize };