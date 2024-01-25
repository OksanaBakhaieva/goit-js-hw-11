import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.querySelector('.form');
//     const imageList = document.querySelector('.gallery');
//     const loader = document.createElement('div');

//     const gallery = new SimpleLightbox('.gallery a', {
//         captionsData: 'alt',
//         captionDelay: 500,
//     });

//     form.addEventListener('submit', handleSearch);

//     function handleSearch(event) {
//         event.preventDefault();
//         const searchInput = form.elements.input.value;
//         imageList.innerHTML = '';
//         if (!searchInput.trim()) {
//             iziToast.warning({
//             title: 'Warning',
//             message: 'Please enter a search query',
//             messageSize: '20px',
//             messageColor: '#808080',
//             backgroundColor: '#e7fc44',
//             position: 'topLeft',
//             timeout: 3000,
//             });
//         return;
//         }

//         showLoader();

//         fetchImages(searchInput)
//             .then(data => {
//                 if (data.cards.length === 0) {
//                     iziToast.show({
//                         message:
//                             'Sorry, there are no images matching your search query. Please try again!',
//                         messageSize: '16px',
//                         messageColor: 'white',
//                         backgroundColor: '#EF4040',
//                         position: 'topRight',
//                         timeout: 5000,
//                     });
//                 }
//                 imageList.innerHTML = createMarkup(data.cards);
//                 gallery.refresh();
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//                 iziToast.error({
//                     title: 'Error',
//                     message: 'An error occurred while fetching data. Please try again!',
//                 });
//             })
//             .finally(() => {
//                 hideLoader();
//                 form.reset();
//             });
//     }

//     function fetchImages(value) {
//         const BASE_URL = 'https://pixabay.com/api/';
//         const API_KEY = '41991385-9b19b8bb3d6f1491499417d17';
                
//         return fetch(`${BASE_URL}?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true`)
//       .then((resp) => {
//         if (!resp.ok) {
//             throw new Error(resp.status);
//         }
//             return resp.json();
//         });
//     }

//     function createCardsMarkup(cards) {
//         return cards
//         .map(
//             ({
//                 webformatURL,
//                 largeImageURL,
//                 tags,
//                 likes,
//                 views,
//                 comments,
//                 downloads,
//             }) =>
//             `<li class="gallery-item">
//                 <a class="gallery-link" href="${largeImageURL}">
//                     <img class="gallery-image" src="${webformatURL}" alt="${tags}">
//                     <ul class="gallery-item-description">
//                         <li>Likes: ${likes}</li>
//                         <li>Views: ${views}</li>
//                         <li>Downloads: ${downloads}</li>
//                         <li>Comments: ${comments}</li>
//                     </ul>
//                 </a>
//             </li>`
//         )
//         .join('');
//     }
 
//     function hideLoader() {
//     setTimeout(() => {
//         loader.classList.add('hidden');
//         }, 1000);
//     }

//     function showLoader() {
//         loader.classList.remove('hidden');
//     }
// });

const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('.input'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  searchBtn: document.querySelector('.button'),
};

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41991385-9b19b8bb3d6f1491499417d17';

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  const query = refs.form.query.value.trim();

  if (!query) {
    createMessage(
      `The search field can't be empty! Please, enter your request!`
    );
    return;
  }
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

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
});

function fetchImages(url) {
  showLoader(true);
  return fetch(url).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.ststusText);
    }
    return resp.json();
  });
}

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

function showLoader(state = true) {
  refs.loader.style.display = !state ? 'none' : 'inline-block';
  refs.searchBtn.disabled = state;
}