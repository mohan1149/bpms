let baseUrl = process.env.REACT_APP_BASE_URL + 'api/v1';
const urls = {
    host: baseUrl,
    login_url: baseUrl + '/auth/login',
    get_user: baseUrl + '/auth/user',
    add_admin: baseUrl + '/admins/store',

    add_payment_type: baseUrl + '/payment-types/store',


}

export default urls;