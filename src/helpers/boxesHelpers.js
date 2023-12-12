import {BASE_URL} from "./Constant.jsx";


export const getBoxes = async () => {
    const response = await fetch(`${BASE_URL}/boxes`);
    if (!response.ok) {
        throw new Error('Problem fetching boxes');
    }
    return await response.json();
};

export const getBoxById = async (boxId) => {
    const response = await fetch(`${BASE_URL}/boxes/${boxId}`);
    if (!response.ok) {
        throw new Error(`Problem fetching box with id ${boxId}`);
    }
    return await response.json();
};

export const createBox = async (boxData) => {
    const response = await fetch(`${BASE_URL}/boxes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(boxData),
    });
    if (!response.ok) {
        throw new Error('Problem creating box');
    }
    return await response.json();
};

export const updateBox = async (boxId, boxData) => {
    const response = await fetch(`${BASE_URL}/boxes/${boxId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(boxData),
    });
    if (!response.ok) {
        throw new Error('Problem updating box');
    }
    return await response.json();
};

export const deleteBox = async (boxId) => {
    const response = await fetch(`${BASE_URL}/boxes/${boxId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Problem deleting box');
    }
    return await response.json();
};
