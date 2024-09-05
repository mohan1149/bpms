import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import Select from 'react-select';
const AddAdmin = () => {
    const { t } = useTranslation();
    let paymentmodes = [
        {
            label:t('monthly'),
            value:'MONTH',
        },
        {
            label:t('yearly'),
            value:'YEAR',
        },
    ];
    return (
        <div>
            <div className="glass-card p-3">
                <div className="d-flex jcsb">
                    <div className='mt-2 mb-2'>
                        <h4>{t('add_new_admin')}</h4>
                    </div>
                    <div>
                        <Link to='/admins' className="link-btn">
                            {t('back')}
                        </Link>
                    </div>
                </div>
                <div>
                    <hr />
                    <form action="">
                        <div className="row">
                            <div className="col-12">
                                <h5 className='mt-2 mb-3 opacity'>{t('admin_basic_deatils')}</h5>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="fullName" className='required mb-1' >{t('full_name')}</label>
                                    <input type="text" id="fullName" className='form-control' required />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="username" className='required mb-1' >{t('username')}</label>
                                    <input type="text" className='form-control' id="username" required />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="email" className='required mb-1' >{t('email')}</label>
                                    <input type="email" className='form-control' id="email" required />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="phone" className='required mb-1' >{t('phone')}</label>
                                    <input type="number" className='form-control' id="phone" required />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="password" className='required mb-1' >{t('password')}</label>
                                    <input type="password" className='form-control' id="password" required />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="confirmPassword" className='required mb-1' >{t('confirm_password')}</label>
                                    <input type="password" className='form-control' id="confirmPassword" required />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="maxBranches" className='required mb-1' >{t('max_branches')}</label>
                                    <input type="number" className='form-control' id="maxBranches" required />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="maxEmps" className='required mb-1' >{t('max_employess')}</label>
                                    <input type="number" className='form-control' id="maxEmps" required />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="address" className='required mb-1' >{t('address')}</label>
                                    <input type="address" className='form-control' id="address" required />
                                </div>
                            </div>
                            <div className="col-12">
                                <h5 className='mt-2 mb-3 opacity'>{t('admin_payment_details')}</h5>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="currencySymbol" className='required mb-1' >{t('currency_symbol')}</label>
                                    <input type="text" className='form-control' id="currencySymbol" required />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="decimalPoints" className='required mb-1' >{t('decimal_points')}</label>
                                    <input type="number" className='form-control' id="decimalPoints" required />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="paymentMode" className='required mb-1' >{t('payment_mode')}</label>
                                    <Select
                                        options={paymentmodes}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="paymentAmount" className='required mb-1' >{t('payment_amount')}</label>
                                    <input type="number" className='form-control' id="paymentAmount" required />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="gracePeriod" className='required mb-1' >{t('grace_period')}</label>
                                    <input type="number" className='form-control' id="gracePeriod" required />
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <input type="submit" value={t('add_admin')} className='btn save-btn' />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default AddAdmin;