import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Button } from 'primereact/button';
import { getPaymentTypes, addBranch } from '../../../apis/services';
import { Avatar } from 'primereact/avatar';
import { Calendar } from 'primereact/calendar';
import { getTimeStamp } from '../../../helpers/helpers';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';

const Roles = () => {
    const { t } = useTranslation();
    return (
        <div className="p-3 glass-card">
            <div className="d-flex jcsb">
                <div className='mt-2 mb-2'>
                    <h4>{t('manage_roles')}</h4>
                </div>
                <div className='p-2'>
                    <Link to='/employees/roles/add' className="link-btn">
                        {t('add_role')}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Roles;