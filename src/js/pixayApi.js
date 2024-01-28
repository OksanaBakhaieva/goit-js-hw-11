const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41991385-9b19b8bb3d6f1491499417d17';

export function fetchImages(query) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;
  
    return fetch(url).then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    });
}