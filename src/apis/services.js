import urls from "./urls";
import axios from "./axios";

export const getLoggedUser = async (token) => {
    try {
        const response = await axios({
            method: 'GET',
            url: urls.get_user,
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
            url: urls.login,
        });
        return response;
    } catch (error) {
        return false;
    }
}


export const getBranches = async (user) => {
    try {
        let response = await axios({
            method: 'GET',
            data: user,
            url: urls.get_branches,
        });
        return response;
    } catch (error) {
        return false;
    }
}
export const storeBranch = async (user) => {
    try {
        let response = await axios({
            method: 'POST',
            data: user,
            url: urls.store_branch,
        });
        return response;
    } catch (error) {
        return false;
    }
}
export const storeProductCategory = async (data) => {
    try {
        let response = await axios({
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: data,
            url: urls.store_product_cartegory,
        });
        return response;
    } catch (error) {
        return false;
    }
}
export const getProductCategories = async () => {
    try {
        let response = await axios({
            method: 'GET',
            url: urls.get_product_categories,
        });
        return response;
    } catch (error) {
        return false;
    }
}





















export const logoutUser = async (username) => {
    let response = await axios({
        method: 'POST',
        data: {
            username: username,
        },
        url: urls.api_server + urls.logout,
    });
    return response;
}
export const getCustomerProfileById = async (data) => {
    let response = await axios({
        method: 'GET',
        url: urls.customer_profile_by_id_or_msisdn + data,
    });
    return response;
}
export const getCustomerProfileByCSVFile = async (data) => {
    let response = await axios({
        method: 'POST',
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
        },
        url: urls.customer_profile_by_csv_list,
    });
    return response;
}
export const getCallTrace = async (data) => {
    let response = await axios({
        method: 'GET',
        params: data,
        url: urls.call_trace,
    });
    return response;
}

export const getCellTrace = async (data) => {
    let response = await axios({
        method: 'GET',
        params: data,
        url: urls.cell_trace
    })
    return response
}


export const getCellTracrByFile = async (data) => {
    let response = await axios({
        method: 'POST',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        url: urls.cell_trace_byFile
    })
    return response
}

export const editQuestion = async (data) => {
    let response = await axios({
        method: 'PUT',
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
        },
        url: urls.api_server + urls.edit_question
    });
    return response;
}

export const getCustomerProfileByIMEI = async (data) => {
    let response = await axios({
        method: 'GET',
        url: urls.customer_profile_by_IMEI + data,
    });
    return response;
}

export const getCustomerProfileByIMEIFile = async (data) => {
    let response = await axios({
        method: 'POST',
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
        },
        url: urls.customer_profile_by_IMEI_file,
    });
    return response;
}

export const ipQuerygetStatus = async (data) => {
    let response = await axios({
        method: 'GET',
        url: urls.ip_query,
        params: data,

    })
    return response;

}

export const ipQuerySendFile = async (data) => {
    let response = await axios({
        method: 'POST',
        data: data,
        headers: {
            "Content-Type": "multipart/form-data"
        },
        url: urls.ip_query,
    })
    return response;

}

export const ipQueryDownloadFile = async (data) => {
    let response = await axios({
        method: 'GET',
        url: urls.ip_queryDownload + data
    })
    return response

}