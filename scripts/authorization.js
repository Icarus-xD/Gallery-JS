import { getToken } from "./getToken.js";
import { getUserData } from "./getUserData.js";
import { ACCESS_KEY, API_URL_AUTH, REDIRECT_URI, 
    RESPONSE_TYPE, SCOPE } from "./const.js";


const checkLogin = async () => {
    const url = new URL(location.href);
    const code = url.searchParams.get('code');
    
    if (code) {
        const token = await getToken(code);
        
        localStorage.setItem('Bearer', token);

        const url = new URL(location);
        url.searchParams.delete('code');
        history.pushState(null, document.title, url);

        return true;
    } else if (localStorage.getItem('Bearer')) {
        return true;
    }

    return false;
};

const login = () => {
    const url = new URL(API_URL_AUTH);

    url.searchParams.append('client_id', ACCESS_KEY);
    url.searchParams.append('redirect_uri', REDIRECT_URI);
    url.searchParams.append('response_type', RESPONSE_TYPE);
    url.searchParams.append('scope', SCOPE);

    location.href = url;
    button.addEventListener('click', login);
};

const logout = (event) => {
    const button = event.target;

    if (confirm('Are you sure about that?')) {
        localStorage.removeItem('Bearer');
        button.textContent = '';
        button.style.backgroundImage = '';
        button.removeEventListener('click', logout);
    }
};

export const authorization = async (button) => {
    if (await checkLogin()) {
        const userData = await getUserData();

        button.textContent = userData.username;
        button.style.backgroundImage = `url(${userData.profile_image.medium})`;

        button.addEventListener('click', logout);
    } else {
        button.addEventListener('click', login);
    }
};