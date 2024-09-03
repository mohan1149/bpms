import { useState } from "react";
import Select from 'react-select';
import { Calendar } from "primereact/calendar";

const ManagePartners = () => {
    // const [partner, setPartner] = useState({ value: 'text', label: 'Select Partner' });
    const [partner, setPartner] = useState({ value: 'text', label: 'Select Partner' });




    const handleReset = () => {
        // setPartner('');


    };






    const partnerTypes = [

        { value: 'text', label: 'abc' },
        { value: 'csvFile', label: 'xyz' }

    ]

    return (
        <div>
            <h3><strong>Manage Partner</strong></h3>
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
                            <label htmlFor="parnter" className="mb-2 required">Partner</label>
                            <Select
                                options={partnerTypes}
                                id="searchType"
                                onChange={(e) => {
                                    setPartner(e);
                                }}
                                value={partner}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-2 d-flex justify-content-center align-items-center w-100">
                        <div className="form-group d-flex mt-3">
                            <input type="submit" value="Enable Earn points" className="btn btn-round bg-red text-bold" />
                            <input
                                type="button"
                                value="Disable Earn Points"
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

export default ManagePartners;
