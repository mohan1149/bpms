import { useState } from "react";
import Select from 'react-select';


const ManageUsers = () => {
    // const [partner, setPartner] = useState({ value: 'text', label: 'Select Partner' });
    const [name, setName] = useState('')
    const [loginName, setLoginName] = useState('')
    const [role, setRole] = useState({ value: 'text', label: 'Select Role' });
    const [partner, setPartner] = useState({ value: 'text', label: 'Select Partner' });


    

    const handleReset = () => {
        // setPartner('');

        setName('')
        setLoginName('')
        setRole('')
        setPartner('')

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

    const partnerTypes  = [
        { value: 'text', label: 'Single Location' },
        { value: 'csvFile', label: 'Multiple Locations' }
    ]

    const roles = [
        { value: 'text', label: 'Admin' },
        { value: 'csvFile', label: 'Nomral User' }
    ]

    return (
        <div>
            <h3><strong>Manage Users</strong></h3>
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
                            <label htmlFor="voucherNumber" className="mb-2 required">Name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                className="form-control"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <label htmlFor="voucherNumber" className="mb-2 required">Login Name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                className="form-control"
                                value={loginName}
                                onChange={(e) => {
                                    setLoginName(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                <div className="col-md-6 mb-2">
                        <div className="form-group">
                            
                            <label htmlFor="parnter" className="mb-2 required">Partner</label>
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
                            
                            <label htmlFor="parnter" className="mb-2 required">Role</label>
                            <Select options={roles} id="searchType"
                                onChange={(e) => {
                                    setRole(e);
                                }}
                                value={role}
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

export default ManageUsers;
