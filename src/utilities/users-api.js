import sendRequest from './send-request';

const BASE_URL = 'https://catalyst-django-api.herokuapp.com/auth'

export function signUp(userData) {
    console.log(userData)
    return sendRequest(`${BASE_URL}/signup/`, 'POST', userData)
}

export function login(credentials) {
    return sendRequest(`${BASE_URL}/login/`, 'POST', credentials)
}

export function createJWT(credentials) {
    return sendRequest(`${BASE_URL}/jwt/create/`, 'POST', credentials)
}

export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`);
}