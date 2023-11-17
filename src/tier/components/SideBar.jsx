import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StoreIcon from '@mui/icons-material/Store';

export const SideBar = ({ drawerWidth = 240, toggleDrawer, isDrawerOpen, isDesktop }) => {
    const { displayName } = useSelector(state => state.auth);

    const menuItems = [
        { text: 'Inventario', path: '/', icon: <InventoryIcon /> },
        { text: 'Entregas', path: '/delivery', icon: <LocalShippingIcon /> },
        { text: 'Inversiones', path: '/investments', icon: <AccountBalanceIcon /> },
        { text: 'Ordenes', path: '/orders', icon: <ShoppingCartIcon /> },
        { text: 'Ganancias', path: '/profits', icon: <AttachMoneyIcon /> },
        { text: 'Ventas', path: '/sales', icon: <StoreIcon /> },
    ];

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant={isDesktop ? "permanent" : "temporary"}
                open={isDesktop ? true : isDrawerOpen}
                onClose={toggleDrawer}
                sx={{
                    display: { xs: 'block', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, padding: 2 }
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component='div'>
                        {displayName}
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    {menuItems.map((item, index) => (
                        <ListItem button component={Link} to={item.path} key={index} onClick={toggleDrawer} sx={{ marginBottom: 2 }}>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
