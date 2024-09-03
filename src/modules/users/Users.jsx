import React from 'react';
import { useTranslation } from 'react-i18next';

const Users = () =>{
    const { t } = useTranslation();

    return(
        <div>
            <h2>{t('users')}</h2>
        </div>
    );
}
export default Users;