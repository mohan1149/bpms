let baseUrl = process.env.REACT_APP_BASE_URL + 'api/v1';
const urls = {
    host: baseUrl,
    delete_record: baseUrl,
    login_url: baseUrl + '/auth/login',
    get_user: baseUrl + '/auth/user',
    add_admin: baseUrl + '/admins/store',

    add_payment_type: baseUrl + '/payment-types/store',
    get_payment_types: baseUrl + '/payment-types',
    edit_payment_type: baseUrl + '/payment-types/update',

    add_branch: baseUrl + '/branches/store',
    get_branches: baseUrl + '/branches',
    update_branch: baseUrl + '/branches/update'
}

export default urls;