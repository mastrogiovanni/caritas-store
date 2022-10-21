import { env } from '$env/dynamic/public'

export async function loadUsers() {
    const response = await fetch(env.PUBLIC_API_ENDPOINT + '/user');
    return await response.json();
}

export async function login(username, password) {
    const response = await fetch(env.PUBLIC_API_ENDPOINT + `/user/login/${username}/${password}`);
    return await response.json();
}

export async function newUser({ name, username, password }) {
    const response = await fetch(env.PUBLIC_API_ENDPOINT + '/user', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            name,
            username,
            password
        })
    });
    return response.json();
}

export async function setName(id, name) {
    const response = await fetch(env.PUBLIC_API_ENDPOINT + '/user/' + id, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
            name
        })
    });
    return response.json();
} 

export async function deleteUser(id) {
    const response = await fetch(env.PUBLIC_API_ENDPOINT + '/user/' + id, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
    });
    return response.json();
}

