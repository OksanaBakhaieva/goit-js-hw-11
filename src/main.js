import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './js/refs';
import { fetchImages } from './js/pixayApi';
import { createMarkup } from './js/render-function';

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  const query = refs.input.value.trim();
  showLoader();
  if (!query) {
    createMessage(
      `The search field can't be empty! Please, enter your request!`
    );
    return;
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
  fetchImages(query)
    .then(data => {
      if (data.hits.length === 0) {
        createMessage(
          `Sorry, there are no images matching your search query. Please, try again!`
        );
        hideLoader();
      }

      refs.gallery.innerHTML = createMarkup(data.hits);
      hideLoader();
      const simplyGallery = new SimpleLightbox('.gallery-item a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
      refs.form.reset();
    })
    .catch(error => console.error(error));
 
  function hideLoader() {
    setTimeout(() => {
        refs.loader.classList.add('hidden');
        }, 500);
  };

  function showLoader() {
        refs.loader.classList.remove('hidden');
  };
}) 

