import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getCustomerDetails } from '../../apis/services';
import { getFormattedCurrency, getTimeStamp } from '../../helpers/helpers';
import { Button } from 'primereact/button';
import DeleteModalContent from '../../commons/DeleteModalContent';
import { useStore } from 'react-redux';
import { setShowDeleteDialog } from '../../redux/reducer';
import { InputSwitch } from 'primereact/inputswitch';
import { Tag } from 'primereact/tag';

const ViewCustomer = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const customer = JSON.parse(location.state);
    const [customerDetails, setCustomerDetails] = useState();
    useEffect(() => {
        loadCustmerDetails();

    }, []);
    const loadCustmerDetails = async () => {
        try {
            const res = await getCustomerDetails(customer.id);
            setCustomerDetails(res.data.data);
        } catch (error) {

        }
    }
    return (
        <div className="p-2">
            <div className="row">
                <div className="col-md-6">
                    <div className="glass-card p-3">
                        <h4 className='mt-2 mb-3'>{t('custmer_details')}</h4>
                        <table className='table'>
                            <tbody>
                                <tr><td><strong>{t('full_name')}</strong></td><td>{customer.full_name}</td></tr>
                                <tr><td><strong>{t('phone')}</strong></td><td>{customer.phone}</td></tr>
                                <tr><td><strong>{t('phone2')}</strong></td><td>{customer.phone_2}</td></tr>
                                <tr><td><strong>{t('email')}</strong></td><td>{customer.email}</td></tr>
                                <tr><td><strong>{t('address')}</strong></td><td>{customer.address}</td></tr>
                                <tr><td><strong>{t('subscription_plan')}</strong></td><td>
                                    {customer.subscription_plan === 0 ? <Tag severity="warning" value={t('no')}></Tag> : <Tag severity="success" value={t('yes')}></Tag>}
                                </td></tr>
                                <tr><td><strong>{t('wallet')}</strong></td><td>
                                    {customer.wallet === 0 ? <Tag severity="warning" value={t('no')}></Tag> : <Tag severity="success" value={t('yes')}></Tag>}
                                </td></tr>
                                <tr><td><strong>{t('created_at')}</strong></td><td>{getTimeStamp(new Date(customer.created_at))}</td></tr>
                            </tbody>
                        </table>
                        <div className="pt-3 pb-3">
                            <Link className='link-btn'
                                to="/customers/edit"
                                state={location.state}
                            >{t('edit_customer')}</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="glass-card p-3">
                        <h4 className='mt-2 mb-3'>{t('wallet_details')}</h4>
                        <div className="p-3 d-flex jcsb"
                            style={{
                                backgroundColor: '#000',
                                color: "#FFF",
                                borderRadius: 10,
                            }}
                        >
                            <div>
                                <h5 className='mb-2'>{t('balance')}</h5>
                                <h4><strong>{getFormattedCurrency(customerDetails?.walletDetails?.current_balance)}</strong></h4>
                            </div>
                            <div>
                                <Button
                                    className='p-btn'
                                    label={t('recharge')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="glass-card p-3 mt-3">
                        <h4 className='mt-2 mb-3'>{t('subscription_details')}</h4>
                        <div
                            style={{
                                backgroundColor: '#141B4D',
                                color: "#FFF",
                                borderRadius: 10,
                            }}
                        >
                            <div className="px-3 pt-3 d-flex jcsb">
                                <div>
                                    <h4><strong>{customer.group_title}</strong></h4>
                                    <h5 className='opacity'>{t(customerDetails?.subscriptionGroupDetails?.benefit_type)}</h5>
                                </div>

                                <div>
                                    <h2>{getFormattedCurrency(customer.group_cost)}</h2>
                                </div>
                            </div>
                            <div className='px-3'>
                                <h5 className=''>{t('orders')} - {customerDetails?.subscriptionGroupDetails?.how_many_orders} | {t('discount')} -  {customerDetails?.subscriptionGroupDetails?.discount}% | {t('amount')} - {getFormattedCurrency(customerDetails?.subscriptionGroupDetails?.free_amount)} </h5>
                            </div>
                            <Button severity='danger' className='rounded-btn mx-3 mb-3 mt-3' label={t('remove_subscription')} />
                            <Button severity='primary' className='rounded-btn mx-3 mb-3 mt-3' label={t('renew_subscription')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ViewCustomer;