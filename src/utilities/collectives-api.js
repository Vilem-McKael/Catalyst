import sendRequest from './send-request';
import * as usersService from './users-service';

const BASE_URL = import.meta.env.VITE_BASE_URL

const API_URL = BASE_URL + '/api/collectives'

export function getAllCollectives() {
    return sendRequest(`${API_URL}/`)
}

export function getUserCollectives() {
    const user = usersService.getUser();
    const request = {
        user: user.user_id
    }
    return sendRequest(`${API_URL}/user/`, 'POST', request)
}

export function getCollective(collective_id) {
    return sendRequest(`${API_URL}/${collective_id}/`)
}

export function searchForCollectives(search) {
    return sendRequest(`${API_URL}/search/`, 'POST', search)
}

export function joinCollective(joinData) {
    const user = usersService.getUser();
    joinData.user = user.user_id;
    return sendRequest(`${API_URL}/join/`, 'POST', joinData)
}

export function createCollective(collectiveData) {
    return sendRequest(`${API_URL}/`, 'POST', collectiveData)
}

export function editCollective(collectiveData) {
    return sendRequest(`${API_URL}/${collectiveData.id}/`, 'PUT', collectiveData)
}

export function deleteCollective(collective_id) {
    return sendRequest(`${API_URL}/${collective_id}/`, 'DELETE', {})
}