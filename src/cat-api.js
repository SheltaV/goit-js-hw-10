import axios from "axios";

axios.defaults.headers.common["x-api-key"] = 'live_g4xdVT3JQPdOSwPJnekRMueaO56Do7WTVacvOm1COJN509fGsFIZ2jtv91CHRfRu';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
    return axios.get('/breeds')
    .then(resp => {
        if (resp.status !== 200) {
        throw new Error(resp.statusText)
        }
        return resp.data;
    })
}

export function fetchCatByBreed(breedId) {
    return axios.get(`/images/search?breed_ids=${breedId}`)
    .then(resp => {
        if (resp.status !== 200) {
        throw new Error(resp.statusText)
        }
        return resp.data;
    })
}