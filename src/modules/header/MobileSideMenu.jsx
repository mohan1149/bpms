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
            <li className={`app-sidemenu-bar-item ${activePath.includes('voucher') ? 'active' : ''}`}>
                <Accordion activeKey={accordionActiveKey}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header onClick={() => handleAccordionToggle('0')}>
                            <Link className="link">
                                <img src="/assets/svg/hires.svg" alt="" />
                                Voucher
                            </Link>
                        </Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                <li>
                                    <Link to="/voucher/VoucherRedemption" onClick={() => { props.hideSidemenu() }}>Voucher Redemption</Link>
                                </li>
                                <li>
                                    <Link to="/voucher/RedemptionReport" onClick={() => { props.hideSidemenu() }}>Redemption Report</Link>
                                </li>

                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </li>
            <li className={`app-sidemenu-bar-item ${activePath.includes('points') ? 'active' : ''}`}>
                <Accordion activeKey={accordionActiveKey}>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header onClick={() => handleAccordionToggle('1')}>
                            <Link className="link">
                                <img src="/assets/svg/hires.svg" alt="" />
                                Points
                            </Link>
                        </Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                <li>
                                    <Link to="/points/earn-points" onClick={() => { props.hideSidemenu() }} >Earn Points</Link>
                                </li>
                                <li>
                                    <Link to="/points/transaction-report" onClick={() => { props.hideSidemenu() }}>Transaction Report</Link>
                                </li>

                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </li>
            <li className={`app-sidemenu-bar-item ${activePath.includes('admin') ? 'active' : ''}`}>
                <Accordion activeKey={accordionActiveKey}>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header onClick={() => handleAccordionToggle('2')}>
                            <Link className="link">
                                <img src="/assets/svg/hires.svg" alt="" />
                                Admin
                            </Link>
                        </Accordion.Header>
                        <Accordion.Body>
                            <ul>
                            <li>
                                    <Link to="/admin/manageUsers" onClick={() => { props.hideSidemenu() }}>Manage Users</Link>
                                </li>
                                <li>
                                    <Link to="/admin/createNewUser" onClick={() => { props.hideSidemenu() }}>Create New User</Link>
                                </li>
                                <li>
                                    <Link to="/admin/managePartners" onClick={() => { props.hideSidemenu() }}>Manage Partners</Link>
                                </li>
                                <li>
                                    <Link to="/admin/remilttanceRequest" onClick={() => { props.hideSidemenu() }}>Remilttance Request</Link>
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
                        {t('Logout')}
                    </a>
                </span>
            </li>
        </div>
    );
}

export default MobileSideMenu;