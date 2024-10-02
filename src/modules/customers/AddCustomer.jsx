import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';

const AddCustomer = () => {
    const { t } = useTranslation();
    const [status, setStatus] = useState(true);
    const [attachWallet, setAttachWallet] = useState(false);
    return (
        <div className="p-3 glass-card">
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
                <form action="">
                    <div className="row">
                        <div className="col-md-4 mt-2">
                            <div className="form-group">
                                <label htmlFor="fullname" className='mb-1 required'>{t('full_name')}</label>
                                <input type="text" id='fullname' className='form-control' required />
                            </div>
                        </div>
                        <div className="col-md-4 mt-2">
                            <div className="form-group">
                                <label htmlFor="phone" className='mb-1 required'>{t('phone')}</label>
                                <InputNumber id='phone' className='pr-input' useGrouping={false} required />
                            </div>
                        </div>
                        <div className="col-md-4 mt-2">
                            <div className="form-group">
                                <label htmlFor="alternate_phone" className='mb-1 ='>{t('alternate_phone')}</label>
                                <InputNumber id='alternate_phone' className='pr-input' useGrouping={false} />
                            </div>
                        </div>
                        <div className="col-md-4 mt-2">
                            <div className="form-group">
                                <label htmlFor="email" className='mb-1 required'>{t('email')}</label>
                                <input type="email" id='email' className='form-control' required />
                            </div>
                        </div>
                        <div className="col-md-4 mt-2">
                            <div className="form-group">
                                <label htmlFor="address" className='mb-1 required'>{t('address')}</label>
                                <input type="text" id='address' className='form-control' required />
                            </div>
                        </div>
                        <div className="col-md-4 mt-2">
                            <div className="form-group">
                                <label htmlFor="address" className='mb-1'>{t('subscription_plan')}</label>
                                <Select options={[]} id='subscription_plan' className='pr-input' />
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