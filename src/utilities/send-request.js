import { getToken } from "./users-service";

export default async function sendRequest(url, method = 'GET', payload = null) {
    
    // what type of HTTP request we are replicating
    const options = { method };

    options.mode = 'cors'

    // if we included a specified payload (most likely for token auth)
    if (payload) {
        options.headers = {
            'Content-Type': 'application/json',
            'Origin': 'localhost:5173/'
         };
        options.body = JSON.stringify(payload);
    }

    const token = getToken();

    if(token) {

        options.headers = options.headers || {}; // change this if this breaks
        // but ternary ftw

        options.headers.Authorization = `Bearer ${token}`;

    }

    const res = await fetch(url, options);

    if (res.ok) return res.json();

    throw new Error('Bad Request');

}