// import 'slim-select/dist/slimselect.css';
import { FetchSome } from './cat-api.js';
import SlimSelect from 'slim-select';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const selectRef = document.querySelector('.breed-select');
const descriptionContainerRef = document.querySelector('.cat-info');
const loaderRef = document.querySelector('.loader');
const errorRef = document.querySelector('.error');

const fetchSome = new FetchSome();

Loading.standard();
fetchSome
  .fetchElement(`/breeds`)
  .then(addBreedsOnList)
  .catch(cbForCatch)
  .finally(cbForFinally);

function addBreedsOnList(breeds) {
  const allBreeds = breeds.map(cbForSelectHTML).join('');
  selectRef.insertAdjacentHTML('beforeend', allBreeds);

  selectRef.classList.remove('visually-hidden');
  new SlimSelect({
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
    .catch(cbForCatch)
    .finally(cbForFinally);
}

function marcupBreedDescription(breed) {
  const breedDescriptionHTML = breed.map(cbForBreedDescriptionHTML).join('');
  descriptionContainerRef.insertAdjacentHTML('beforeend', breedDescriptionHTML);
  Loading.remove();
}
function showErorModal() {
  Report.failure(
    'Oops!',
    'Something went wrong! Try reloading the page!',
    'Ok'
  );
}
// ==========================================================
function cbForSelectHTML(dreed) {
  return `<option value="${dreed.id}">${dreed.name}</option>`;
}
function cbForBreedDescriptionHTML(elem) {
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
}
function cbForCatch(eror) {
  selectRef.classList.add('visually-hidden');
  console.log(eror);
  errorRef.classList.remove('visually-hidden');
  showErorModal();
}
function cbForFinally() {
  loaderRef.classList.add('visually-hidden');
  Loading.remove();
}
