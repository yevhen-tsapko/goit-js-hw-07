import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryContainer = document.querySelector(".gallery");
let instance;

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) =>
        `<div class="gallery__item">
     <a class="gallery__link" href="${original}" >
       <img
         class="gallery__image"
         src="${preview}"
         data-source="${original}"
         alt="${description}"
       />
     </a>
   </div>`
    )
    .join("");
}

function onImgClick(evt) {
  evt.preventDefault();
  getImg(evt);
  expandImage(evt);
}
function getImg(evt) {
  if (evt.target.nodeName !== "IMG") return;
  evt.target.src = evt.target.dataset.source;
}
function expandImage(evt) {
  instance = basicLightbox.create(`
  <img
    src="${evt.target.dataset.source}"
    alt="${evt.target.description}"
      />
    `);
  instance.show();
  window.addEventListener("keydown", onEscapeClick);
}
function onEscapeClick(evt) {
  if (evt.code === "Escape") {
    instance.close();
  }
}

galleryContainer.insertAdjacentHTML(
  "afterbegin",
  createGalleryMarkup(galleryItems)
);

galleryContainer.addEventListener("click", onImgClick);
