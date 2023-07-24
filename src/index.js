import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

const selector = document.querySelector('.breed-select');
const info = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error')

fetchBreeds()
    .then(data => {
    selector.innerHTML = data.map(({ id, name }) =>
        `<option value="${id}">${name}</option>`).join('')
    })
    .catch(err => console.log(err))
    .finally(() => loader.setAttribute('hidden', true))

selector.addEventListener('change', changeCat);

loader.setAttribute('hidden', true)
error.setAttribute('hidden', true)

function changeCat(event) {
    info.setAttribute('hidden', true)
    loader.removeAttribute('hidden')
    selector.setAttribute('hidden', true)
    fetchCatByBreed(event.target.value)
        .then(data => {
            info.removeAttribute('hidden')
            selector.removeAttribute('hidden')
        let catInformation = data[0].breeds[0];
        const { name, description, temperament} = catInformation;
        info.innerHTML = data.map(({url}) => `<img src="${url}" alt="${name}" width="400" />`).join('')
        info.insertAdjacentHTML('beforeend', 
    `<h2>${name}</h2>
    <h3>${description}</h3>
    <p>${temperament}</p>`)
    })
    .catch(() => Notiflix.Notify.failure(error.textContent))
    .finally(() => loader.setAttribute('hidden', true))
}

