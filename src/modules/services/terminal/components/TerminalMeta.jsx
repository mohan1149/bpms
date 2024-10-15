import React from 'react';
import { useTranslation } from 'react-i18next';
const TerminalMeta = (props) => {
    const { t } = useTranslation();
    const meta = props;
    return (
        <div
            style={{
                position: 'absolute',
                top: '90px'
            }}
        >
            <h6 className=''>
                <span> <strong>{t('branch')}</strong> - {props.branch}</span> |
                <span> <strong>{t('user')}</strong> - {props.user}</span> |
                <span> <strong>{t('date')}</strong> - {new Date().toDateString()}</span>
            </h6>
        </div>
    );

}

export default TerminalMeta;