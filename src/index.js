import { FetchSome } from './cat-api.js';
import SlimSelect from 'slim-select';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import 'slim-select/dist/slimselect.css';
Loading.standard();
const selectRef = document.querySelector('.breed-select');
const descriptionContainerRef = document.querySelector('.cat-info');
const loaderRef = document.querySelector('.loader');
const errorRef = document.querySelector('.error');

const fetchSome = new FetchSome();
fetchSome
  .fetchElement(`/breeds`)
  .then(addBreedsOnList)
  .catch(eror => {
    console.log(eror);
    errorRef.classList.remove('visually-hidden');
    showErorModal();
  })
  .finally(() => {
    loaderRef.classList.add('visually-hidden');
    Loading.remove();
  });
function addBreedsOnList(breeds) {
  selectRef.classList.remove('visually-hidden');
  const allBreeds = breeds
    .map(dreed => `<option value="${dreed.id}">${dreed.name}</option>`)
    .join('');
  selectRef.insertAdjacentHTML('beforeend', allBreeds);
  selectRef.style.display = '';
  const newSelect = new SlimSelect({
    select: '#single',
  });
}

selectRef.addEventListener('change', selectedBreed);
function selectedBreed(event) {
  Loading.standard();
  loaderRef.classList.remove('visually-hidden');
  descriptionContainerRef.innerHTML = '';
  fetchSome
    .fetchElement('/images/search', { breed_ids: event.target.value })
    .then(marcupBreedDescription)
    .catch(eror => {
      console.log(eror);
      errorRef.classList.remove('visually-hidden');
      showErorModal();
    })
    .finally(() => {
      loaderRef.classList.add('visually-hidden');
    });
}

function marcupBreedDescription(breed) {
  const breedDescriptionHTML = breed
    .map(elem => {
      const { name, description, temperament } = elem.breeds[0];
      return `<div class="picture-container">
      <img class="breed-picture"
     src="${elem.url}"
     alt="${name}"
     width="800" height="500"
     >
     </div>
     <div class="description-container">
     <h1>${name}</h1>
     <p>${description}</p>
     <p><span class="text-selection">Temperament: </span>${temperament}</p>
     </div>`;
    })
    .join('');
  Loading.remove();
  descriptionContainerRef.insertAdjacentHTML('beforeend', breedDescriptionHTML);
}
function showErorModal() {
  Report.failure(
    'Oops!',
    'Something went wrong! Try reloading the page!',
    'Ok'
  );
}
// =======
