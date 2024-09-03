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
        url: urls.cdr_login,
    });
    return response;
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
        data:data,
        headers: {
            "Content-Type": "multipart/form-data",
        },
        url: urls.customer_profile_by_csv_list,
    });
    return response;
}
export const getCallTrace = async (data) =>{
    let response = await axios({
        method:'GET',
        params:data,
        url:urls.call_trace,
    });
    return response;
}

export const getCellTrace = async (data) => {
    let response = await axios ({
        method: 'GET',
        params: data,
        url: urls.cell_trace
    })
    return response
}


export const getCellTracrByFile = async (data) =>{
    let response = await axios({
        method:'POST',
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
        data:data,
        headers: {
            "Content-Type": "multipart/form-data",
        },
        url: urls.customer_profile_by_IMEI_file,
    });
    return response;
}

export const ipQuerygetStatus = async (data) =>{
    let response = await axios({
        method: 'GET',
        url:urls.ip_query,
        params:data,

    })
    return response;

}

export const ipQuerySendFile = async(data) =>{
    let response = await axios({
        method: 'POST',
        data:data,
        headers:{
            "Content-Type" : "multipart/form-data"
        },
        url: urls.ip_query,
    })
    return response;

}

export const ipQueryDownloadFile = async(data) =>{
    let response = await axios({
        method: 'GET',
        url:urls.ip_queryDownload + data
    })
    return response

}