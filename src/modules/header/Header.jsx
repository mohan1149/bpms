import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'react-redux';
import Offcanvas from 'react-bootstrap/Offcanvas';
import MobileSideMenu from './MobileSideMenu';
import { Button } from 'primereact/button';
import { ContextMenu } from 'primereact/contextmenu';

const Header = () => {
    const navigate = useNavigate();
    const store = useStore();
    const user = store.getState().app.user;
    const [showSidemenu, setShowSidemenu] = useState(false);
    const cm = useRef(null);
    const items = [
        {
            label: 'English',
            command: () => {
                updateAppLang('en');
            }
        },
        {
            label: 'Arabic',
            command: () => {
                updateAppLang('ar');
            }
        },
        {
            label: 'German',
            command: () => {
                updateAppLang('de');
            }
        }
    ];
    const updateAppLang = (newLang) => {
        localStorage.setItem('lang', newLang);
        window.location.reload();
    }
    const hideSidemenu = () => {
        setShowSidemenu(false);
    }
    return (
        <div>
            <div>
                <Offcanvas
                    className="mobile-side-menu-offcanvas"
                    show={showSidemenu}
                    onHide={() => {
                        setShowSidemenu(!showSidemenu);
                    }}
                >
                    <Offcanvas.Header className="text-white">
                        <Offcanvas.Title className="text-white text-bold">Ooredoo Administrator Portal</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className='mobile-side-menu'>
                            <MobileSideMenu hideSidemenu={() => {
                                hideSidemenu();
                            }} />
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
                <div className="top-header">
                    <div className='header-content'>

                        <div>
                            {window.location.pathname !== "/" &&

                                <Button
                                    className='icon-btn' severity='secondary'
                                    onClick={() => {
                                        navigate(-1);
                                    }}
                                >
                                    <span className="material-symbols-outlined">
                                        {
                                            document.documentElement.dir === 'rtl' ? 'arrow_forward' : 'arrow_back'
                                        }
                                    </span>
                                </Button>
                            }
                        </div>
                        <div>
                            <ContextMenu model={items} ref={cm} breakpoint="767px" />
                            <Button
                                className='icon-btn' severity='secondary'
                                onClick={(e) => cm.current.show(e)}
                            >
                                <span className="material-symbols-outlined">
                                    translate
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Header;
