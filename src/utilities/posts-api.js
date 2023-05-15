import sendRequest from './send-request';
import sendFormRequest from './send-form-request';

const API_URL = 'https://catalyst-django-api.herokuapp.com/api/posts'

export function getAllPosts() {
    return sendRequest(`${API_URL}/`)
}

export function getOnePost(post_id) {
    return sendRequest(`${API_URL}/${post_id}/`)
}

export function getPostsByCollective(collective_id) {
    return sendRequest(`${API_URL}/${collective_id}/get_posts`)
}

export function getAllPostsByUserId(user_id) {
    return sendRequest(`${API_URL}/users/${user_id}/`)
}

export function createPost(postData) {
    return sendRequest(`${API_URL}/`, 'POST', postData)
}

export function addImage(imgForm, post_id) {
    return sendFormRequest(`${API_URL}/${post_id}/add_image/`, 'POST', imgForm)
}

export function editPost(postData) {
    return sendRequest(`${API_URL}/${postData.id}/`, 'PUT', postData)
}

export function deletePost(post_id) {
    return sendRequest(`${API_URL}/${post_id}/`, 'DELETE', {message: "delete this please!"})
}
