import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Accordion } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { useSelector, useStore } from 'react-redux';
import { setShowSidemenu } from '../../redux/reducer';
const Sidebar = (props) => {
    const store = useStore();
    const { t } = useTranslation();
    const location = useLocation();
    const [activePath, setActivePath] = useState('/');
    const [accordionActiveKey, setAccordionActiveKey] = useState('null');
    const sizeToggler = useSelector((state) => state.app.showSidemenu);
    useEffect(() => {
        const path = location.pathname;
        setActivePath(path);
        if (!sizeToggler) {
            setAccordionActiveKey(null);
        }
    }, [location.pathname, sizeToggler]);
    const handleAccordionToggle = (eventKey) => {
        if (sizeToggler) {
            setAccordionActiveKey(accordionActiveKey === eventKey ? null : eventKey);
        }
    };

    return (
        <div className={`app-sidemenu-bar ${sizeToggler ? 'open' : 'closed'}`}>
            <li className={`app-sidemenu-bar-item ${activePath === '/' ? 'active' : ''}`}>
                <Link to="/">
                    <span className='link-container'>
                        <span className="material-symbols-outlined">
                            space_dashboard
                        </span>
                        <span className='link_title'>
                            {sizeToggler && t('home')}
                        </span>

                    </span>
                </Link>
            </li>
            {
                <li className={`app-sidemenu-bar-item ${activePath.includes('admins') ? 'active' : ''}`}>
                    <Link to="/admins">
                        <span className='link-container'>
                            <span className="material-symbols-outlined">
                                shield_person
                            </span>
                            <span className='link_title'>
                                {sizeToggler && t('admins')}
                            </span>
                        </span>
                    </Link>
                </li>
            }
            <li className={`app-sidemenu-bar-item ${activePath.includes('branches') ? 'active' : ''}`}>
                <Link to="/branches">
                    <span className='link-container'>
                        <span className="material-symbols-outlined">
                            apartment
                        </span>
                        <span className='link_title'>
                            {sizeToggler && t('branches')}
                        </span>
                    </span>
                </Link>
            </li>
            {/* <li className={`app-sidemenu-bar-item ${activePath.includes('users') ? 'active' : ''}`}>
                <Link to="/users">
                    <span className='link-container'>
                        <span className="material-symbols-outlined">
                            account_circle
                        </span>
                        <span className='link_title'>
                            {sizeToggler && t('users')}
                        </span>
                    </span>
                </Link>
            </li> */}
            <li className={`app-sidemenu-bar-item ${activePath.includes('employees') ? 'active' : ''}`}>
                <Accordion activeKey={accordionActiveKey} className=''>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header onClick={() => handleAccordionToggle('4')}
                            className={sizeToggler ? 'expaned' : 'collapsed'}
                        >
                            <Link to="/employees" className="link">
                                <div className='link-container'>
                                    <span className="material-symbols-outlined">
                                        badge
                                    </span>
                                    <span className='link_title'>
                                        {sizeToggler && t('employees')}
                                    </span>
                                </div>
                            </Link>
                        </Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                <li>
                                    <Link to="/employees/roles">{t('manage_roles')}</Link>
                                </li>
                                <li>
                                    <Link to="/employees">{t('all_employees')}</Link>
                                </li>
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </li>


            <li className={`app-sidemenu-bar-item ${activePath.includes('customers') ? 'active' : ''}`}>
                <Accordion activeKey={accordionActiveKey} className=''>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header onClick={() => handleAccordionToggle('3')}
                            className={sizeToggler ? 'expaned' : 'collapsed'}
                        >
                            <Link to="/customers" className="link">
                                <div className='link-container'>
                                    <span className="material-symbols-outlined">
                                        group
                                    </span>
                                    <span className='link_title'>
                                        {sizeToggler && t('customers')}
                                    </span>
                                </div>
                            </Link>
                        </Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                <li>
                                    <Link to="/customers">{t('all_customers')}</Link>
                                </li>
                                <li>
                                    <Link to="/customers/groups">{t('customer_groups')}</Link>
                                </li>
                                <li>
                                    <Link to="/customers/walet">{t('customers_wallet')}</Link>
                                </li>
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </li>



            <li className={`app-sidemenu-bar-item ${activePath.includes('services') ? 'active' : ''}`}>
                <Accordion activeKey={accordionActiveKey} className=''>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header onClick={() => handleAccordionToggle('0')}
                            className={sizeToggler ? 'expaned' : 'collapsed'}
                        >
                            <Link to="/services" className="link">
                                <div className='link-container'>
                                    <span className="material-symbols-outlined">
                                        spa
                                    </span>
                                    <span className='link_title'>
                                        {sizeToggler && t('services')}
                                    </span>
                                </div>
                            </Link>
                        </Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                <li>
                                    <Link to="/services">{t('all_services')}</Link>
                                </li>
                                <li>
                                    <Link to="/services/categories">{t('service_categories')}</Link>
                                </li>
                                <li>
                                    <Link to="/services/variations">{t('service_variations')}</Link>
                                </li>
                                <li>
                                    <Link to="/services/modifiers">{t('service_modifiers')}</Link>
                                </li>

                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </li>
            <li className={`app-sidemenu-bar-item ${activePath.includes('bookings') ? 'active' : ''}`}>
                <Accordion activeKey={accordionActiveKey} className=''>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header onClick={() => handleAccordionToggle('1')}
                            className={sizeToggler ? 'expaned' : 'collapsed'}
                        >
                            <Link to="/bookings" className="link">
                                <div className='link-container'>
                                    <span className="material-symbols-outlined">
                                        history
                                    </span>
                                    <span className='link_title'>
                                        {sizeToggler && t('bookings')}
                                    </span>
                                </div>
                            </Link>
                        </Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                <li>
                                    <Link to="/bookings">{t('all_bookings')}</Link>
                                </li>
                                <li>
                                    <Link to="/bookings/today">{t('today_bookings')}</Link>
                                </li>
                                <li>
                                    <Link to="/bookings/add">{t('add_booking')}</Link>
                                </li>
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </li>
            <li className={`app-sidemenu-bar-item ${activePath.includes('settings') ? 'active' : ''}`}>
                <Accordion activeKey={accordionActiveKey} className=''>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header onClick={() => handleAccordionToggle('2')}
                            className={sizeToggler ? 'expaned' : 'collapsed'}
                        >
                            <Link to="/settings" className="link">
                                <div className='link-container'>
                                    <span className="material-symbols-outlined">
                                        settings
                                    </span>
                                    <span className='link_title'>
                                        {sizeToggler && t('settings')}
                                    </span>
                                </div>
                            </Link>
                        </Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                <li>
                                    <Link to="/settings">{t('settings')}</Link>
                                </li>
                                <li>
                                    <Link to="/settings/payment-types">{t('payment_types')}</Link>
                                </li>
                                <li>
                                    <Link to="/settings/taxes">{t('taxes')}</Link>
                                </li>
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </li>

            <div className="mt-3">
                <Button
                    className='icon-btn' severity='secondary'
                    style={{
                        marginLeft: 8,
                        marginRight: 12,
                    }}
                    onClick={() => {
                        const check = !sizeToggler;
                        store.dispatch(setShowSidemenu(check));
                    }}
                >
                    {sizeToggler ? (

                        <span className="material-symbols-outlined">
                            first_page
                        </span>
                    ) : (
                        <span className="material-symbols-outlined">
                            last_page
                        </span>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
