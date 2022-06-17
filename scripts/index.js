import { getData } from "./getData.js";
import { renderGallery } from "./renderGallery.js";
import { renderPhoto } from "./renderPhoto.js";

const init = async ({galleryWrapperSelector, photoWrapperSelector}) => {
    const galleryWrapper = document.querySelector(galleryWrapperSelector);
    const photoWrapper = document.querySelector(photoWrapperSelector)
    
    if (galleryWrapper) {
        const photos = await getData();
        renderGallery(galleryWrapper, photos);
    }
    if (photoWrapper) {
        const url = new URL(location.href);
        const photos = await getData();
        const photo = photos.find(photo => photo.id === url.searchParams.get('photo'));
        renderPhoto(photoWrapper, photo)
    }
};

init({
    galleryWrapperSelector: '.gallery__wrapper',
    photoWrapperSelector: '.photo__wrapper',
});