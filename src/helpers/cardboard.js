import {BASE_URL} from "./Constant.jsx";

export const getCardboards = async () => {
    const response = await fetch(`${BASE_URL}/cardboard`);
    if (!response.ok) {
        throw new Error('Problem fetching cardboards');
    }
    return await response.json();
};

export const getCardboardById = async (cardboardId) => {
    const response = await fetch(`${BASE_URL}/cardboard/${cardboardId}`);
    if (!response.ok) {
        throw new Error(`Problem fetching cardboard with id ${cardboardId}`);
    }
    return await response.json();
};

export const createCardboard = async (cardboardData) => {
    const response = await fetch(`${BASE_URL}/cardboard`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardboardData),
    });
    if (!response.ok) {
        throw new Error('Problem creating cardboard');
    }
    return await response.json();
};

export const updateCardboard = async (cardboardId, cardboardData) => {
    const response = await fetch(`${BASE_URL}/cardboard/${cardboardId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardboardData),
    });
    if (!response.ok) {
        throw new Error('Problem updating cardboard');
    }
    return await response.json();
};

export const deleteCardboard = async (cardboardId) => {
    const response = await fetch(`${BASE_URL}/cardboard/${cardboardId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Problem deleting cardboard');
    }
    return await response.json();
};
