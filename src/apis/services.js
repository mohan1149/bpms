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
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        return error;
    }
}
export const updatePaymentType = async (data) => {
    try {
        let response = await axios({
            method: 'POST',
            url: urls.edit_payment_type,
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        return error;
    }
}

export const getPaymentTypes = async () => {
    try {
        let response = await axios({
            method: 'GET',
            url: urls.get_payment_types,
        });
        return response;
    } catch (error) {
        return error;
    }
}

export const deleteRecord = async (url) => {
    try {
        let response = await axios({
            method: 'DELETE',
            url: urls.delete_record + url,
        });
        return response;
    } catch (error) {
        return error;
    }
}


export const addBranch = async (data) => {
    try {
        let response = await axios({
            method: 'POST',
            url: urls.add_branch,
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        return error;
    }
}
export const updateBranch = async (data) => {
    try {
        let response = await axios({
            method: 'POST',
            url: urls.update_branch,
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        return error;
    }
}

export const getBranches = async (data) => {
    try {
        let response = await axios({
            method: 'get',
            url: urls.get_branches,
        });
        return response;
    } catch (error) {
        return error;
    }
}

export const storeServiceCategory = async (data) => {
    try {
        let response = await axios({
            method: 'POST',
            url: urls.store_service_category,
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        return error;
    }
}
export const getServiceCategories = async (data) => {
    try {
        let response = await axios({
            method: 'GET',
            url: urls.get_service_categories,
        });
        return response;
    } catch (error) {
        return error;
    }
}

export const updateServiceCategory = async (data) => {
    try {
        let response = await axios({
            method: 'POST',
            url: urls.update_service_category,
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        return error;
    }
}






