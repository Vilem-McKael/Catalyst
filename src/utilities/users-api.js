import sendRequest from './send-request';

const BASE_URL = import.meta.env.VITE_BASE_URL

const API_URL = BASE_URL + '/auth'

export function signUp(userData) {
    console.log(userData)
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