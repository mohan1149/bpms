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

const ViewService = () => {
    const {t} = useTranslation();
    const location = useLocation();
    const service = JSON.parse(location.state);
    console.log(service);
    
    return (
        <div className="p-3 glass-card">
            <h3>Viewn Customer</h3>
        </div>
    );
}
export default ViewService;