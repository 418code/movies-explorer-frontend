import { apiConfig } from "./utils";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authHeaders = {};
    Object.assign(this._authHeaders, this._headers);
    this._authHeaders.Authorization = "Bearer ";
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
      credentials: "include",
    };
    if (method === "POST" || method === "PATCH")
      fetchObject["body"] = JSON.stringify(body);
    return fetch(`${this._baseUrl}${path}`, fetchObject).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  /**
   * Creates a new user on the server
   * @param {Object} object - {email, password}
   * @returns {Promise}
   */
  register({ name, email, password }) {
    return this._fetchPath("signup", "POST", {
      name: name,
      email: email,
      password: password,
    });
  }

  /**
   * Signs in the user to the server
   * @param {Object} object - {email, password}
   * @returns {Promise}
   */
  signIn({ email, password }) {
    return this._fetchPath("signin", "POST", {
      email: email,
      password: password,
    });
  }

  /**
   * Clears httponly cookie
   * @returns {Promise}
   */
  signOut() {
    return this._fetchPath("signout", "POST");
  }

  /**
   * Gets user profile information
   * @returns {Promise}
   */
  getUserInfo() {
    return this._fetchPath("users/me", "GET");
  }

  /**
   * Sets user profile information
   * @param {Object} currentUser
   * @returns {Promise}
   */
  setUserInfo(currentUser) {
    return this._fetchPath("users/me", "PATCH", currentUser);
  }

  /**
   * Get all saved movies
   * @returns {Promise}
   */
  loadSavedMovies() {
    return this._fetchPath("movies", "GET");
  }

  /**
   * Saves a card
   * @param {Object} card
   * @returns {Promise}
   */
  saveCard(card) {
    return this._fetchPath("movies", "POST", card);
  }

  /**
   * Deletes a card
   * @param {String} id
   * @returns {Promise}
   */
  deleteCard(id) {
    return this._fetchPath(`movies/${id}`, "DELETE");
  }
}

//prepare api objects for use

const api = new Api({
  baseUrl: apiConfig.baseUrl,
  headers: {
    "Content-Type": apiConfig.appJSONType,
  },
});

export { api };
