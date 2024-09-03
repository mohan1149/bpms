import { useState } from "react";
import Select from 'react-select';
import { Checkbox } from "primereact/checkbox";


const CreateNewUser = () => {
    // const [partner, setPartner] = useState({ value: 'text', label: 'Select Partner' });
    const [name, setName] = useState('')
    const [loginName, setLoginName] = useState('')
    const [storeName, setStoreName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassowrd, setConfirmPassword] = useState('')
    const [maxDailyLimit, setMaxDailyLimit] = useState('')
    const [role, setRole] = useState({ value: 'text', label: 'Select Role' });
    const [partner, setPartner] = useState({ value: 'text', label: 'Select Partner' });
    const [primaryEmail, setPrimaryEmail] = useState(false)




    const handleReset = () => {
        // setPartner('');

        setName('')
        setLoginName('')
        setRole('')
        setPartner('')
        setStoreName('')
        setMobileNumber('')
        setConfirmPassword('')
        setPassword('')
        setMaxDailyLimit('')
        setEmail('')
        setPrimaryEmail(false)
        

    };



    // const partnerTypes  = [
    //     { value: 'text', label: 'Single Location' },
    //     { value: 'csvFile', label: 'Multiple Locations' }
    // ]


    const partnerTypes = [
        { value: 'text', label: 'Single Location' },
        { value: 'csvFile', label: 'Multiple Locations' }
    ]

    const roles = [
        { value: 'text', label: 'Admin' },
        { value: 'csvFile', label: 'Nomral User' }
    ]

    return (
        <div>
            <h3><strong>Create New User</strong></h3>
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
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <label htmlFor="voucherNumber" className="mb-2 required">Store Name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                className="form-control"
                                value={storeName}
                                onChange={(e) => {
                                    setStoreName(e.target.value);
                                }}
                            />
                        </div>
                    </div>
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
                </div>

                <div className="row">                    
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
                        <label htmlFor="voucherNumber" className="mb-2 required">Email</label>
                        <input
                            type="text"
                            id="name"
                            required
                            className="form-control"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                </div>
                </div>
                <div className="row">                    
                <div className="col-md-6 mb-2">
                    <div className="form-group">
                        <label htmlFor="voucherNumber" className="mb-2 required">Mobile Number</label>
                        <input
                            type="number"
                            id="name"
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
                        <label htmlFor="voucherNumber" className="mb-2 required">Password</label>
                        <input
                            type="text"
                            id="name"
                            required
                            className="form-control"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                </div>
                </div>
                <div className="row">                    
                <div className="col-md-6 mb-2">
                    <div className="form-group">
                        <label htmlFor="voucherNumber" className="mb-2 required">Confirm Password</label>
                        <input
                            type="text"
                            id="name"
                            required
                            className="form-control"
                            value={confirmPassowrd}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="col-md-6 mb-2">
                    <div className="form-group">
                        <label htmlFor="voucherNumber" className="mb-2 required">Max Daily Limit</label>
                        <input
                            type="number"
                            id="name"
                            required
                            className="form-control"
                            value={maxDailyLimit}
                            onChange={(e) => {
                                setMaxDailyLimit(e.target.value);
                            }}
                        />
                    </div>
                </div>
                </div>

                <div className="col-md-6 mb-2">
                    <div className="form-group">
                    <Checkbox className="mx-2" id ="primaryEmail" onChange={e => setPrimaryEmail(e.checked)} checked={primaryEmail}></Checkbox>
                        <label htmlFor="primaryEmail" className="mt-2 ">Primary Email</label>
                        

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

export default CreateNewUser;
