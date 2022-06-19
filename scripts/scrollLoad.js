import { createCard } from "./createCard.js";
import { getData } from "./getData.js";

export const scrollLoad = (gallery, grid, endElement) => {
    let pageNumber = 1;
    const observer = new IntersectionObserver(
        async entries => {
        if (entries[0].isIntersecting) {
            const photos = await getData({
                page: ++pageNumber,
                count: 30,
            });
            const cards = photos.map(createCard);

            Promise.all(cards).then(cards => {
                gallery.append(...cards)
                grid.appended(cards);
            });
        }
    }, 
    {
        rootMargin: '250px',
    }
    );

    observer.observe(endElement);
};