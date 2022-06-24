import { apiConfig } from './utils';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authHeaders = {};
    Object.assign(this._authHeaders, this._headers);
    this._authHeaders.Authorization = 'Bearer ';
  }

  /**
   * Sends a network request with given parameters
   * @param {String} path - the last part of full url
   * @param {String} method - 'GET || 'POST' || 'PATCH' || 'PUT' || 'DELETE'
   * @param {String} body - is added with some methods
   * @returns {Promise}
   */
  _fetchPath(path, method, body = {}) {
    const fetchObject = {
      method: method,
      headers: this._headers,
    }
    if (method === 'POST' || method === 'PATCH')
      fetchObject['body'] = JSON.stringify(body);
    return fetch(`${this._baseUrl}${path}`, fetchObject)
    .then(res => {
      if (res.ok)
        return res.json();
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  /**
   * Creates a new user on the server
   * @param {Object} object - {email, password}
   * @returns {Promise}
   */
  register( {name, email, password} ) {
    return this._fetchPath('signup', 'POST', {name: name, email: email, password: password}, false);
  }
}

//prepare api objects for use

const api = new Api({
  baseUrl: apiConfig.baseUrl,
  headers: {
    'Content-Type': apiConfig.appJSONType
  }
});

export { api };
