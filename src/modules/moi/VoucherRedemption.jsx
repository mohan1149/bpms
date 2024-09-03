import { useState } from "react";
import Select from 'react-select';

const VoucherRedemption = () => {
    const [partner, setPartner] = useState({ value: 'text', label: 'Select Partner' });
    const [voucherNumber, setVoucherNumber] = useState('');

    const handleReset = () => {
        setPartner('');
        setVoucherNumber('');
    };

    

    const partnerTypes  = [
        { value: 'text', label: 'Single Location' },
        { value: 'csvFile', label: 'Multiple Locations' }
    ]

    return (
        <div>
            <h3><strong>Voucher Redemption</strong></h3>
            <form
                action=""
                method="post"
                onSubmit={(e) => {
                    e.preventDefault();
                    // handleimeiDetailsearch();
                }}
            >
                <div className="row">
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            
                            <label htmlFor="parnter" className="mb-2">Partner</label>
                            <Select options={partnerTypes} id="searchType"
                                onChange={(e) => {
                                    setPartner(e);
                                }}
                                value={partner}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <label htmlFor="voucherNumber" className="mb-2 required">Voucher No</label>
                            <input
                                type="number"
                                id="voucherNumber"
                                required
                                className="form-control"
                                value={voucherNumber}
                                onChange={(e) => {
                                    setVoucherNumber(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group d-flex mt-3">
                            <input type="submit" value="Search" className="btn btn-round bg-red text-bold" />
                            <input
                                type="button"
                                value="Reset"
                                className="btn btn-round bg-black text-white text-bold mx-2"
                                onClick={handleReset}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default VoucherRedemption;
