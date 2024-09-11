import urls from "./urls";
import axios from "./axios";
export const checkLogin = async (token) => {
    try {
        const response = await axios({
            method: 'POST',
            url: urls.api_server + urls.check_token,
            params: {
                token: token,
            }
        });
        return response;
    } catch (error) {
        return false;
    }

}
export const startLogin = async (user) => {
    try {
        let response = await axios({
            method: 'POST',
            data: user,
            url: urls.login_url,
        });
        return response;
    } catch (error) {
        return error;
    }
}
export const getUserData = async (token) => {
    try {
        let response = await axios({
            method: 'GET',
            url: urls.get_user,
        });
        return response;
    } catch (error) {
        return error;
    }
}

export const storeAdmin = async (data) => {
    try {
        let response = await axios({
            method: 'POST',
            url: urls.add_admin,
            data: data
        });
        return response;
    } catch (error) {
        return error;
    }
}
export const storePaymentType = async (data) => {
    try {
        let response = await axios({
            method: 'POST',
            url: urls.add_payment_type,
            data: data,
            headers:{
                'Content-Type':'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        return error;
    }
}




