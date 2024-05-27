let baseUrl = process.env.REACT_APP_BASE_URL+'api/v1/';
const urls = {
    host:process.env.REACT_APP_BASE_URL,
    get_user: baseUrl + 'auth/user',
    login: baseUrl + 'auth/login',
    // get_branches: baseUrl + '/api/v1/branches',
    // store_branch: baseUrl + '/api/v1/branches/store',
    // get_product_categories: baseUrl + '/api/v1/products/categories',
    // store_product_cartegory: baseUrl + '/api/v1/products/store-category',
}

export default urls;