import React, { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { getLoggedUser } from './../../apis/services';
import { useStore } from 'react-redux';
import { setUserLoggedStatus, setUser } from './../../redux/reducer';

const Splash = () => {
    const store = useStore();
    useEffect(() => {
        checkUserLoginStaus();
    }, []);
    const checkUserLoginStaus = async () => {
        const token = localStorage.getItem('access_token');
        if (token === null) {
            store.dispatch(setUserLoggedStatus(false));
        } else {
            try {
                const res = await getLoggedUser(token);
                if (res.data !== null) {
                    store.dispatch(setUser(res.data));
                    store.dispatch(setUserLoggedStatus(true));
                } else {
                    store.dispatch(setUser({}));
                    store.dispatch(setUserLoggedStatus(false));
                }
            } catch (error) {
                store.dispatch(setUser({}));
                store.dispatch(setUserLoggedStatus(false));
            }
        }
    }
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <div className='splash-logo'>
                <img src="/assets/img/logo.png" alt=""
                    style={{
                        width: '40%',
                    }}
                />
            </div>
            <div>
                <CircularProgress color="secondary" size="2rem" />
            </div>
        </div>
    );
}
export default Splash;