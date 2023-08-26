"use strict";

class ImagesGallery {
  #imagesGalleryWrapper;
  constructor(imagesGalleryWrapper) {
    if (!(imagesGalleryWrapper instanceof Element)) {
      throw new Error('imagesGalleryWrapper must be a DOM element')
    }
    this.#imagesGalleryWrapper = imagesGalleryWrapper
    this.pageNumber = 1;
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

  fetchImages = async () => {
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${this.pageNumber}&limit=10`);
      this.pageNumber++;
      const img = await response.json();
      this.#addImageCardsToDOM(img);
    } catch (error) {
      throw new Error("Data loading error:", error);
    }
  };

}

(() => {
  const imagesGalleryWrapper = document.querySelector(".images-gallery");
  const loadingControl = document.querySelector(".lds-roller");
  
  const imagesGallery = new ImagesGallery(imagesGalleryWrapper);

  imagesGallery.fetchImages();

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        imagesGallery.fetchImages()
        if(imagesGallery.pageNumber === 10) {
          observer.disconnect(loadingControl)
          loadingControl.classList.add('hide')
        }
      }
    });
  }, {threshold: 1});

  observer.observe(loadingControl);  

})();
