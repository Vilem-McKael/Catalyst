import sendRequest from './send-request';

const BASE_URL = 'http://127.0.0.1:8000/api/collectivs'

export function getAllCollectivs() {
    return sendRequest(`${BASE_URL}/`)
}

export function getCollectiv(collectiv_id) {
    return sendRequest(`${BASE_URL}/${collectiv_id}/`)
}

export function createCollectiv(collectivData) {
    return sendRequest(`${BASE_URL}/`, 'POST', collectivData)
}

export function editCollectiv(collectivData) {
    return sendRequest(`${BASE_URL}/${collectivData.id}/`, 'PUT', collectivData)
}

export function deleteCollectiv(collectiv_id) {
    return sendRequest(`${BASE_URL}/${collectiv_id}/`, 'DELETE', {})
}