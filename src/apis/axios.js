import axios from 'axios';
import store from './../redux/store';
import { setShowDialog, setErrorToast } from './../redux/reducer';
import urls from './urls';
const axiosInstance = axios.create({
    // withCredentials: true
});
axiosInstance.interceptors.request.use(
    async (config) => {
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('_jwt');
        if (!config.url.includes('auth')) {
            store.dispatch(setShowDialog(true));
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
axiosInstance.interceptors.response.use(
    (response) => {
        if (!response.config.url.includes('auth')) {
            store.dispatch(setShowDialog(false));
        }
        return response;
    },
    async (error) => {
        store.dispatch(setShowDialog(false));
        if (!error.config.url.includes('auth')) {
            store.dispatch(setErrorToast({
                flag: true,
                content: error.message,
            }));
        }
       
        // if (error.response.status === 403) {
        //     localStorage.removeItem('access_token');
        //     window.location.assign('/');
        // }
        return Promise.reject(error);
    },
);

export default axiosInstance;
