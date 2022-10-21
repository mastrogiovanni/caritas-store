import { API_ENDPOINT } from "./config";

export async function orderForTenantAndRequest(idTenant, idRequest) {
    const response = await fetch(API_ENDPOINT + `/order/user/${idTenant}/request/${idRequest}`);
    return await response.json();
}

export async function orderForRetailerAndRequest(idRetailer, idRequest) {
    const response = await fetch(API_ENDPOINT + `/order/retailer/${idRetailer}/request/${idRequest}`);
    return await response.json();
}

export async function upsertOrder(idUser, idRequest, idProduct, quantity) {
    const response = await fetch(API_ENDPOINT + "/order", {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
            idUser, 
            idOrderRequest: idRequest, 
            idProduct, 
            quantity
        })
    });
    return response.json();
}