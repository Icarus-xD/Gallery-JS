import { createCard } from "./createCard.js";
import { createElem } from "./createElem.js";
import { scrollLoad } from "./scrollLoad.js";

export const renderGallery = (wrapper, photos) => {
    const gallery = createElem('ul', {
        className: 'grid',
    });
    const endElement = createElem('div');

    wrapper.append(gallery);

    const grid = new Masonry(gallery, {
        gutter: 10,
        itemSelector: '.card',
        columnWidth: 200,
        fitWidth: true,
    });

    const cards = photos.map(createCard);

    Promise.all(cards).then(cards => {
        gallery.append(...cards)
        grid.appended(cards);
        wrapper.append(endElement);
        scrollLoad(gallery, grid, endElement);
    });
};