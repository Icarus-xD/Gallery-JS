import { API_URL_PHOTOS } from "./const.js";

export const likeHandler = button =>  {
    const url = new URL(`${API_URL_PHOTOS}/${button.id}/like`);

    const toggleLike = data => {
        console.log('data: ', data);
        button.classList.toggle('photo__like_o');

        button.likedByUser = data.photo.liked_by_user;
        button.textContent = data.photo.likes;
    };

    fetch(url, {
        method: button.likedByUser ? 'DELETE' : 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('Bearer')}` 
        }
    })
    .then(response => response.json())
    .then(toggleLike);
};