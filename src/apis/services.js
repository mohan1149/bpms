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

// API CALLS FOR PAYMENTTYPES
export const getPaymentTypes = async (onlyActive = 0) => {
    try {
        let response = await axios({
            method: 'GET',
            url: urls.get_payment_types + onlyActive,
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
// END

// API CALLS FOR BRANCHES
export const getBranches = async (onlyActive = 0) => {
    try {
        let response = await axios({
            method: 'get',
            url: urls.get_branches + onlyActive
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
// END

// API CALLS FOR SERVICE CATEGORIES
export const getServiceCategories = async (activeOnly = 0) => {
    try {
        let response = await axios({
            method: 'GET',
            url: urls.get_service_categories + activeOnly,
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
// END

// API CALLS FOR SERVICE VARIATIONS
export const getServiceVariations = async (activeOnly = 0) => {
    try {
        let response = await axios({
            method: 'GET',
            url: urls.get_service_variations + activeOnly,
        });
        return response;
    } catch (error) {
        return error;
    }
}
export const storeServiceVariation = async (data) => {
    try {
        let response = await axios({
            method: 'POST',
            url: urls.store_service_variation,
            data: data,
        });
        return response;
    } catch (error) {
        return error;
    }
}
export const updateServiceVariation = async (data) => {
    try {
        let response = await axios({
            method: 'POST',
            url: urls.update_service_variation,
            data: data,
        });
        return response;
    } catch (error) {
        return error;
    }
}
// END

// API CALLS FOR SERVICE MODIFIERS
export const getServiceModifiers = async (activeOnly = 0) => {
    try {
        let response = await axios({
            method: 'GET',
            url: urls.get_service_modifiers + activeOnly,
        });
        return response;
    } catch (error) {
        return error;
    }
}
export const storeServiceModifier = async (data) => {
    try {
        let response = await axios({
            method: 'POST',
            url: urls.store_service_modifier,
            data: data,
        });
        return response;
    } catch (error) {
        return error;
    }
}
export const updateServiceModifier = async (data) => {
    try {
        let response = await axios({
            method: 'POST',
            url: urls.update_service_modifier,
            data: data,
        });
        return response;
    } catch (error) {
        return error;
    }
}
// END

//API CALLS FOR SERVICES

export const getServices = async (activeOnly = 0) => {
    try {
        let response = await axios({
            method: 'GET',
            url: urls.get_services + activeOnly,
        });
        return response;
    } catch (error) {
        return error;
    }
}
export const getServicesByBranch = async (data) => {
    try {
        let response = await axios({
            method: 'POST',
            url: urls.get_branch_services,
            data: {
                'branches':data,
            },
        });
        return response;
    } catch (error) {
        return error;
    }
}

export const addService = async (data) => {
    try {
        let response = await axios({
            method: 'POST',
            url: urls.store_service,
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
export const updateService = async (data) => {
    try {
        let response = await axios({
            method: 'POST',
            url: urls.update_service,
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


//END


// API CALLS FOR CUSTOMER GROUPS
export const getCustomerGroups = async (activeOnly = 0) => {
    try {
        let response = await axios({
            method: 'GET',
            url: urls.get_customer_subscription_groups + activeOnly,
        });
        return response;
    } catch (error) {
        return error;
    }
}
export const storeCustomerGroup = async (data) => {
    try {
        let response = await axios({
            method: 'POST',
            url: urls.store_customer_subscription_group,
            data: data,
        });
        return response;
    } catch (error) {
        return error;
    }
}
export const updateCustomerGroup = async (data) => {
    try {
        let response = await axios({
            method: 'POST',
            url: urls.update_customer_subscription_group,
            data: data,
        });
        return response;
    } catch (error) {
        return error;
    }
}
//END




// API CALLS FOR CUSTOMERS
export const getCustomers = async (activeOnly = 0) => {
    try {
        let response = await axios({
            method: 'GET',
            url: urls.get_customers + activeOnly,
        });
        return response;
    } catch (error) {
        return error;
    }
}
export const storeCustomer = async (data) => {
    try {
        let response = await axios({
            method: 'POST',
            url: urls.store_customer,
            data: data,
        });
        return response;
    } catch (error) {
        return error;
    }
}
export const updateCustomer = async (data) => {
    try {
        let response = await axios({
            method: 'POST',
            url: urls.update_customer,
            data: data,
        });
        return response;
    } catch (error) {
        return error;
    }
}
export const getCustomerDetails = async (id) => {
    try {
        let response = await axios({
            method: 'GET',
            url: urls.get_customer_details + id,
        });
        return response;
    } catch (error) {
        return error;
    }
}
//END

// API CALLS FOR ROLES
export const addRole = async (data) => {
    try {
        let response = await axios({
            method: 'POST',
            url: urls.store_role,
            data: data,
        });
        return response;
    } catch (error) {
        return error;
    }
}
export const updateRole = async (data) => {
    try {
        let response = await axios({
            method: 'POST',
            url: urls.update_role,
            data: data,
        });
        return response;
    } catch (error) {
        return error;
    }
}
export const getRoles = async (activeOnly = 0) => {
    try {
        let response = await axios({
            method: 'GET',
            url: urls.get_roles + activeOnly,
        });
        return response;
    } catch (error) {
        return error;
    }
}
//END

// API CALLS FOR EMPLOYEES
export const getEmployees = async (activeOnly = 0) => {
    try {
        let response = await axios({
            method: 'GET',
            url: urls.get_employees + activeOnly,
        });
        return response;
    } catch (error) {
        return error;
    }
}

export const addEmployee = async (data) => {
    try {
        let response = await axios({
            method: 'POST',
            url: urls.store_employee,
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
//END
