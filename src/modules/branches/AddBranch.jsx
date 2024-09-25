import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Button } from 'primereact/button';
import { getPaymentTypes, addBranch } from '../../apis/services';
import { Avatar } from 'primereact/avatar';
import { Calendar } from 'primereact/calendar';
import { getTimeStamp } from '../../helpers/helpers';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
const AddBranch = () => {
    const { t } = useTranslation();
    const toast = useRef();
    const [branchName, setBranchName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [paymentTypes, setPaymentTypes] = useState([]);
    const [branchPaymentTypes, setBranchPaymentTypes] = useState([]);
    const [openingTime, setOpeningTime] = useState();
    const [closingTime, setClosingTime] = useState();
    const [branchImage, setBranchImage] = useState();
    const [status, setStatus] = useState(true);

    useEffect(() => {
        loadPaymentTypes();
    }, []);
    const loadPaymentTypes = async () => {
        try {
            const res = await getPaymentTypes(1);
            setPaymentTypes(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleAddBranch = async () => {
        try {
            let paymentMethods = branchPaymentTypes.map((e) => { return { id: e.id } });
            let formData = new FormData();
            formData.append('branchName', branchName);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('address', address);
            formData.append('openingTime', getTimeStamp(openingTime));
            formData.append('closingTime', getTimeStamp(closingTime));
            formData.append('status',status ? 1: 0);
            formData.append('created_at', getTimeStamp(new Date()));
            formData.append('updated_at', getTimeStamp(new Date()));
            formData.append('paymentTypes', JSON.stringify(paymentMethods));
            formData.append('branchImage', branchImage);
            const res = await addBranch(formData);
            if (res.data.staus) {
                toast.current.show({ severity: 'success', summary: t('success'), detail: t(res.data.message), life: 3000 });
            } else {
                toast.current.show({ severity: 'error', summary: t('error'), detail: t(res.data.message), life: 3000 });
            }

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div>
            <Toast ref={toast} />
            <div className="glass-card p-3">
                <div className="d-flex jcsb">
                    <div className='mt-2 mb-2'>
                        <h4>{t('add_new_branch')}</h4>
                    </div>
                    <div className='p-2'>
                        <Link to='/branches' className="link-btn">
                            {t('back')}
                        </Link>
                    </div>
                </div>
                <div>
                    <hr />
                    <form action=""
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAddBranch();
                        }}
                    >
                        <div className="row">
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="branchName" className='required mb-1' >{t('branch_name')}</label>
                                    <input type="text" id="branchName" className='form-control' required
                                        value={branchName}
                                        onChange={(e) => { setBranchName(e.target.value) }}
                                    />
                                </div>
                            </div>

                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="email" className='required mb-1' >{t('email')}</label>
                                    <input type="email" className='form-control' id="email" required
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="phone" className='required mb-1' >{t('phone')}</label>
                                    <input type="number" className='form-control' id="phone" required
                                        value={phone}
                                        onChange={(e) => { setPhone(e.target.value) }}
                                    />
                                </div>
                            </div>


                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="address" className='required mb-1' >{t('address')}</label>
                                    <input type="address" className='form-control' id="address" required
                                        value={address}
                                        onChange={(e) => { setAddress(e.target.value) }}
                                    />
                                </div>
                            </div>

                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="image" className=' mb-1' >{t('opening_time')}</label>
                                    <Calendar timeOnly className='pr-input' hourFormat="12"
                                        value={openingTime}
                                        onChange={(e) => {
                                            setOpeningTime(e.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="image" className=' mb-1' >{t('closing_time')}</label>
                                    <Calendar timeOnly className='pr-input' hourFormat="12"
                                        value={closingTime}
                                        onChange={(e) => {
                                            setClosingTime(e.value);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="col-8 mb-2">
                                <div className="form-group">
                                    <label htmlFor="payment_types" className='required mb-1' >{t('payment_types')}</label>
                                    <Select options={paymentTypes} id="payment_types" isMulti={true} required
                                        placeholder={t('choose_payment_types')}
                                        onChange={(e) => {
                                            setBranchPaymentTypes(e);
                                        }}
                                        getOptionLabel={(e) => {
                                            return (
                                                <div className='d-flex align-items-center'>
                                                    <Avatar image={e.payment_image} size="normal" imageAlt={e.payment_title} />
                                                    <span className='mx-2'>{e.payment_title}</span>
                                                </div>
                                            )
                                        }}
                                        getOptionValue={(e) => e.id}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="image" className='required mb-1' >{t('image')}</label>
                                    <input type="file" className='form-control pr-input' id="image" required accept="image/*"
                                        onChange={(e) => {
                                            setBranchImage(e.target.files[0]);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 mt-2">
                                <div className="d-flex">
                                    <div className="flex align-items-center">
                                        <Checkbox inputId="status" name="status" checked={status} className='mx-1' 
                                            onChange={()=>{
                                                setStatus(!status);
                                            }}
                                        />
                                        <label htmlFor="status" className="ml-2">{t('enable_for_use')}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <Button type='submit' className='p-btn'>{t('add_branch')}</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default AddBranch;