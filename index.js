'use strict'
const work = [
  'Write code, create magic.', 
  'Compile your ideas, debug the doubts.', 
  'Coding: where possibilities become reality.', 
  'Ctrl + S: Saving progress, saving dreams.',
   "Solve, code, repeat.", 
   "Coding fuels innovation.", 
   "Program your future with keystrokes.", 
   "Debugging today, coding tomorrow.", 
   "Code with purpose, impact the world.", 
   "Unleash your creativity through code."]

class ImagesGallery {
  constructor(imagesGalleryWrapper, work) {
    this.imagesGalleryWrapper = imagesGalleryWrapper;
    this.work = work;
  }
  renderImageCard = (url, work) => {
    return `
		<div class="image-wrapper">
			<img class="img" src="${url}">
      <h2>${work}</h2>
		</div>
		`;
  };
  addImageCardsToDOM = (arr) => {
    for (let item of arr) {
		const imageWrapper = document.createElement('div');
		imageWrapper.innerHTML = this.renderImageCard(item.download_url, work[item.id]);
		this.imagesGalleryWrapper.appendChild(imageWrapper);
    }
  };
  fetchImages = async () => {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=1&limit=10");
    const img = await response.json();

    this.addImageCardsToDOM(img);
  };
}

const imagesGalleryWrapper = document.querySelector(".images-gallery");

const imagesGallery = new ImagesGallery(imagesGalleryWrapper, work);

imagesGallery.fetchImages();
