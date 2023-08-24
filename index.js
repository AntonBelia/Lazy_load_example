"use strict";

class ImagesGallery {
  #imagesGalleryWrapper;
  #pageNumber = 1;
  constructor(imagesGalleryWrapper) {
    this.#imagesGalleryWrapper =
      imagesGalleryWrapper !== null
        ? imagesGalleryWrapper
        : document.body.appendChild(document.createElement("div"));
  }

  #initializeObserver = () => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.initialize();
        }
      });
    }, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });
    observer.observe(this.#imagesGalleryWrapper);
  };

  #renderImageCard = (url) => {
    return `
			<img class="img" src="${url}" alt="Image" loading="lazy">
		`;
  };

  #addImageCardsToDOM = (arr) => {
    for (let item of arr) {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("image-wrapper");
      imageWrapper.innerHTML = this.#renderImageCard(item.download_url);
      this.#imagesGalleryWrapper.appendChild(imageWrapper);
    }

  };

  #fetchImages = async () => {
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${this.#pageNumber}&limit=10`
      );
      this.#pageNumber++;
      const img = await response.json();
      this.#addImageCardsToDOM(img);
    } catch (error) {
      throw new Error("Data loading error:", error);
    }
  };
  initialize = () => {
    this.#fetchImages();
    this.#initializeObserver();
  }

}

(() => {
  const imagesGalleryWrapper = document.querySelector(".images-gallery");

  const imagesGallery = new ImagesGallery(imagesGalleryWrapper);

  imagesGallery.initialize();
})();
