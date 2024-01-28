import{i as c,S as u}from"./assets/vendor-5b791d57.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const e of r)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(r){const e={};return r.integrity&&(e.integrity=r.integrity),r.referrerPolicy&&(e.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?e.credentials="include":r.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(r){if(r.ep)return;r.ep=!0;const e=s(r);fetch(r.href,e)}})();const n={form:document.querySelector(".form"),input:document.querySelector(".input"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),searchBtn:document.querySelector(".button")},f="https://pixabay.com/api/",d="41991385-9b19b8bb3d6f1491499417d17";function m(i){const t=`${f}?key=${d}&q=${i}&image_type=photo&orientation=horizontal&safesearch=true`;return fetch(t).then(s=>{if(!s.ok)throw new Error(s.statusText);return s.json()})}function p(i){return i.map(({webformatURL:t,largeImageURL:s,tags:o,likes:r,views:e,comments:a,downloads:l})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${s}">
            <img
              class="gallery-image"
              src="${t}"
              alt="${o}"
            />
            <ul class="gallery-info">
              <li class="gallery-info-item">Likes: <span class="descr-span">${r}</span></li>
              <li class="gallery-info-item">Views: <span class="descr-span">${e}</span></li>
              <li class="gallery-info-item">Comments: <span class="descr-span">${a}</span></li>
              <li class="gallery-info-item">Downloads: <span class="descr-span">${l}</span></li>
            </ul> 
          </a>
        </li>`).join("")}n.form.addEventListener("submit",i=>{i.preventDefault();const t=n.input.value.trim();if(r(),!t){s("The search field can't be empty! Please, enter your request!");return}function s(e){c.show({class:"error-svg",position:"topRight",icon:"error-svg",message:e,maxWidth:"432",messageColor:"#fff",messageSize:"16px",backgroundColor:"#EF4040",close:!1,closeOnClick:!0})}m(t).then(e=>{e.hits.length===0&&(s("Sorry, there are no images matching your search query. Please, try again!"),o()),n.gallery.innerHTML=p(e.hits),o(),new u(".gallery-item a",{captionsData:"alt",captionDelay:250}),n.form.reset()}).catch(e=>console.error(e));function o(){setTimeout(()=>{n.loader.classList.add("hidden")},500)}function r(){n.loader.classList.remove("hidden")}});
//# sourceMappingURL=commonHelpers.js.map
