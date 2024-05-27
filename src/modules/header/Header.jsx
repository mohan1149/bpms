import React, { useState, useRef } from 'react';
import { IconButton, Avatar, AppBar, Box, Toolbar, Button } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'react-redux';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Offcanvas from 'react-bootstrap/Offcanvas';
import MobileSideMenu from './MobileSideMenu';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
const Header = () => {
    const navigate = useNavigate();
    const store = useStore();
    const user = store.getState().app.user;
    const menuRight = useRef(null);
    const [showSidemenu, setShowSidemenu] = useState(false);
    const items = [
        {
            items: [
                // {
                //     label: 'Profile',
                //     icon: 'pi pi-refresh',
                //     command: () => {
                //         navigate('/profile');
                //     }
                // },
                {
                    label: 'Logout',
                    icon: 'pi pi-times',
                    command: () => {
                        navigate('/logout');
                    }
                }
            ]
        },
    ];
    const hideSidemenu = () => {
        setShowSidemenu(false);
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static"
                style={{
                    position: 'fixed',
                    backgroundColor: '#FFF',
                    zIndex: 10,
                }}
            >

                <Offcanvas
                    className="mobile-side-menu-offcanvas"
                    show={showSidemenu}
                    onHide={() => {
                        setShowSidemenu(!showSidemenu);
                    }}
                >
                    <Offcanvas.Header className="text-white">
                        <Offcanvas.Title className="text-white text-bold">Ooredoo CDR System</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className='mobile-side-menu'>
                            <MobileSideMenu hideSidemenu={() => {
                                hideSidemenu();
                            }} />
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
                <Toolbar>
                    <div className="">
                        <div>
                            <div className="d-flex align-items-center">
                                {window.location.pathname !== "/" &&
                                    < IconButton className="bg-red"
                                        onClick={() => {
                                            navigate(-1);
                                        }}
                                    >
                                        <KeyboardBackspaceIcon htmlColor="#FFF" />
                                    </IconButton>
                                }
                                <img src="/assets/img/logo.png" className='logo mx-2' width="190" />
                            </div>
                        </div>
                        <div className="d-lg-none d-xl-none" >
                            <IconButton
                                onClick={() => {
                                    setShowSidemenu(!showSidemenu);
                                }}
                            >
                                <MenuOpenIcon fontSize="large" htmlColor="#ED1C24" />
                            </IconButton>
                        </div>
                    </div>

                </Toolbar>
            </AppBar>

        </Box >
    );
}
export default Header;
