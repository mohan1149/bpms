import React from 'react';
import {Link} from 'react-router-dom'
const Page404 = () => {
    return (
        <div className="container page-error">
            <div>
                {/* <img src="/assets/img/logo.png" alt="logo" className="m-4"/> */}
                {/* <h1 className="p-2">403</h1> */}
                <h5 className="text-center mx-4 mb-4">Page Not Found. The page you are looking doesn't exist.</h5>
                <Link to="/" className="btn btn-red btn-round text-bold text-white px-3 m-4">Home</Link>
            </div>
        </div>
    );
}
export default Page404;