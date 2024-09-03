import React, { useEffect } from 'react';
import { checkLogin } from './../../apis/services';
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
            store.dispatch(setUser({}));
            store.dispatch(setUserLoggedStatus(true));
            // const status = await checkLogin(token);
            // if (status !== false) {
            //     store.dispatch(setUser(status.data));
            //     store.dispatch(setUserLoggedStatus(true));
            // }
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
                {/* <CircularProgress color="secondary" size="2rem" /> */}
            </div>
        </div>
    );
}
export default Splash;