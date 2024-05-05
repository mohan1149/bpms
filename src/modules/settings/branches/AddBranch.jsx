import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { t } from "i18next";
import { storeBranch } from '../../../apis/services';
const AddBranch = (props) => {
    const [branchName, setBranchName] = useState();
    const [branchPhone, setBranchPhone] = useState();
    const [branchAddress, setBranchAddress] = useState();
    const handleAddBranchFormSubmission = async () => {
        try {
            let branchData = {
                branchName: branchName,
                branchPhone: branchPhone,
                branchAddress: branchAddress
            }
            const res = storeBranch(branchData);
            props.onSubmit();
            props.onClose();
        } catch (error) {
            props.onClose();
        }
    }
    return (
        <form action=""
            onSubmit={(e) => {
                e.preventDefault();
                handleAddBranchFormSubmission();
            }}
        >
            <Modal.Header>
                <Modal.Title>{t('create_branch')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row p-2">
                    <div className="col-12 mb-2">
                        <div className="form-group">
                            <label htmlFor="branch_name" className="mb-2 required">{t('branch_name')}</label>
                            <input type="text" name="branch_name" id="branch_name" className="form-control" required
                                onChange={(e) => {
                                    setBranchName(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-12 mb-2">
                        <div className="form-group">
                            <label htmlFor="branch_phone" className="mb-2 required">{t('branch_phone')}</label>
                            <input type="text" name="branch_phone" id="branch_phone" className="form-control" required
                                onChange={(e) => {
                                    setBranchPhone(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-12 mb-2">
                        <div className="form-group">
                            <label htmlFor="branch_address" className="mb-2 required">{t('branch_address')}</label>
                            <input type="text" name="branch_address" id="branch_address" className="form-control" required
                                onChange={(e) => {
                                    setBranchAddress(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <input type="submit" value={t('save')} className="btn btn-red btn-round text-bold pb-2 px-4" />
                <input type="button" onClick={() => { props.onClose() }} value={t('cancel')} className="btn btn-black btn-round text-bold pb-2 px-4" />
            </Modal.Footer>
        </form>
    );


}

export default AddBranch;