import { useState } from "react";
import Select from 'react-select';

const EarnPoints = () => {
    const [partner, setPartner] = useState({ value: 'text', label: 'Select Partner' });
    const [customerName, setCustomerName] = useState('')
    const [membershipId, setMembershipId] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [billNumber, setBillNumber] = useState('')
    const [billAmt, setBillAmt] = useState('')

    

    const handleReset = () => {
        setPartner('');
        setCustomerName('');
        setMembershipId('');
        setMobileNumber('');
        setBillNumber('');
        setBillAmt('');

    };

    

    const partnerTypes  = [
        { value: 'text', label: 'Single Location' },
        { value: 'csvFile', label: 'Multiple Locations' }
    ]

    return (
        <div>
            <h3><strong>Earn Points</strong></h3>
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
                            <label htmlFor="voucherNumber" className="mb-2 required">Date</label>
                            <input
                                type="number"
                                id="voucherNumber"
                                required
                                className="form-control"
                                // value={voucherNumber}
                                onChange={(e) => {
                                    // setVoucherNumber(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <label htmlFor="voucherNumber" className="mb-2 required">Customer Name</label>
                            <input
                                type="text"
                                id="voucherNumber"
                                required
                                className="form-control"
                                value={customerName}
                                onChange={(e) => {
                                    setCustomerName(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <label htmlFor="voucherNumber" className="mb-2 required">Membership ID</label>
                            <input
                                type="number"
                                id="voucherNumber"
                                required
                                className="form-control"
                                value={membershipId}
                                onChange={(e) => {
                                    setMembershipId(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <label htmlFor="voucherNumber" className="mb-2 required">Mobile Number</label>
                            <input
                                type="number"
                                id="voucherNumber"
                                required
                                className="form-control"
                                value={mobileNumber}
                                onChange={(e) => {
                                    setMobileNumber(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <label htmlFor="voucherNumber" className="mb-2 required">Bill Number</label>
                            <input
                                type="number"
                                id="voucherNumber"
                                required
                                className="form-control"
                                value={billNumber}
                                onChange={(e) => {
                                    setBillNumber(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <label htmlFor="voucherNumber" className="mb-2 required">Bill AMT.</label>
                            <input
                                type="number"
                                id="voucherNumber"
                                required
                                className="form-control"
                                value={billAmt}
                                onChange={(e) => {
                                    setBillAmt(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            
                            <label htmlFor="parnter" className="mb-2">Partner Name</label>
                            <Select options={partnerTypes} id="searchType"
                                onChange={(e) => {
                                    setPartner(e);
                                }}
                                value={partner}
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

export default EarnPoints;
