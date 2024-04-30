import React from 'react';

const Footer = () => {
    return (
        <div className="footer text-white"
            style={{
                backgroundColor: '#141B4D',
                padding: 20,
            }}
        >
            <h1 className='tcenter text'>OOREDOO</h1>
            <h6 className='tcenter text'>All Rights Reserved, {new Date().getFullYear()}</h6>
        </div>

    );
}
export default Footer;