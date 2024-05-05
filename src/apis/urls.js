let baseUrl = process.env.REACT_APP_BASE_URL;
const urls = {
    host: baseUrl,
    validate_token: baseUrl + '/api/v1/auth/validate-token',
    login: baseUrl + '/api/v1/auth/login',
    get_branches: baseUrl + '/api/v1/branches',
    store_branch: baseUrl + '/api/v1/branches/store',
    get_product_categories: baseUrl + '/api/v1/products/categories',
    store_product_cartegory: baseUrl + '/api/v1/products/store-category',
}

export default urls;