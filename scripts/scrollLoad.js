import { createCard } from "./createCard.js";
import { getData } from "./getData.js";

export const scrollLoad = (gallery, grid, endElement) => {
    const observer = new IntersectionObserver(
        async entries => {
        if (entries[0].isIntersecting) {
            const photos = await getData();
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