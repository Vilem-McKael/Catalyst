import sendRequest from './send-request';

const API_URL = 'https://catalyst-django-api.herokuapp.com/auth'

export function signUp(userData) {
    return sendRequest(`${API_URL}/signup/`, 'POST', userData)
}

export function login(credentials) {
    return sendRequest(`${API_URL}/login/`, 'POST', credentials)
}

export function createJWT(credentials) {
    return sendRequest(`${API_URL}/jwt/create/`, 'POST', credentials)
}

export function checkToken() {
    return sendRequest(`${API_URL}/check-token`);
}