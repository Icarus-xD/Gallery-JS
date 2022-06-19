import { createElem } from "./createElem.js";

export const renderPhoto = (wrapper, photoData) => {

    const photo = createElem('img', {
        className: 'photo__picture',
        src: photoData.urls.regular,
        alt: photoData.description || photoData.alt_description,
        style: 'max-height: 80vh;',
    });

    const author = createElem('a', {
        className: 'photo__author',
        href: photoData.user.links.html,
    });

    const authorAvatar = createElem('img', {
        src: photoData.user.profile_image.medium,
        alt: photoData.user.bio,
        title: photoData.user.name,
    });

    const authorName = createElem('span', {
        textContent: photoData.user.username,
    });

    author.append(authorAvatar, authorName);

    const photoControl = createElem('div', {
        className: 'photo__control',
    });

    const likeButton = createElem('button', {
        id: photoData.id,
        className: 'photo__like',
        textContent: photoData.likes,
        likedByUser: photoData.liked_by_user,
    });

    if (!likeButton.likedByUser) {
        likeButton.classList.add('photo__like_o');
    }

    const downloadButton = createElem('a', {
        className: 'photo__download',
        download: true,
        href: photoData.urls.raw,
        target: '_blank',
    });

    photoControl.append(likeButton, downloadButton);

    wrapper.append(photo, author, photoControl);

    return likeButton;
};