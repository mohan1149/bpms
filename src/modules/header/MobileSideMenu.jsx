import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStore } from 'react-redux';
import { Accordion } from 'react-bootstrap';

const MobileSideMenu = (props) => {
    const store = useStore();
    const user = store.getState().app.user;
    const [activePath, setActivePath] = useState('/');
    const [accordionActiveKey, setAccordionActiveKey] = useState('null');

    useEffect(() => {
        if (window.location.pathname.includes('users')) {
            setActivePath('/users');
        }
        else if (window.location.pathname.includes('hire-titles')) {
            setActivePath('/hire-titles');
        }
        else if (window.location.pathname.includes('departments')) {
            setActivePath('/departments');
        }
        else if (window.location.pathname.includes('positions')) {
            setActivePath('/positions');
        }
        else if (window.location.pathname.includes('questions')) {
            setActivePath('/questions');
        }
        else if (window.location.pathname.includes('candidates')) {
            setActivePath('/candidates');
        } else {
            setActivePath(window.location.pathname);
        }

    }, [useLocation().pathname]);
    const { t } = useTranslation();
    const handleAccordionToggle = (eventKey) => {
        // if (sizeToggler) {
        setAccordionActiveKey(accordionActiveKey === eventKey ? null : eventKey);
        // }
    };
    return (
        <div className='app-sidemenu-bar'>
            <li className={'app-sidemenu-bar-item ' + (activePath === "/" ? 'active' : '')}>
                <span>
                    <img src="/assets/svg/home.svg" alt="" />
                    <Link to="/" onClick={() => { props.hideSidemenu() }}>{t("home")}</Link>
                </span>
            </li>
            <li className={`app-sidemenu-bar-item ${activePath === '/moc' ? 'active-moc' : ''}`}>
                <Accordion activeKey={accordionActiveKey}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header onClick={() => handleAccordionToggle('0')}>
                            <Link to="/moc" className="link">
                                <img src="/assets/svg/hires.svg" alt="" />
                                MOC
                            </Link>
                        </Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                <li>
                                    <Link to="/moc/customer-profile"
                                        onClick={() => { props.hideSidemenu() }}
                                    >Customer Profile</Link>
                                </li>
                                <li>
                                    <Link to="/moc/imei-details"
                                        onClick={() => { props.hideSidemenu() }}
                                    >IMEI Details</Link>
                                </li>
                                <li>
                                    <Link to="/moc/call-trace"
                                        onClick={() => { props.hideSidemenu() }}
                                    >Call Trace</Link>
                                </li>
                                <li>
                                    <Link to="/moc/cell-trace"
                                        onClick={() => { props.hideSidemenu() }}
                                    >Cell Trace</Link>
                                </li>
                                <li>
                                    <Link to="/moc/ip-query"
                                        onClick={() => { props.hideSidemenu() }}
                                    >IP Query</Link>
                                </li>
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </li>
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
                        { t('Logout')}
                    </a>
                </span>
            </li>
        </div>
    );
}

export default MobileSideMenu;