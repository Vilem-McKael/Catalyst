import sendRequest from './send-request';

const BASE_URL = 'http://127.0.0.1:8000/api/posts'

export function getAllPosts() {
    return sendRequest(`${BASE_URL}/`)
}

export function getOnePost(post_id) {
    console.log(post_id)
    return sendRequest(`${BASE_URL}/${post_id}/`)
}

export function getPostsByCollectiv(collectiv_id) {
    console.log(collectiv_id)
    return sendRequest(`${BASE_URL}/${collectiv_id}/get_posts`)
}

export function getAllPostsByUserId(user_id) {
    console.log(user_id)
    return sendRequest(`${BASE_URL}/users/${user_id}/`)
}

export function createPost(postData) {
    console.log(postData)
    return sendRequest(`${BASE_URL}/`, 'POST', postData)
}

export function editPost(postData) {
    console.log(postData)
    return sendRequest(`${BASE_URL}/${postData.id}/`, 'PUT', postData)
}

export function deletePost(post_id) {
    console.log(post_id)
    return sendRequest(`${BASE_URL}/${post_id}/`, 'DELETE', {})
}
