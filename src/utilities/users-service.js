import * as usersAPI from './users-api'

export async function signUp(userData){

    console.log(userData)
    let credentials
    await usersAPI.signUp(userData)
    .then((res) => {
        console.log(res)
        delete userData.username
        credentials = userData
    })
    return login(credentials)
}

export async function login(credentials){

    console.log(credentials)
    let response
    await usersAPI.login(credentials)
    .then((res) => console.log('login response: ', res))
    await usersAPI.createJWT(credentials)
    .then((res) => response = res)
    .then((res) => localStorage.setItem('token', response.access))
    .then((res) => console.log('token response: ', response))
    
    
    return getUser();

}

export async function createJWT(credentials) {
    console.log(credentials)
    let response
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
    console.log(token)
    let response = token ? JSON.parse(atob(token.split('.')[1])).user : null;
    console.log(response)
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