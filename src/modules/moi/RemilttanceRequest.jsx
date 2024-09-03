import { useState } from "react";


const RemilttanceRequest = () => {
    // const [partner, setPartner] = useState({ value: 'text', label: 'Select Partner' });
    const [mobileNumber, setMobileNumber] = useState('')




    const handleReset = () => {
        setMobileNumber('')


    };

    return (
        <div>
            <h3><strong>Remilltance Request</strong></h3>
            <form
                action=""
                method="post"
                onSubmit={(e) => {
                    e.preventDefault();
                    // handleimeiDetailsearch();
                }}
            >
                <div className="row">
                    <div className="col-md-6 mb-2 d-flex justify-content-center align-items-center w-100">
                        <div className="form-group text-center" style={{ width: '50%' }}>
                            <label htmlFor="parnter" className="mb-2 required">Mobile Number</label>
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
                </div>
                <div className="row">
                    <div className="col-md-6 mb-2 d-flex justify-content-center align-items-center w-100">
                        <div className="form-group d-flex mt-3">
                            <input type="submit" value="Submit" className="btn btn-round bg-red text-bold" />
                            <input
                                type="button"
                                value="Rest"
                                onClick={handleReset}
                                className="btn btn-round bg-black text-white text-bold mx-2"
                                // onClick={handleReset}
                            />
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default RemilttanceRequest;
