import {useState, useEffect} from 'react';
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
import {getCustomers, createCustomer, updateCustomer, deleteCustomer} from '../../../helpers/customerHelper.js';
import {TierLayout} from "../../layout/TierLayout.jsx";

export const CustomersPage = () => {
    const [customers, setCustomers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customerForm, setCustomerForm] = useState({
        name: '',
        address: ''
    });

    const fetchCustomers = async () => {
        const data = await getCustomers();
        setCustomers(data);
    };

    const handleDialogOpen = (customer = null) => {
        setIsEdit(!!customer);
        setSelectedCustomer(customer);
        setCustomerForm({
            name: customer?.name || '',
            address: customer?.address || ''
        });
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setIsEdit(false);
        setSelectedCustomer(null);
        setCustomerForm({
            name: '',
            address: ''
        });
    };

    const handleFormChange = (event) => {
        setCustomerForm({
            ...customerForm,
            [event.target.name]: event.target.value,
        });
    };

    const handleSave = async () => {
        if (isEdit && selectedCustomer) {
            await updateCustomer(selectedCustomer.id, customerForm);
        } else {
            await createCustomer(customerForm);
        }
        handleDialogClose();
        await fetchCustomers();
    };

    const handleDelete = async (customerId) => {
        await deleteCustomer(customerId);
        await fetchCustomers();
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <TierLayout>
            <Box sx={{flexGrow: 1, m: 2}}>
                <Box marginBottom={2}>
                    <Button onClick={() => handleDialogOpen()} variant="contained" color="primary">Crear
                        Cliente</Button>
                </Box>
                <Dialog open={openDialog} onClose={handleDialogClose}>
                    <DialogTitle>{isEdit ? 'Edit Customer' : 'Create New Customer'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            label="Nombre"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={customerForm.name}
                            onChange={handleFormChange}
                        />
                        <TextField
                            margin="dense"
                            name="address"
                            label="Direccion"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={customerForm.address}
                            onChange={handleFormChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
                </Dialog>

                {/* Customers Display */}
                <Grid container spacing={2}>
                    {customers.map((customer) => (
                        <Grid item key={customer.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Cliente ID: {customer.id}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Nombre: {customer.name}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Direccion: {customer.address}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => handleDialogOpen(customer)}>Editar</Button>
                                    <Button size="small" onClick={() => handleDelete(customer.id)}>Eliminar</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </TierLayout>
    );
};

export default CustomersPage;
