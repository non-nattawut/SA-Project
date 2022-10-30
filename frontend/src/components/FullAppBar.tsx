import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import { makeStyles } from "@material-ui/core/styles";

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';

import { Link as RouterLink } from "react-router-dom";

import { EmployeesInterface } from '../models/employee/IEmployee';

const useStyles = makeStyles({
  drawer: {
    width: 150
  }
});

function FullAppBar() {
  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static">
        <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setIsDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>

        <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>                       {/* Tab Menu */}

          <LocalHospitalIcon color="primary" sx={{ fontSize: 150, margin: 1, padding: 2 }} />

          <List className={classes.drawer} sx={{margin: 1,padding: 2}}>

          < ListItem button component={RouterLink} to="/">                                    {/* icon หน้าแรก */}
              <HomeIcon color="primary" />
              <ListItemText primary="หน้าแรก" sx={{padding: 2}}/>
            </ListItem>

          < ListItem button component={RouterLink} to="/employee">                             {/* icon บุคลากร */}
              <BadgeIcon color="primary" />
              <ListItemText primary="บุคลากร" sx={{padding: 2}}/>
            </ListItem>

            <ListItem button component={RouterLink} to="/patient">                             {/* icon คนไข้ */}
              <AirlineSeatFlatIcon color="primary" />
              <ListItemText primary="คนไข้" sx={{padding: 2}}/>
            </ListItem>

            <ListItem button component={RouterLink} to="/diagnostic">                             {/* icon วินิจฉัย */}
              <PersonSearchIcon color="primary" />
              <ListItemText primary="วินิจฉัย" sx={{padding: 2}}/>
            </ListItem>
            
            <ListItem button component={RouterLink} to="/dispensation">                            {/* icon จ่ายยา */}
              <VaccinesIcon color="primary" />
              <ListItemText primary="สั่งจ่ายยา" sx={{padding: 2}}/>
            </ListItem>
            
            <ListItem button component={RouterLink} to="/appointment">                             {/* icon ใบนัด */}
              <AddToQueueIcon color="primary" />
              <ListItemText primary="ใบนัด" sx={{padding: 2}}/>
            </ListItem>

            <ListItem button component={RouterLink} to="/bill">                             {/* icon ออกบิล */}
              <AttachMoneyIcon color="primary" />
              <ListItemText primary="ออกบิล" sx={{padding: 2}}/>
            </ListItem>

          </List>
        </Drawer>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Patient Management System
          </Typography>

          {auth && (                                                                               /* รูป Icon Profild */
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
              <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>{localStorage.getItem("personal_id")}</MenuItem>        {/*รหัสหมออออออ*/}
                <MenuItem onClick={signout} component={RouterLink} to="/" >Logout</MenuItem>
              </Menu>
            </div>
          )}

        </Toolbar>
      </AppBar>

    </Box>
  );
}

export default FullAppBar;
