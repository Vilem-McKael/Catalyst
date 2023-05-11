import sendRequest from './send-request';
import * as usersService from './users-service';

const BASE_URL = 'https://catalyst-django-api.herokuapp.com/api/collectivs'

export function getAllCollectivs() {
    return sendRequest(`${BASE_URL}/`)
}

export function getUserCollectivs() {
    const user = usersService.getUser();
    const request = {
        user: user.user_id
    }
    return sendRequest(`${BASE_URL}/user/`, 'POST', request)
}

export function getCollectiv(collectiv_id) {
    return sendRequest(`${BASE_URL}/${collectiv_id}/`)
}

export function searchForCollectivs(search) {
    return sendRequest(`${BASE_URL}/search/`, 'POST', search)
}

export function joinCollectiv(joinData) {
    const user = usersService.getUser();
    joinData.user = user.user_id;
    return sendRequest(`${BASE_URL}/join/`, 'POST', joinData)
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