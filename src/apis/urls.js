let baseUrl = process.env.REACT_APP_BASE_URL + 'api/v1';
const urls = {
    host: baseUrl,

    delete_record: baseUrl,

    login_url: baseUrl + '/auth/login',
    get_user: baseUrl + '/auth/user',
    add_admin: baseUrl + '/admins/store',

    add_payment_type: baseUrl + '/payment-types/store',
    get_payment_types: baseUrl + '/payment-types?onlyActive=',
    edit_payment_type: baseUrl + '/payment-types/update',

    add_branch: baseUrl + '/branches/store',
    get_branches: baseUrl + '/branches?onlyActive=',
    update_branch: baseUrl + '/branches/update',

    store_service_category: baseUrl + '/services/categories/store',
    get_service_categories: baseUrl + '/services/categories?activeOnly=',
    update_service_category: baseUrl + '/services/categories/update',

    store_service_variation: baseUrl + '/services/variations/store',
    get_service_variations: baseUrl + '/services/variations?activeOnly=',
    update_service_variation: baseUrl + '/services/variations/update',

    store_service_modifier: baseUrl + '/services/modifiers/store',
    get_service_modifiers: baseUrl + '/services/modifiers?activeOnly=',
    update_service_modifier: baseUrl + '/services/modifiers/update',

    store_service: baseUrl + '/services/store',
    get_services: baseUrl + '/services?activeOnly=',
    get_branch_services: baseUrl + '/services/by-branches',
    update_service: baseUrl + '/services/update',
    get_service_locations: baseUrl + '/services/locations',
    add_service_to_location: baseUrl + '/services/add/location',
    delete_service_from_location: baseUrl + '/services/location/delete',
    update_service_location_details:baseUrl+'/services/location/update',



    get_service_register_details:baseUrl+'/service-register/details',


    store_customer_subscription_group: baseUrl + '/customers/groups/store',
    get_customer_subscription_groups: baseUrl + '/customers/groups?activeOnly=',
    update_customer_subscription_group: baseUrl + '/customers/groups/update',


    store_customer: baseUrl + '/customers/store',
    get_customers: baseUrl + '/customers?activeOnly=',
    update_customer: baseUrl + '/customers/update',
    get_customer_details: baseUrl + '/customers/',

    store_role: baseUrl + '/roles/store',
    get_roles: baseUrl + '/roles?activeOnly=',
    update_role: baseUrl + '/roles/update',



    store_employee: baseUrl + '/employees/store',
    get_employees: baseUrl + '/employees?activeOnly=',

}

export default urls;