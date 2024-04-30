import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Accordion } from 'react-bootstrap';
import IconButton from '@mui/material/IconButton';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';

const Sidebar = (props) => {
    const [sizeToggler, setSizeToggler] = useState(true);
    const { t } = useTranslation();
    const location = useLocation();
    const [activePath, setActivePath] = useState('/');
    const [accordionActiveKey, setAccordionActiveKey] = useState('null');

    useEffect(() => {
        const path = location.pathname;
        setActivePath(path);
    }, [location.pathname]);

    useEffect(() => {
        if (!sizeToggler) {
            setAccordionActiveKey(null);
        }
    }, [sizeToggler]);

    const handleAccordionToggle = (eventKey) => {
        if (sizeToggler) {
            setAccordionActiveKey(accordionActiveKey === eventKey ? null : eventKey);
        }
    };

    return (
        <div className={`app-sidemenu-bar ${sizeToggler ? 'open' : 'closed'}`}>
            <li className={`app-sidemenu-bar-item ${activePath === '/' ? 'active' : ''}`}>
                <span>
                    <Link to="/">
                        <img src="/assets/svg/home.svg" alt="" />
                        {sizeToggler && t('home')}
                    </Link>
                </span>
            </li>

            <li className={`app-sidemenu-bar-item ${activePath.includes('moi') ? 'active' : ''}`}>
                <Accordion activeKey={accordionActiveKey} className=''>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header onClick={() => handleAccordionToggle('0')}
                            className={sizeToggler ? 'expaned' : 'collapsed'}
                        >
                            <Link to="/moi" className="link">
                                <img src="/assets/svg/hires.svg" alt="" />
                                {sizeToggler && t('MOI')}
                            </Link>
                        </Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                <li /*className={`${activePath === '/moc/customer-profile' ? 'clicked' : ''}`}*/>
                                    <Link to="/moi/customer-profile">Customer Profile</Link>
                                </li>
                                <li /*className={`${activePath === '/moc/imei-details' ? 'clicked' : ''}`}*/>
                                    <Link to="/moi/imei-details">IMEI Details</Link>
                                </li>
                                <li /*className={`${activePath === '/moc/call-trace' ? 'clicked' : ''}`}*/>
                                    <Link to="/moi/call-trace">Call Trace</Link>
                                </li>
                                <li>
                                    <Link to="/moi/cell-trace">Cell Trace</Link>
                                </li>
                                <li>
                                    <Link to="/moi/ip-query">IP Query</Link>
                                </li>
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </li>
            {/* <li className={`app-sidemenu-bar-item ${activePath === '/vcd' ? 'active' : ''}`}>
                <span>
                    <Link to="/vcd">
                        <img src="/assets/svg/users.svg" alt="" />
                        {sizeToggler && t('View Call Details')}
                    </Link>
                </span>
            </li> */}
            <li className={`app-sidemenu-bar-item ${activePath === '/logout' ? 'active' : ''}`}>
                <span>
                    <a href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            localStorage.removeItem('access_token');
                            window.location.assign('/');
                        }}
                    >
                        <img src="/assets/svg/users.svg" alt="" />
                        {sizeToggler && t('Logout')}
                    </a>
                </span>
            </li>
            <div className="mt-3">
                <IconButton
                    onClick={() => {
                        const check = !sizeToggler;
                        props.onSizeToggle(check);
                        setSizeToggler(check);
                    }}
                >
                    {sizeToggler ? (
                        <FirstPageIcon htmlColor="#FFF" fontSize="large" />
                    ) : (
                        <LastPageIcon htmlColor="#FFF" fontSize="large" />
                    )}
                </IconButton>
            </div>
        </div>
    );
};

export default Sidebar;
