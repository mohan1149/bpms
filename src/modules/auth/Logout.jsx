import React, { useEffect } from 'react';
// import { logoutUser } from './../../apis/services';
import { useStore } from 'react-redux';
import { setUserLoggedStatus } from '../../redux/reducer';
import { useNavigate } from 'react-router-dom';
const Logout = () => {
    const store = useStore();
    const user = store.getState().app.user;
    const navigate = useNavigate();
    useEffect(() => {
        logout();
    }, []);
    const logout = async () => {
        try {
            // const res = await logoutUser(user.username);
            // localStorage.removeItem('_jwt');
            // store.dispatch(setUserLoggedStatus(false));
            // navigate('/');
        } catch (error) {
            console.log(error);
            
        }

    }
    return (
        <div>
            <div className="h1">logging out ...</div>
        </div>
    );
}
export default Logout;