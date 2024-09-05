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
    let response = await axios({
        method: 'POST',
        data: user,
        url: urls.login_url,
    });
    return response;
}
export const getUserData = async (token) => {
    let response = await axios({
        method: 'GET',
        url: urls.get_user,
    });
    return response;
}


