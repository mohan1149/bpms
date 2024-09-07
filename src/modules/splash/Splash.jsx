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
                if(status.response.status !== 401){
                    if (status !== false) {
                        store.dispatch(setUser(status.data));
                        store.dispatch(setUserLoggedStatus(true));
                    }
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
            </div>
        </div>
    );
}
export default Splash;