import sendRequest from './send-request';

const BASE_URL = 'http://127.0.0.1:8000/auth'

export function signUp(userData) {
    console.log(userData)
    return sendRequest(`${BASE_URL}/signup/`, 'POST', userData)
}

export function login(credentials) {
    return sendRequest(`${BASE_URL}/login/`, 'POST', credentials);
}

export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`);
}