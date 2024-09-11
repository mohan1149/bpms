import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { useStore } from 'react-redux';
import { storePaymentType } from './../../apis/services';
import { Modal } from 'react-bootstrap';
import { Checkbox } from "primereact/checkbox";
import { useEffect } from 'react';
const PaymentTypes = () => {
    const { t } = useTranslation();
    const store = useStore();
    const [branchName, setBranchName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const user = store.getState().app.user;

    const [showAddBranchModal, setShowAddBranchModal] = useState(false);

    const handleAddBranch = async () => {
        try {
            let data = {
                created_by: user.id,
                branchName: branchName,
                username: username,
                email: email,
                phone: phone,
                address: address,
            }
            console.log(data);

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(()=>{
        console.log('swsws');
        
    },[]);
    return (
        <div>
            <div className="glass-card p-3">
                <div className="d-flex jcsb">
                    <div className='mt-2 mb-2'>
                        <h4>{t('add_new_admin')}</h4>
                    </div>
                    <div className='p-2'>
                        <Button className='p-btn'
                            onClick={() => {
                                setShowAddBranchModal(true);
                            }}
                        > {t('add_payment_type')}</Button>
                    </div>
                </div>
                <Modal
                    show={showAddBranchModal}
                >
                    <div className='p-4'>
                        <AddPaymentType

                            cancel={() => {
                                setShowAddBranchModal(false);
                            }}
                        />
                    </div>
                </Modal>
                <div>

                </div>
            </div>
        </div>
    );
}
const AddPaymentType = (props) => {
    const { t } = useTranslation();
    const [paymentTitle, setPaymentTitle] = useState();
    const [image, setImage] = useState();
    const [trackField, setTrackField] = useState(true);

    const handleAddPaymentType = async () =>{
        try {
            let formData = new FormData();
            formData.append('paymentTitle',paymentTitle);
            formData.append('paymentImage',image);
            formData.append('trackField',trackField);
            const res = await storePaymentType(formData);
            console.log(res.data);
            
        } catch (error) {
            
        }
    }
    return (
        <form action=""
            onSubmit={(e) => {
                e.preventDefault();
                handleAddPaymentType();
            }}
        >
            <div className="row">
                <div className="col-12">
                    <div className="d-flex jcsb align-items-center">
                        <h5 className='mt-2 mb-3 opacity'>{t('add_new_payment_type')}</h5>
                        <Button raised className='icon-btn' severity='secondary' type='button'
                            onClick={() => {
                                props.cancel();
                            }}
                        >
                            <span className="material-symbols-outlined">
                                cancel
                            </span>
                        </Button>
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="form-group">
                        <label htmlFor="paymentTitle" className='required mb-1' >{t('payment_title')}</label>
                        <input type="text" id="paymentTitle" className='form-control' required
                            value={paymentTitle}
                            onChange={(e) => { setPaymentTitle(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="form-group">
                        <label htmlFor="image" className='required mb-1' >{t('image')}</label>
                        <input type="file" className='form-control' id="image" required 
                            onChange={(e)=>{
                                setImage(e.target.files[0]);
                            }}
                        />
                    </div>
                </div>
                <div className="col-1 mb-2 mt-2">
                    <div className="d-flex align-items-center">
                        <Checkbox inputId="trackField" name="trackField" id="trackField" checked={trackField}
                            onChange={() => {
                                setTrackField(!trackField);
                            }}
                        />
                        <label htmlFor="trackField" className="mx-2">{t('require_track_field')}</label>
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <Button type='submit' className='p-btn'>{t('save')}</Button>
                </div>
            </div>
        </form>
    );
}
export default PaymentTypes;