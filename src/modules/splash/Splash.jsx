import React, { useEffect } from 'react';
import { getUserData } from './../../apis/services';
import { useStore } from 'react-redux';
import { setUserLoggedStatus, setUser } from './../../redux/reducer';

const Splash = () => {
    const store = useStore();
    useEffect(() => {
        checkUserLoginStaus();
    }, []);
    const checkUserLoginStaus = async () => {
        try {
            const token = localStorage.getItem('_jwt');
            if (token === null) {
                store.dispatch(setUserLoggedStatus(false));
            } else {
                const status = await getUserData(token);
                if (status !== undefined && status.status === 200 && status.data.status) {
                    if (status !== false) {
                        store.dispatch(setUser(status.data));
                        store.dispatch(setUserLoggedStatus(true));
                    }
                } else {
                    store.dispatch(setUserLoggedStatus(false));
                }
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <div>
                Loading...
            </div>
        </div>
    );
}
export default Splash;