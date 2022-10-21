import { API_ENDPOINT } from "./config";

export async function setProductEnabled(id, enabled) {
    const response = await fetch(API_ENDPOINT + '/product/' + id + '/enabled/' + enabled, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
    });
    return response.json();
}

export async function loadProducts() {
    const response = await fetch(API_ENDPOINT + '/product');
    return await response.json();
}

export async function deleteProduct(id) {
    const response = await fetch(API_ENDPOINT + '/product/' + id, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
    });
    return response.json();
}

export async function newProduct({ name, description, category, retailer, price, unity, orderType }) {
    const response = await fetch(API_ENDPOINT + '/product', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            name,
            description,
            category,
            idRetailer: retailer,
            price,
            unity,
            orderType
        })
    });
    return response.json();
}