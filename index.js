"use strict";

class ImagesGallery {
  #imagesGalleryWrapper;
  constructor(imagesGalleryWrapper) {
    this.#imagesGalleryWrapper = imagesGalleryWrapper !== null ? imagesGalleryWrapper : document.body.appendChild(document.createElement("div"));
  };

  #renderImageCard = (url) => {
    return `
		<div class="image-wrapper">
			<img class="img" src="${url}">
		</div>
		`;
  };

  #addImageCardsToDOM = (arr) => {
    for (let item of arr) {
      const imageWrapper = document.createElement("div");
      imageWrapper.innerHTML = this.#renderImageCard(item.download_url);
      this.#imagesGalleryWrapper.appendChild(imageWrapper);
    }
  };

  fetchImages = async () => {
    try {
      const response = await fetch(
        "https://picsum.photos/v2/list?page=1&limit=10"
      );
      const img = await response.json();
      this.#addImageCardsToDOM(img);
    } catch (error) {
      throw new Error('Data loading error:', error)
    }
  };
};

(() => {
  const imagesGalleryWrapper = document.querySelector(".images-gallery");

  const imagesGallery = new ImagesGallery(imagesGalleryWrapper);

  imagesGallery.fetchImages();
})();
