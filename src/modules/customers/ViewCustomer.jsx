import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getCustomers } from '../../apis/services';
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
            </div>
        </div>
    );
}
export default ViewCustomer;