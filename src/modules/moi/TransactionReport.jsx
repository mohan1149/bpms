import { useState } from "react";
import Select from 'react-select';
import { Calendar } from "primereact/calendar";

const TransactionReport = () => {
    // const [partner, setPartner] = useState({ value: 'text', label: 'Select Partner' });
    const [partnerId, setPartnerId] = useState({ value: 'text', label: 'Select Partner ID' });
    const [partnerUserId, setPartnerUserId] = useState({ value: 'text', label: 'Select Partner User ID' });
    const [membershipId, setMembershipId] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')


    

    const handleReset = () => {
        // setPartner('');

        setPartnerId('')
        setMembershipId('');
        setPartnerUserId('')
        setFromDate('')
        setToDate('')

    };

    

    // const partnerTypes  = [
    //     { value: 'text', label: 'Single Location' },
    //     { value: 'csvFile', label: 'Multiple Locations' }
    // ]

    const partnerIds  = [
        { value: 'text', label: '123' },
        { value: 'csvFile', label: '456' }
    ]

    const partnerUserIds  = [
        { value: 'text', label: '789' },
        { value: 'csvFile', label: '619' }
    ]

    return (
        <div>
            <h3><strong>Transaction Report</strong></h3>
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
                            
                            <label htmlFor="parnter" className="mb-2">Partner ID</label>
                            <Select options={partnerIds} id="searchType"
                                onChange={(e) => {
                                    setPartnerId(e);
                                }}
                                value={partnerId}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            
                            <label htmlFor="parnter" className="mb-2">Partner User ID</label>
                            <Select options={partnerUserIds} id="searchType"
                                onChange={(e) => {
                                    setPartnerUserId(e);
                                }}
                                value={partnerUserId}
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
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="from_date" className='mb-2 required'>From Date</label>
                            <Calendar value={fromDate} onChange={(e) => setFromDate(e.value)} dateFormat="dd/mm/yy" className='pr-input' maxDate={new Date()} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="to_date" className='mb-2 required'>To Date</label>
                            <Calendar value={toDate} onChange={(e) => setToDate(e.value)} dateFormat="dd/mm/yy" className='pr-input' maxDate={new Date()} />
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

export default TransactionReport;
