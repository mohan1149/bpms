import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { InputNumber } from 'primereact/inputnumber';
import Select from 'react-select';
import { Button } from 'primereact/button';
import { getTimeStamp } from '../../../helpers/helpers';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import { updateCustomerGroup } from '../../../apis/services';

const EditCustomerGroup = () => {
    const { t } = useTranslation();
    const toast = useRef();
    const location = useLocation();
    const group = JSON.parse(location.state);
    const [groupTitle, setGroupTitle] = useState(group.group_title);
    const [groupDesc, setGroupDesc] = useState(group.group_desc);
    const [groupCost, setGroupCost] = useState(group.group_cost);
    const [benefitType, setBenefitType] = useState({ value: group.benefit_type, label: t(group.benefit_type) });
    const [numberOfOrders, setNumberOfOrders] = useState(group.how_many_orders);
    const [discount, setDiscount] = useState(group.discount);
    const [amount, setAmount] = useState(group.free_amount);
    const [status, setStatus] = useState(group.status === 1 ? true : false);
    const benefitTypes = [
        {
            value: 'free_amount',
            label: t('free_amount')
        },
        {
            value: 'discount',
            label: t('discount')
        },
        {
            value: 'free_orders',
            label: t('free_orders')
        },
    ];
    const handleEditSubscriptionGroup = async () => {
        try {
            let data = {
                id:group.id,
                groupCost: groupCost,
                groupDesc: groupDesc,
                groupTitle: groupTitle,
                benefitType: benefitType.value,
                amount: amount,
                discount: discount,
                status: status,
                numberOfOrders: numberOfOrders,
                updated_at: getTimeStamp(new Date()),
            }
            const res = await updateCustomerGroup(data);
            if (res.data.staus) {
                toast.current.show({ severity: 'success', summary: t('success'), detail: t(res.data.message), life: 3000 });
            } else {
                toast.current.show({ severity: 'error', summary: t('error'), detail: t(res.data.message), life: 3000 });
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className="p-3 glass-card">
            <Toast ref={toast} />
            <div className="d-flex jcsb">
                <div className='mt-2 mb-2'>
                    <h4>{t('edit_customer_subs_group')}</h4>
                </div>
                <div className='p-2'>
                    <Link to='/customers/groups' className="link-btn">
                        {t('back')}
                    </Link>
                </div>
            </div>
            <div className='p-3'>
                <form action=""
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleEditSubscriptionGroup();
                    }}
                >
                    <div className="row">
                        <div className="col-md-6 mt-2">
                            <div className="form-group">
                                <label htmlFor="groupTitle" className='mb-1 required'>{t('group_title')}</label>
                                <input type="text" className='form-control' required id='groupTitle'
                                    value={groupTitle}
                                    onChange={(e) => {
                                        setGroupTitle(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mt-2">
                            <div className="form-group">
                                <label htmlFor="groupDesc" className='mb-1 required'>{t('group_desc')}</label>
                                <input type="text" className='form-control' required id='groupDesc'
                                    value={groupDesc}
                                    onChange={(e) => {
                                        setGroupDesc(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mt-2">
                            <div className="form-group">
                                <label htmlFor="groupCost" className='mb-1 required'>{t('group_cost')}</label>
                                <InputNumber useGrouping={false} maxFractionDigits={3} required id='groupCost' className='pr-input'
                                    value={groupCost}
                                    onChange={(e) => {
                                        setGroupCost(e.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mt-2">
                            <div className="form-group">
                                <label htmlFor="benefitType" className='mb-1 required'>{t('benefitType')}</label>
                                <Select options={benefitTypes} required id='benefitType' className='pr-input'
                                    placeholder={t('choose_benefit_type')}
                                    onChange={(e) => {
                                        setBenefitType(e);
                                    }}
                                    value={benefitType}
                                />
                            </div>
                        </div>
                        {
                            benefitType.value === 'free_amount' &&
                            <div className="col-md-6 mt-2">
                                <div className="form-group">
                                    <label htmlFor="amount" className='mb-1 required'>{t('amount')}</label>
                                    <InputNumber useGrouping={false} maxFractionDigits={3} required id='amount' className='pr-input'
                                        value={amount}
                                        onChange={(e) => {
                                            setAmount(e.value);
                                        }}
                                    />
                                </div>
                            </div>
                        }
                        {
                            (benefitType.value === 'discount' || benefitType.value === 'free_orders') &&
                            <div className="col-md-6 mt-2">
                                <div className="form-group">
                                    <label htmlFor="numberOfServices" className='mb-1 required'>{t('numberOfServices')}</label>
                                    <InputNumber useGrouping={false} required id='numberOfServices' className='pr-input'
                                        value={numberOfOrders}
                                        onChange={(e) => {
                                            setNumberOfOrders(e.value);
                                        }}
                                    />
                                </div>
                            </div>
                        }
                        {
                            benefitType.value === 'discount' &&
                            <div className="col-md-6 mt-2">
                                <div className="form-group">
                                    <label htmlFor="discount" className='mb-1 required'>{t('discount')}</label>
                                    <InputNumber useGrouping={false} maxFractionDigits={3} required id='discount' className='pr-input'
                                        value={discount}
                                        onChange={(e) => {
                                            setDiscount(e.value);
                                        }}
                                    />
                                </div>
                            </div>
                        }
                        <div className="col-md-12 mt-2">
                            <div className="d-flex">
                                <div className="flex align-items-center">
                                    <Checkbox inputId="status" name="status" checked={status} className='mx-1'
                                        onChange={() => {
                                            setStatus(!status);
                                        }}
                                    />
                                    <label htmlFor="status" className="ml-2">{t('enable_for_use')}</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mt-3">
                            <Button type="submit" className='p-btn' label={t('update_group')} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditCustomerGroup;