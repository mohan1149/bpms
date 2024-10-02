import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getBranches } from '../../apis/services';
import { Avatar } from 'primereact/avatar';
import { getTimeFromString } from '../../helpers/helpers';
import { Button } from 'primereact/button';
import DeleteModalContent from '../../commons/DeleteModalContent';
import { useStore } from 'react-redux';
import { setShowDeleteDialog } from '../../redux/reducer';
import { InputSwitch } from 'primereact/inputswitch';


const Customers = () => {
    const { t } = useTranslation();
    return (
        <div className="p-3 glass-card">
            <div className="d-flex jcsb">
                <div className='mt-2 mb-2'>
                    <h4>{t('manage_customers')}</h4>
                </div>
                <div className='p-2'>
                    <Link to='/customers/add' className="link-btn">
                        {t('add_customer')}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Customers;