import React, { useEffect, useState,useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import { getCustomerGroups, storeCustomer } from '../../apis/services';
import { getTimeStamp } from '../../helpers/helpers';
import { Toast } from 'primereact/toast';
const AddCustomer = () => {
    const { t } = useTranslation();
    const toast = useRef();
    const [status, setStatus] = useState(true);
    const [attachWallet, setAttachWallet] = useState(false);
    const [customerGroups, setCustomerGroups] = useState([]);
    const [fullname, setFullname] = useState();
    const [phone, setPhone] = useState();
    const [phone2, setPhone2] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [plan, setPlan] = useState();
    useEffect(() => {
        loadCustomerGroups();
    }, []);
    const loadCustomerGroups = async () => {
        try {
            const res = await getCustomerGroups(1);
            setCustomerGroups(res.data.data);
        } catch (error) {

        }
    }
    const handleAddCustomer = async () => {
        try {
            let data = {
                fullname: fullname,
                phone: phone,
                phone2: phone2,
                email: email,
                address: address,
                subscription: plan?.id,
                status: status,
                attachWallet: attachWallet,
                created_at: getTimeStamp(new Date()),
                updated_at: getTimeStamp(new Date()),
            }
            const res = await storeCustomer(data);
            if (res.data.status) {
                toast.current.show({ severity: 'success', summary: t('success'), detail: t(res.data.message), life: 3000 });
            } else {
                toast.current.show({ severity: 'error', summary: t('error'), detail: t(res.data.message), life: 3000 });
            }

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className="p-3 glass-card">
            <Toast ref={toast}/>
            <div className="d-flex jcsb">
                <div className='mt-2 mb-2'>
                    <h4>{t('add_customer')}</h4>
                </div>
                <div className='p-2'>
                    <Link to='/customers' className="link-btn">
                        {t('back')}
                    </Link>
                </div>
            </div>
            <div className="p-3">
                <form action=""
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddCustomer();
                    }}
                >
                    <div className="row">
                        <div className="col-md-4 mt-2">
                            <div className="form-group">
                                <label htmlFor="fullname" className='mb-1 required'>{t('full_name')}</label>
                                <input type="text" id='fullname' className='form-control' required
                                    onChange={(e) => {
                                        setFullname(e.target.value);
                                    }}
                                    value={fullname}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 mt-2">
                            <div className="form-group">
                                <label htmlFor="phone" className='mb-1 required'>{t('phone')}</label>
                                <InputNumber id='phone' className='pr-input' useGrouping={false} required
                                    onChange={(e) => {
                                        setPhone(e.value);
                                    }}
                                    value={phone}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 mt-2">
                            <div className="form-group">
                                <label htmlFor="alternate_phone" className='mb-1 ='>{t('alternate_phone')}</label>
                                <InputNumber id='alternate_phone' className='pr-input' useGrouping={false}
                                    onChange={(e) => {
                                        setPhone2(e.value);
                                    }}
                                    value={phone2}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 mt-2">
                            <div className="form-group">
                                <label htmlFor="email" className='mb-1 required'>{t('email')}</label>
                                <input type="email" id='email' className='form-control' required
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    value={email}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 mt-2">
                            <div className="form-group">
                                <label htmlFor="address" className='mb-1 required'>{t('address')}</label>
                                <input type="text" id='address' className='form-control' required
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                    }}
                                    value={address}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 mt-2">
                            <div className="form-group">
                                <label htmlFor="address" className='mb-1'>{t('subscription_plan')}</label>
                                <Select options={customerGroups} id='subscription_plan' className='pr-input'
                                    getOptionLabel={(i) => i.group_title}
                                    getOptionValue={(i) => i.id}
                                    isClearable={true}
                                    onChange={(e) => {
                                        setPlan(e);
                                    }}
                                    value={plan}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 mt-3">
                            <div className="d-flex">
                                <div className="flex align-items-center">
                                    <Checkbox inputId="status" name="status" checked={status} className='mx-1'
                                        onChange={() => {
                                            setStatus(!status);
                                        }}
                                    />
                                    <label htmlFor="status" className="ml-2">{t('enable_customer')}</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mt-3">
                            <div className="d-flex">
                                <div className="flex align-items-center">
                                    <Checkbox inputId="attach_wallet" name="attach_wallet" checked={attachWallet} className='mx-1'
                                        onChange={() => {
                                            setAttachWallet(!attachWallet);
                                        }}
                                    />
                                    <label htmlFor="attach_wallet" className="ml-2">{t('attach_wallet')}</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            <Button type='submit' label={t('add_customer')} className='p-btn' />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCustomer;