import {BASE_URL} from "./Constant.jsx";

export const getOrders = async () => {
    const response = await fetch(`${BASE_URL}/orders`);
    if (!response.ok) {
        throw new Error('Problem fetching orders');
    }
    return await response.json();
};

export const getOrderById = async (orderId) => {
    const response = await fetch(`${BASE_URL}/orders/${orderId}`);
    if (!response.ok) {
        throw new Error(`Problem fetching order with id ${orderId}`);
    }
    return await response.json();
};

export const createOrder = async (orderData) => {
    const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });
    if (!response.ok) {
        throw new Error('Problem creating order');
    }
    return await response.json();
};

export const updateOrder = async (orderId, orderData) => {
    const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });
    if (!response.ok) {
        throw new Error('Problem updating order');
    }
    return await response.json();
};

export const deleteOrder = async (orderId) => {
    const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Problem deleting order');
    }
    return await response.json(); // or return true if the API does not send back a body
};
