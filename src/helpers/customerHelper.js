import {BASE_URL} from "./Constant.jsx";

export const getCustomers = async () => {
    const response = await fetch(`${BASE_URL}/customers`);
    if (!response.ok) {
        throw new Error('Problem fetching customers');
    }
    return await response.json();
};

export const createCustomer = async (customerData) => {
    const response = await fetch(`${BASE_URL}/customers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
    });
    if (!response.ok) {
        throw new Error('Problem creating customer');
    }
    return await response.json();
};

export const updateCustomer = async (customerId, customerData) => {
    const response = await fetch(`${BASE_URL}/customers/${customerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
    });
    if (!response.ok) {
        throw new Error('Problem updating customer');
    }
    return await response.json();
};

export const deleteCustomer = async (customerId) => {
    const response = await fetch(`${BASE_URL}/customers/${customerId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Problem deleting customer');
    }
    return await response.json();
};
