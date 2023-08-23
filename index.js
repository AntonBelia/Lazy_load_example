"use strict";

class ImagesGallery {
  #imagesGalleryWrapper;
  #numberPage = 1;
  constructor(imagesGalleryWrapper) {
    this.#imagesGalleryWrapper = imagesGalleryWrapper !== null ? imagesGalleryWrapper : document.body.appendChild(document.createElement("div"));
  };

  #createObserver = () => {
    const allImages = document.querySelectorAll('.images-gallery');
    const lastChild = document.querySelector('.images-gallery:last-chald');

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry)=>{
        if (entry === lastChild) {
          this.fetchImages();
        }
      })

    }, {threshold: 0.8})

    observer.observe(allImages)
  }

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
      this.#createObserver();
    }
  };

  fetchImages = async () => {
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${this.#numberPage}&limit=10`
      );
      const img = await response.json();
      this.#addImageCardsToDOM(img);
      this.#numberPage++
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
