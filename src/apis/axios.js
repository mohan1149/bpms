import axios from 'axios';
import store from './../redux/store';
import { setShowDialog, setErrorToast } from './../redux/reducer';
import urls from './urls';
const axiosInstance = axios.create({
    // withCredentials: true
});
axiosInstance.interceptors.request.use(
    async (config) => {
        config.headers['Authorization'] = 'Bearer '+localStorage.getItem('access_token');
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
        store.dispatch(setErrorToast({
            flag: true,
            content: error.response.data.error,
        }));
        return Promise.reject(error);
    },
);

export default axiosInstance;
