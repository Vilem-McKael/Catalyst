import sendRequest from './send-request';
import sendFormRequest from './send-form-request';

const BASE_URL = import.meta.env.VITE_BASE_URL

const API_URL = BASE_URL + '/api/posts'

export function getAllPosts() {
    return sendRequest(`${API_URL}/`)
}

export function getOnePost(post_id) {
    console.log(post_id)
    return sendRequest(`${API_URL}/${post_id}/`)
}

export function getPostsByCollective(collective_id) {
    console.log(collective_id)
    return sendRequest(`${API_URL}/${collective_id}/get_posts`)
}

export function getAllPostsByUserId(user_id) {
    console.log(user_id)
    return sendRequest(`${API_URL}/users/${user_id}/`)
}

export function createPost(postData) {
    console.log(postData)
    return sendRequest(`${API_URL}/`, 'POST', postData)
}

export function addImage(imgForm, post_id) {
    console.log(imgForm, post_id)
    return sendFormRequest(`${API_URL}/${post_id}/add_image/`, 'POST', imgForm)
}

export function editPost(postData) {
    return sendRequest(`${API_URL}/${postData.id}/`, 'PUT', postData)
}

export function deletePost(post_id) {
    console.log(post_id)
    console.log(typeof(post_id))
    return sendRequest(`${API_URL}/${post_id}/`, 'DELETE', {message: "delete this please!"})
}
