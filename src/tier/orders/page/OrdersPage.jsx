import React, {useState, useEffect} from 'react';
import {
    Button,
    Grid,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Card,
    CardContent,
    Typography,
    CardActions
} from '@mui/material';
import {getOrders, createOrder, updateOrder, deleteOrder} from '../../../helpers/orders.js';
import {TierLayout} from "../../layout/TierLayout.jsx";

export const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderForm, setOrderForm] = useState({
        box_id: '',
        quantity: '',
        order_date: '',
    });

    const fetchOrders = async () => {
        const data = await getOrders();
        setOrders(data);
    };

    const handleDialogOpen = (order = null) => {
        setIsEdit(!!order);
        setSelectedOrder(order);
        setOrderForm({
            box_id: order?.box_id || '',
            quantity: order?.quantity || '',
            order_date: order?.order_date || '',
        });
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setIsEdit(false);
        setSelectedOrder(null);
        setOrderForm({
            box_id: '',
            quantity: '',
            order_date: '',
        });
    };

    const handleFormChange = (event) => {
        setOrderForm({
            ...orderForm,
            [event.target.name]: event.target.value,
        });
    };

    const handleSave = async () => {
        if (isEdit && selectedOrder) {
            await updateOrder(selectedOrder.id, orderForm);
        } else {
            await createOrder(orderForm);
        }
        handleDialogClose();
        await fetchOrders();
    };

    const handleDelete = async (orderId) => {
        await deleteOrder(orderId);
        await fetchOrders();
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <TierLayout>
            <Box sx={{flexGrow: 1, m: 2}}>
                <Box marginBottom={2}>
                    <Button onClick={() => handleDialogOpen()} variant="contained" color="primary">Crear Orden</Button>
                </Box>
                <Dialog open={openDialog} onClose={handleDialogClose}>
                    <DialogTitle>{isEdit ? 'Edit Order' : 'Create New Order'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="box_id"
                            label="Box ID"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={orderForm.box_id}
                            onChange={handleFormChange}
                        />
                        <TextField
                            margin="dense"
                            name="quantity"
                            label="Quantity"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={orderForm.quantity}
                            onChange={handleFormChange}
                        />
                        <TextField
                            margin="dense"
                            name="order_date"
                            label="Order Date"
                            type="date"
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={orderForm.order_date}
                            onChange={handleFormChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
                </Dialog>

                <Grid container spacing={2}>
                    {orders.map((order) => (
                        <Grid item key={order.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Orden ID: {order.id}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        ID de cajas: {order.box_id}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Cantidad: {order.quantity}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Cliente: {order.customer_id}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Fecha de Orden: {order.order_date}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => handleDialogOpen(order)}>Editar</Button>
                                    <Button size="small" onClick={() => handleDelete(order.id)}>Eliminar</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </TierLayout>
    );
};

export default OrdersPage;
