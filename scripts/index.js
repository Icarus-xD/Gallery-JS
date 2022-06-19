import { getData } from "./getData.js";
import { renderGallery } from "./renderGallery.js";
import { renderPhoto } from "./renderPhoto.js";

const init = async ({galleryWrapperSelector, photoWrapperSelector}) => {
    const galleryWrapper = document.querySelector(galleryWrapperSelector);
    const photoWrapper = document.querySelector(photoWrapperSelector)
    
    if (galleryWrapper) {
        const photos = await getData({ count: 30 });
        renderGallery(galleryWrapper, photos);
    }

    if (photoWrapper) {
        const url = new URL(location.href);
        const photoId = url.searchParams.get('photo');

        if (photoId) {
            const photo = await getData({ photoId });
            renderPhoto(photoWrapper, photo)
        }
    }
};

init({
    galleryWrapperSelector: '.gallery__wrapper',
    photoWrapperSelector: '.photo__wrapper',
});