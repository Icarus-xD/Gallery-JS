import { createElem } from "./createElem.js";

export const createCard = data => {
    const card = createElem('li', {
        className: 'card',
    });
    
    const cardItem = createElem('a', {
        id: data.id,
        className: 'grid-item',
        href: `page.html?photo=${data.id}`,
    });

    const photo = new Image();
    photo.width = '200';
    photo.src = data.urls.small;
    photo.alt = data.alt_description;

    const author = createElem('a', {
        className: 'card__author',
        href: data.user.links.html,
    });

    const authorAvatar = new Image();
    authorAvatar.className = 'author__photo';
    authorAvatar.src = data.user.profile_image.medium;
    authorAvatar.width = '32';
    authorAvatar.height = '32';
    authorAvatar.alt = data.user.bio;
    authorAvatar.title = data.user.username;

    author.append(authorAvatar);

    const likeButton = createElem('button', {
        className: 'card__photo-like',
        textContent: data.likes,
    });

    const downloadLink = document.createElement('a', {
        className: 'card__download',
        href: data.links.download,
        download: true,
        target: '_blank',
    });

    cardItem.append(photo, author, likeButton, downloadLink);
    card.append(cardItem);

    return card;
};