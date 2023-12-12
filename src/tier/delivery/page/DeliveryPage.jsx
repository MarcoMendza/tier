import { useState, useEffect } from 'react';
import {
    Card, CardContent, Typography, CardActions, Button, Grid, Box,
    TextField, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import {
    getShipments, createShipment, updateShipment, deleteShipment
} from '../../../helpers/shipmentsHelper';
import {TierLayout} from "../../layout/TierLayout.jsx";


export const DeliveryPage = () => {

    const [shipments, setShipments] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedShipment, setSelectedShipment] = useState(null);
    const [shipmentData, setShipmentData] = useState({
        order_id: '',
        shipment_date: '',
        status: ''
    });

    useEffect(() => {
        fetchShipments();
    }, []);

    const fetchShipments = async () => {
        try {
            const data = await getShipments();
            setShipments(data);
        } catch (error) {
            console.error("Error fetching shipments:", error);
        }
    };

    const handleOpen = (shipment) => {
        setSelectedShipment(shipment);
        setShipmentData(shipment || {
            order_id: '',
            shipment_date: '',
            status: ''
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedShipment(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShipmentData({
            ...shipmentData,
            [name]: value
        });
    };

    const handleSave = async () => {
        if (selectedShipment) {
            await updateShipment(selectedShipment.id, shipmentData);
        } else {
            await createShipment(shipmentData);
        }
        handleClose();
        fetchShipments();
    };

    const handleDelete = async (shipmentId) => {
        await deleteShipment(shipmentId);
        fetchShipments();
    };

    return (
        <TierLayout>
            <Box sx={{ flexGrow: 1, m: 2 }}>
                <Button onClick={() => handleOpen(null)} variant="contained" color="primary" sx={{mb:2}}>
                    Agregar nuevo envio
                </Button>
                <Grid container spacing={2}>
                    {shipments.map((shipment) => (
                        <Grid item key={shipment.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        ID de envio: {shipment.id}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        ID: {shipment.order_id}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Fecha de envio: {shipment.shipment_date}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Status: {shipment.status}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => handleOpen(shipment)}>Editar</Button>
                                    <Button size="small" onClick={() => handleDelete(shipment.id)}>Eliminar</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{selectedShipment ? 'Editar Envio' : 'Nuevo Envio'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="order_id"
                            label="Order ID"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={shipmentData.order_id}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="shipment_date"
                            label="Fecha de envio"
                            type="date"
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={shipmentData.shipment_date}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="status"
                            label="Status"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={shipmentData.status}
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={handleSave}>Guardar</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </TierLayout>
    )
}
