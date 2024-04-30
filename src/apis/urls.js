let baseUrl = process.env.REACT_APP_BASE_URL;
const urls = {
    host: baseUrl,
    validate_token: baseUrl + '/api/v1/auth/validate-token',
    login: baseUrl + '/api/v1/auth/login'
}

export default urls;