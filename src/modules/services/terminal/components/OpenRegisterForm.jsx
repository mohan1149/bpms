import React, { useState } from 'react';
import { Button } from 'primereact/button';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { InputNumber } from 'primereact/inputnumber';
import { getTimeStamp } from '../../../../helpers/helpers';
import {openServiceRegsiter} from '../../../../apis/services';
const OpenRegisterForm = (props) => {
    const { t } = useTranslation();
    const [initialAmount, setInitialAmount] = useState(0);
    const [autoClose, setAutoClose] = useState({
        label: t('yes'),
        value: 1,
    });
    let autoCloseOptions = [
        {
            label: t('yes'),
            value: 1,
        },
        {
            label: t('no'),
            value: 0,
        }
    ];
    const handleOpenRegister = async () =>{
        try {
            let data = {
                initialAmount:initialAmount,
                autoClose:autoClose.value,
                created_at: getTimeStamp(new Date()),
                updated_at: getTimeStamp(new Date()),
            };
            const res = await openServiceRegsiter(data);
            localStorage.setItem('_register',res.data.data.id);
            props.openRegister();
        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <div>
            <div>
                <div className="p-3 glass-card">
                    <h4>{t('open_service_terminal')}</h4>
                    <form action=""
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleOpenRegister();
                        }}
                    >
                        <div className="mt-3">
                            <div className="row">
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="branch" className='mb-1 required'>{t('initial_amount')}</label>
                                        <InputNumber className='pr-input' required 
                                            value={initialAmount}
                                            onChange={(e)=>{
                                                setInitialAmount(e.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="auto_close" className='mb-1 required'>{t('auto_close')}</label>
                                        <Select className='pr-input' required options={autoCloseOptions} placeholder={t('auto_close')} 
                                            value={autoClose}
                                            onChange={(e)=>{
                                                setAutoClose(e);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 mb-3 mt-3">
                                    <Button label={'open_terminal'} className='p-btn' type='submit' />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default OpenRegisterForm;