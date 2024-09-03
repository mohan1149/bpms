let baseUrl = process.env.REACT_APP_BASE_URL;
const urls = {
    host: baseUrl,
    customer_profile_by_id_or_msisdn: baseUrl + '/api/v1/customer-profile/by-id?msisdnOrCivil=',
    customer_profile_by_csv_list: baseUrl + '/api/v1/customer-profile/by-file',
    customer_profile_by_IMEI: baseUrl + '/api/v1/imei/by-id?msisdnOrImei=',
    customer_profile_by_IMEI_file: baseUrl + '/api/v1/imei/by-file',
    call_trace: baseUrl + '/api/v1/call-trace',
    cell_trace: baseUrl + '/api/v1/cell-trace',
    cell_trace_byFile: baseUrl + '/api/v1/cell-trace/by-file',
    ip_query: baseUrl + '/api/v1/ip-query',
    ip_queryDownload: baseUrl + '/files/',
    cdr_login:baseUrl+'/api/v1/ldap/cdr-auth',


}

export default urls;