import {BASE_URL} from "./Constant.jsx";

export const getShipments = async () => {
    const response = await fetch(`${BASE_URL}/shipments`);
    if (!response.ok) {
        throw new Error('Problem fetching shipments');
    }
    return await response.json();
};

export const getShipmentById = async (shipmentId) => {
    const response = await fetch(`${BASE_URL}/shipments/${shipmentId}`);
    if (!response.ok) {
        throw new Error('Problem fetching shipment');
    }
    return await response.json();
};

export const createShipment = async (shipmentData) => {
    const response = await fetch(`${BASE_URL}/shipments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(shipmentData),
    });
    if (!response.ok) {
        throw new Error('Problem creating shipment');
    }
    return await response.json();
};

export const updateShipment = async (shipmentId, shipmentData) => {
    const response = await fetch(`${BASE_URL}/shipments/${shipmentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(shipmentData),
    });
    if (!response.ok) {
        throw new Error('Problem updating shipment');
    }
    return await response.json();
};

export const deleteShipment = async (shipmentId) => {
    const response = await fetch(`${BASE_URL}/shipments/${shipmentId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Problem deleting shipment');
    }
    return await response.json();
};
