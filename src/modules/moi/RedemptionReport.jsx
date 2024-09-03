import { useState, useEffect } from "react";
import Select from 'react-select';
import { Calendar } from "primereact/calendar";

const RedemptionReport = () => {
    const [partner, setPartner] = useState({ value: 'text', label: 'Select Partner' });
    const [user, setUser] = useState({value: 'text', lable: 'Select User Type' })
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')


    const handleReset = () => {
        setPartner('');
        setUser('');
        setFromDate('');
        setToDate('');
    };


    const partnerTypes = [
        { value: 'text', label: 'Single Location' },
        { value: 'csvFile', label: 'Multiple Locations' }
    ]

    const userTypes = [
        { value: 'text', label: 'Admin' },
        { value: 'csvFile', label: 'Employee' }
    ]
    

    return (
        <div>
            <h3><strong>Redemption Report</strong></h3>
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
                            <Select options={partnerTypes} id="partner"
                                onChange={(e) => {
                                    setPartner(e)
                                    
                                }}
                                value={partner}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <label htmlFor="voucherNumber" className="mb-2 required">User Type</label>
                            <Select options={userTypes} id="partner"
                                onChange={(e) => {
                                    setUser(e)
                                    
                                }}
                                value={user}
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

export default RedemptionReport;
