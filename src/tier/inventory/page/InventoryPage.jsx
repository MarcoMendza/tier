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
import {getCardboards, createCardboard, updateCardboard, deleteCardboard} from '../../../helpers/cardboard.js';
import {getBoxes, createBox, updateBox, deleteBox} from '../../../helpers/boxesHelpers.js';
import {TierLayout} from "../../layout/TierLayout.jsx";

export const InventoryPage = () => {
    const [cardboards, setCardboards] = useState([]);
    const [boxes, setBoxes] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({
        size: '',
        cardboard_id: '',
        quantity: '',
        type: ''
    });

    const fetchCardboards = async () => {
        try {
            const data = await getCardboards();
            setCardboards(data);
        } catch (error) {
            console.error("Error fetching cardboards:", error.message);
        }
    };

    const fetchBoxes = async () => {
        try {
            const data = await getBoxes();
            setBoxes(data);
        } catch (error) {
            console.error("Error fetching boxes:", error.message);
        }
    };

    const handleDialogOpen = (type, item = null) => {
        setDialogType(type);
        setSelectedItem(item);
        setFormData({
            size: item?.size || '',
            cardboard_id: item?.cardboard_id || '',
            quantity: item?.quantity || '',
            type: item?.type || ''
        });
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setDialogType('');
        setSelectedItem(null);
        setFormData({
            size: '',
            cardboard_id: '',
            quantity: '',
            type: ''
        });
    };

    const handleFormChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSave = async () => {
        if (dialogType === 'box') {
            if (selectedItem) {
                await updateBox(selectedItem.id, formData);
            } else {
                await createBox(formData);
            }
        } else if (dialogType === 'cardboard') {
            if (selectedItem) {
                await updateCardboard(selectedItem.id, formData);
            } else {
                await createCardboard(formData);
            }
        }
        handleDialogClose();
        fetchCardboards();
        fetchBoxes();
    };

    const handleDeleteCardboard = async (cardboardId) => {
        await deleteCardboard(cardboardId);
        fetchCardboards();
    };

    const handleDeleteBox = async (boxId) => {
        await deleteBox(boxId);
        fetchBoxes();
    };

    useEffect(() => {
        fetchCardboards();
        fetchBoxes();
    }, []);

    return (
        <TierLayout>
            <Box sx={{flexGrow: 1, m: 2}}>
                <Box mb={2}>
                    <Button onClick={() => handleDialogOpen('cardboard')} variant="contained" color="primary">Recibir carton</Button>
                    <Button onClick={() => handleDialogOpen('box')} variant="contained" color="secondary" sx={{ml: 2}}>Crear Cajas</Button>
                </Box>

                <Dialog open={openDialog} onClose={handleDialogClose}>
                    <DialogTitle>{selectedItem ? `Edit ${dialogType}` : `Create New ${dialogType}`}</DialogTitle>
                    <DialogContent>
                        {dialogType === 'box' && (
                            <>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name="size"
                                    label="Tamaño"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    value={formData.size}
                                    onChange={handleFormChange}
                                />
                                <TextField
                                    margin="dense"
                                    name="cardboard_id"
                                    label="ID del carton"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    value={formData.cardboard_id}
                                    onChange={handleFormChange}
                                />
                                <TextField
                                    margin="dense"
                                    name="quantity"
                                    label="Cantidad"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    value={formData.quantity}
                                    onChange={handleFormChange}
                                />
                            </>
                        )}
                        {dialogType === 'cardboard' && (
                            <>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name="type"
                                    label="Tipo"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    value={formData.type}
                                    onChange={handleFormChange}
                                />
                                <TextField
                                    margin="dense"
                                    name="quantity"
                                    label="Cantidad"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    value={formData.quantity}
                                    onChange={handleFormChange}
                                />
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
                </Dialog>

                <Typography variant={"h4"}>Cartones en almacen</Typography>
                <Box mb={2}>
                    <Grid container spacing={2}>
                        {cardboards.map((cardboard) => (
                            <Grid item key={cardboard.id} xs={12} sm={6} md={4}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            ID del carton: {cardboard.id}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            Tipo: {cardboard.type}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            Cantidad: {cardboard.quantity}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small"
                                                onClick={() => handleDialogOpen('cardboard', cardboard)}>Editar</Button>
                                        <Button size="small"
                                                onClick={() => handleDeleteCardboard(cardboard.id)}>Eliminar</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Typography variant={"h4"}>Cajas en almacen</Typography>
                <Grid container spacing={2}>
                    {boxes.map((box) => (
                        <Grid item key={box.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        ID de Caja: {box.id}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Tamaño: {box.size}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Cantidad: {box.quantity}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        ID del carton: {box.cardboard_id}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => handleDialogOpen('box', box)}>Editar</Button>
                                    <Button size="small" onClick={() => handleDeleteBox(box.id)}>Eliminar</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </TierLayout>
    );
};
