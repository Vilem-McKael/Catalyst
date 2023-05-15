import * as usersAPI from './users-api'

export async function signUp(userData){

    let credentials
    await usersAPI.signUp(userData)
    .then((res) => {
        delete userData.username
        credentials = userData
    })
    return login(credentials)
}

export async function login(credentials){

    let response
    await usersAPI.login(credentials)
    await usersAPI.createJWT(credentials)
    .then((res) => response = res)
    .then((res) => localStorage.setItem('token', response.access))
    
    return getUser();

}

export async function createJWT(credentials) {
    await usersAPI.createJWT(credentials)
}

export function getToken(){

    const token = localStorage.getItem('token');
    if(!token) return null

    const payload = JSON.parse(atob(token.split('.')[1]));

    // JWT's exp (expiration) property is recorded in seconds, not milliseconds
    if(payload.exp < Date.now() / 1000){ // converts to seconds

        localStorage.removeItem('token');
        return null;

    }
    return token;

}

export function getUser() {

    const token = getToken();
    // If there's a token, return the user_id stored in the payload, otherwise return null
    let response = token ? JSON.parse(atob(token.split('.')[1])).user : null;
    return response;

}

export function logOut() {

    localStorage.removeItem('token');

}

export function checkToken(){

    return usersAPI.checkToken()

    // middleman for our checkToken controller function that converts the token's expiration into a Date object

    .then(dateStr => new Date(dateStr));

}