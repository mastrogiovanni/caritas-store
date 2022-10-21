import { API_ENDPOINT } from "./config";

export async function loadRequest(id) {
    const response = await fetch(API_ENDPOINT + '/orderrequest/' + id);
    return await response.json();
}

export async function currentRequest() {
    const response = await fetch(API_ENDPOINT + '/orderrequest');
    return await response.json();
}

export async function allRequests() {
    const response = await fetch(API_ENDPOINT + '/orderrequests');
    return await response.json();
}

export async function newRequest({ from, to, type, notes }) {
    const response = await fetch(API_ENDPOINT + '/orderrequest', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            from,
            to,
            type,
            notes
        })
    });
    return response.json();
}