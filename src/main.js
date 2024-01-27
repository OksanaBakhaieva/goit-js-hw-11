import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41991385-9b19b8bb3d6f1491499417d17';

const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('.input'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  searchBtn: document.querySelector('.button'),
};

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  const query = refs.input.value.trim();
  
  if (!query) {
    createMessage(
      `The search field can't be empty! Please, enter your request!`
    );
    return;
  }

  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;
  function fetchImages(url) {
    showLoader(true);
    return fetch(url).then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    });
  }
  
  fetchImages(url)
    .then(data => {
      if (data.hits.length === 0) {
        createMessage(
          `Sorry, there are no images matching your search query. Please, try again!`
        );
        showLoader(false);
      }

      refs.gallery.innerHTML = createMarkup(data.hits);
      showLoader(false);
      const simplyGallery = new SimpleLightbox('.gallery-item a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
      refs.form.reset();
    })
    .catch(error => console.error(error));
    
 

  function createMarkup(hits) {
    return hits
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) =>
          `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
          <img
            class="gallery-image"
            src="${webformatURL}"
            alt="${tags}"
          />
            <p class="gallery-descr">Likes: <span class="descr-span">${likes}</span> Views: <span class="descr-span">${views}</span> Comments: <span class="descr-span">${comments}</span> Downloads: <span class="descr-span">${downloads}</span></p>
          </a>
        </li>`
      )
      .join('');
  }

  function createMessage(message) {
    iziToast.show({
      class: 'error-svg',
      position: 'topRight',
      icon: 'error-svg',
      message: message,
      maxWidth: '432',
      messageColor: '#fff',
      messageSize: '16px',
      backgroundColor: '#EF4040',
      close: false,
      closeOnClick: true,
    });
  }
  function showLoader(isLoading) {
  if (isLoading) {
    refs.loader.classList.remove('hidden');
  } else {
    refs.loader.classList.add('hidden');
  }
}
  function hideLoader() {
    setTimeout(() => {
      refs.loader.classList.add('hidden');
    }, 250);
  }

  function showLoader() {
    refs.loader.classList.remove('hidden');
  }
})


