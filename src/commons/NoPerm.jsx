import React from 'react';
import { useTranslation } from 'react-i18next';
const NoPerm = () =>{
    const {t} = useTranslation();
    return(
        <div className="p-3 glass-card">
            <div className="p-4">
                <h5 className='text-center'>{t('no_perm_message')}</h5>
            </div>
        </div>
    );
}

export default NoPerm;