import { moviesApiConfig } from './utils';

export default function moviesApi() {
  return fetch(moviesApiConfig.baseUrl)
    .then(res => res.json());
}
