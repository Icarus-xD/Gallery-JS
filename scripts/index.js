import { getData } from "./getData.js";
import { renderGallery } from "./renderGallery.js";
import { renderPhoto } from "./renderPhoto.js";
import { authorization } from "./authorization.js";
import { likeHandler } from "./likeHandler.js";

const init = async ({
    galleryWrapperSelector, 
    photoWrapperSelector,
    authButtonSelector,    
}) => {
    const galleryWrapper = document.querySelector(galleryWrapperSelector);
    const photoWrapper = document.querySelector(photoWrapperSelector)
    const authButton = document.querySelector(authButtonSelector);

    authorization(authButton);
    
    if (galleryWrapper) {
        const photos = await getData({ count: 30 });
        renderGallery(galleryWrapper, photos);
    }

    if (photoWrapper) {
        const url = new URL(location.href);
        const photoId = url.searchParams.get('photo');

        if (photoId) {
            const photo = await getData({ photoId });
            const photoLike = renderPhoto(photoWrapper, photo);

            photoLike.addEventListener('click', () => {
                if (localStorage.getItem('Bearer')) {
                    likeHandler(photoLike);
                }
            });
        }
    }
};

init({
    galleryWrapperSelector: '.gallery__wrapper',
    photoWrapperSelector: '.photo__wrapper',
    authButtonSelector: '.header__login-button',
});