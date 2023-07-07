import axios from 'axios';

export class FetchSome {
  BASE_OPTION = {
    baseURL: 'https://api.thecatapi.com/v1',
    headers: {
      'x-api-key':
        'live_TZ9Ol7Xnevh3daggocqFeajdqpkpAHAYdPbB5Dc26rVCdlYYBMDbBGbMPzlnobih',
    },
  };

  constructor() {}

  fetchElement(url, params) {
    const optionObject = JSON.parse(JSON.stringify(this.BASE_OPTION));
    if (params) {
      optionObject.params = params;
    }
    return axios.get(`${url}`, optionObject).then(({ data }) => {
      return data;
    });
  }
}

// export function fetchBreeds() {
//   return axios
//     .get(`/breeds`, {
//       baseURL: 'https://api.thecatapi.com/v1',
//       headers: {
//         'x-api-key':
//           'live_TZ9Ol7Xnevh3daggocqFeajdqpkpAHAYdPbB5Dc26rVCdlYYBMDbBGbMPzlnobih',
//       },
//     })
//     .then(({ data }) => {
//       return data;
//     });
// }
// export function fetchBreedDescription(breedId) {
//   return axios
//     .get(`/images/search`, {
//       baseURL: 'https://api.thecatapi.com/v1',
//       headers: {
//         'x-api-key':
//           'live_TZ9Ol7Xnevh3daggocqFeajdqpkpAHAYdPbB5Dc26rVCdlYYBMDbBGbMPzlnobih',
//       },
//       params: {
//         breed_ids: breedId,
//       },
//     })
//     .then(({ data }) => {
//       return data;
//     });
// }
