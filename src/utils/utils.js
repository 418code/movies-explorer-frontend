const apiConfig = {
  baseUrl: 'http://localhost:3000/',
  appJSONType: 'application/json'
};

function isTrue(value) {
  return value === 'true';
}


export { apiConfig, isTrue };