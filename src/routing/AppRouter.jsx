import React, { useState, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../modules/home/Home';
import Header from '../modules/header/Header';
import Sidebar from '../modules/home/Sidemenu';
import { useStore } from 'react-redux';
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



//SETTINGS
import PaymentTypes from '../modules/settings/PaymentTypes';



import { setErrorToast } from '../redux/reducer';

const AppRouter = () => {
    const store = useStore();
    const { t } = useTranslation();

    const [isUserLogged, setIsUserLogged] = useState(false);
    const [showReqDialog, setShowReqDialog] = useState(false);

    const [sideMenuSize, setSideMenuSize] = useState(true);
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
                                <Sidebar onSizeToggle={(check) => {
                                    setSideMenuSize(check)
                                }} />
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
                                    <Route path='/settings/payment-types' element={<PaymentTypes />} />



                                    <Route path='/logout' element={<Logout />} />
                                    <Route path='*' element={<Page404 />} />
                                </Routes>
                            </div>
                            {/* <Footer /> */}
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}
export default AppRouter;