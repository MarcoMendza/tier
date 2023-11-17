import { Box, Toolbar } from "@mui/material"
import { NavBar, SideBar } from "../components";
import { useState } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = 240;

export const TierLayout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const toggleDrawer = () => {
    setIsDrawerOpen(prevState => !prevState);
  };

  return (
    <Box sx={{ display: 'flex'}} className='animate__animated animate__fadeIn animate__faster'>
        <NavBar drawerWidth={drawerWidth} toggleDrawer={toggleDrawer} isDesktop={isDesktop} />
        <SideBar drawerWidth={drawerWidth} toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} isDesktop={isDesktop} />

        <Box
            component='main'
            sx={{ flexGrow: 1, p: 2}}
        >
            <Toolbar/>
            { children }
        </Box>

    </Box>
  )
}
