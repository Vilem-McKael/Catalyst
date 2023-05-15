import { getToken } from "./users-service";

export default async function sendFormRequest(url, method = 'GET', payload = null) {
    
    // what type of HTTP request we are replicating
    const options = { method };

    options.mode = 'cors'

    // if we included a specified payload (most likely for token auth)
    
    options.body = payload
    

    const token = getToken();

    if(token) {

        options.headers = options.headers || {};

        options.headers.Authorization = `Bearer ${token}`;

    }

    const res = await fetch(url, options);

    if (res.ok) return res.json();

    throw new Error('Bad Request');

}