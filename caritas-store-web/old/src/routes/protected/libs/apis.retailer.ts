import { API_ENDPOINT } from "./config";

export async function loadRetailers() {
    const response = await fetch(API_ENDPOINT + '/retailer');
    return await response.json();
}

export async function loadRetailer(id) {
    const response = await fetch(API_ENDPOINT + '/retailer/' + id);
    return await response.json();
}

export async function newRetailer(name) {
    const response = await fetch(API_ENDPOINT + '/retailer', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            name,
        })
    });
    return response.json();
}