import React, { useState, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../modules/home/Home';
import Header from '../modules/header/Header';
import Sidebar from '../modules/home/Sidemenu';
import { useStore, useSelector } from 'react-redux';
import Login from './../modules/auth/Login';
import Splash from './../modules/splash/Splash';
import Logout from './../modules/auth/Logout';
import { Toast } from 'primereact/toast';
import { Modal } from 'react-bootstrap';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useTranslation } from 'react-i18next';



import Page403 from './Page403';
import Page404 from './Page404';

//UERS
import Users from './../modules/users/Users';

//ADMINS
import Admins from './../modules/admins/Admins';
import AddAdmin from './../modules/admins/AddAdmin';

//BRANCHES
import Branches from '../modules/branches/Branches';
import AddBranch from '../modules/branches/AddBranch';
import EditBranch from '../modules/branches/EditBranch';


//SETTINGS
import PaymentTypes from '../modules/settings/PaymentTypes';


//SERVICES
import ServiceCategories from '../modules/services/categories/ServiceCategories';
import ServiceVariations from '../modules/services/variations/ServiceVariations';
import ServiceModifiers from '../modules/services/modifiers/ServiceModifiers';
import Services from '../modules/services/Services';
import AddService from '../modules/services/AddService';
import EditService from '../modules/services/EditService';
import ViewService from '../modules/services/ViewService';

import AddServiceOrder from '../modules/services/terminal/AddServiceOrder';

//CUSTOMERS
import AddCustomerGroup from '../modules/customers/groups/AddCustomerGroup';
import CustomerGroups from '../modules/customers/groups/CustomerGroups';
import EditCustomerGroup from '../modules/customers/groups/EditCustomerGroup';
import Customers from '../modules/customers/Customers';
import AddCustomer from '../modules/customers/AddCustomer';
import EditCustomer from '../modules/customers/EditCustomer';
import ViewCustomer from '../modules/customers/ViewCustomer';


//EMPLOYEES
import Employees from '../modules/employees/Employees';
import AddEmployee from '../modules/employees/AddEmployee';

import Roles from '../modules/employees/roles/Roles';
import AddRole from '../modules/employees/roles/AddRole';
import EditRole from '../modules/employees/roles/EditRole';

import { setErrorToast } from '../redux/reducer';
import { addLocale } from 'primereact/api';
const AppRouter = () => {
    const store = useStore();
    const { t } = useTranslation();
    addLocale('en', {
        clear: t('clear'),
        apply: t('apply')
    });
    const [isUserLogged, setIsUserLogged] = useState(false);
    const [showReqDialog, setShowReqDialog] = useState(false);
    const sideMenuSize = useSelector((state) => state.app.showSidemenu);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    store.subscribe(() => {
        setShowReqDialog(store.getState().app.showDialog);
        if (store.getState().app.showErrorToast.flag) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: store.getState().app.showErrorToast.content, life: 3000 });
            store.dispatch(setErrorToast({
                flag: false,
                content: '',
            }));
        }
        if (store.getState().app.isuserlogged) {
            setIsUserLogged(true);
        } else {
            setIsUserLogged(false);
        }
        setLoading(false);
    });
    if (loading) {
        return (
            <BrowserRouter>
                <Toast ref={toast} />
                <Routes>
                    <Route index element={<Splash />} />
                    <Route path='*' element={<Splash />} />
                </Routes>
            </BrowserRouter>
        );
    }
    else if (!isUserLogged && !loading) {
        return (
            <BrowserRouter>
                <Toast ref={toast} />
                <Routes>
                    <Route index element={<Login />} />
                    <Route path='*' element={<Page403 />} />
                </Routes>
            </BrowserRouter>
        );
    }
    else if (isUserLogged && !loading) {
        return (
            <BrowserRouter>
                <div className='container-fluid'>
                    <div className="row">
                        <div className="col-lg-2 col-md-3 d-none d-lg-block no_mp p-0 m-0"
                            style={{
                                width: sideMenuSize ? '' : '4.3%',
                            }}>
                            <div className='side-menu fh glass-card-no-radius'>
                                <Sidebar />
                            </div>
                        </div>
                        <div className="col-lg-10 col-sm-12 col-md-12 app-content no_mp m-0 p-0"
                            style={{
                                width: sideMenuSize ? '' : '95.7%',
                            }}
                        >
                            <Header />
                            <div className="content"
                                style={{
                                    minHeight: '80vh',
                                    marginTop: 90,
                                    padding: '1.5rem'
                                }}>
                                <Toast ref={toast} />
                                <Modal
                                    size="sm"
                                    show={showReqDialog}
                                    centered
                                    className='loading'
                                >
                                    <ProgressSpinner
                                        style={{ width: '50px', height: '50px' }}
                                        strokeWidth="3"
                                        animationDuration=".5s"
                                    />
                                </Modal>
                                <Routes>
                                    <Route index path='/' element={<Home />} />
                                    <Route path='/users' element={<Users />} />
                                    <Route path='/admins' element={<Admins />} />
                                    <Route path='/admins/add' element={<AddAdmin />} />

                                    <Route path='/branches/' element={<Branches />} />
                                    <Route path='/branches/add' element={<AddBranch />} />
                                    <Route path='/branches/edit' element={<EditBranch />} />


                                    <Route path='/services/categories' element={<ServiceCategories />} />
                                    <Route path='/services/variations' element={<ServiceVariations />} />
                                    <Route path='/services/modifiers' element={<ServiceModifiers />} />

                                    <Route path='/services' element={<Services />} />
                                    <Route path='/services/add' element={<AddService />} />
                                    <Route path='/services/edit' element={<EditService />} />
                                    <Route path='/services/view' element={<ViewService />} />


                                    <Route path='/services/terminal' element={<AddServiceOrder />} />


                                    <Route path='/customers/groups' element={<CustomerGroups />} />
                                    <Route path='/customers/groups/add' element={<AddCustomerGroup />} />
                                    <Route path='/customers/groups/edit' element={<EditCustomerGroup />} />
                                    <Route path='/customers' element={<Customers />} />
                                    <Route path='/customers/add' element={<AddCustomer />} />
                                    <Route path='/customers/edit' element={<EditCustomer />} />
                                    <Route path='/customers/view' element={<ViewCustomer />} />




                                    <Route path='/employees' element={<Employees />} />
                                    <Route path='/employees/add' element={<AddEmployee />} />

                                    <Route path='/employees/roles' element={<Roles />} />
                                    <Route path='/employees/roles/add' element={<AddRole />} />
                                    <Route path='/employees/roles/edit' element={<EditRole />} />





                                    <Route path='/settings/payment-types' element={<PaymentTypes />} />
                                    <Route path='/logout' element={<Logout />} />
                                    <Route path='*' element={<Page404 />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}
export default AppRouter;