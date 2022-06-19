import { API_URL_TOKEN, ACCESS_KEY, 
    SECRET_KEY, REDIRECT_URI} from "./const.js";

export const getToken = (code) => {
    const url = new URL(API_URL_TOKEN);

    url.searchParams.append('client_id', ACCESS_KEY);
    url.searchParams.append('client_secret', SECRET_KEY);
    url.searchParams.append('redirect_uri', REDIRECT_URI);
    url.searchParams.append('code', code);
    url.searchParams.append('grant_type', 'authorization_code');

    return fetch(url, { method: 'POST' })
        .then(response => response.json())
        .then(data => data.access_token);
};