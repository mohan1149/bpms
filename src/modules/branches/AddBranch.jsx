import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Button } from 'primereact/button';
import { useStore } from 'react-redux';
import { getPaymentTypes } from '../../apis/services';
import { Avatar } from 'primereact/avatar';

const AddBranch = () => {
    const { t } = useTranslation();
    const store = useStore();
    const [branchName, setBranchName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [paymentTypes, setPaymentTypes] = useState([]);

    const user = store.getState().app.user;

    useEffect(() => {
        loadPaymentTypes();
    }, []);
    const loadPaymentTypes = async () => {
        try {
            const res = await getPaymentTypes();
            setPaymentTypes(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }
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

    return (
        <div>
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
                                    <label htmlFor="image" className='required mb-1' >{t('image')}</label>
                                    <input type="file" className='form-control' id="image" required />
                                </div>
                            </div>

                            <div className="col-12 mb-2">
                                <div className="form-group">
                                    <label htmlFor="payment_types" className='required mb-1' >{t('payment_types')}</label>
                                    <Select options={paymentTypes} id="payment_types" isMulti={true} required
                                        placeholder={t('choose_payment_types')}
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