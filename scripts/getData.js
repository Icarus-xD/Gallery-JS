export const getData = () => {
    return fetch('/data.json')
    .then(response => {
        return response.json();
    });
};