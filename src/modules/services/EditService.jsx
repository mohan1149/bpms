import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { Link, useLocation } from 'react-router-dom';
import Select from 'react-select';
import { getServiceCategories, getBranches, getServiceVariations, updateService } from '../../apis/services';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import { getTimeStamp } from '../../helpers/helpers';
import { Toast } from 'primereact/toast';
const EditService = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const service = JSON.parse(location.state);
    const toast = useRef();
    const [serviceCategories, setServiceCategories] = useState([]);
    const [selectedServiceCategory, setSelectedServiceCategory] = useState();
    const [serviceVariations, setServiceVariations] = useState([]);
    const [selectedVariation, setSelectedVariation] = useState({ id: service.service_variation });
    const [serviceImage, setServiceImage] = useState();
    const [serviceTitle, setServiceTitle] = useState(service.service_name);
    const [serviceDuration, setServiceDuration] = useState(service.service_duration);
    const [serviceCharge, setServiceCharge] = useState(service.service_price);
    const [serviceDiscount, setServiceDiscount] = useState(service.service_discount);
    const [serviceDesc, setServiceDesc] = useState(service.service_desc);
    const [status, setStatus] = useState(service.status === 1 ? true : false);
    useEffect(() => {
        loadServiceCategories();
        loadServiceVariations();
    }, []);

    const loadServiceCategories = async () => {
        try {
            const res = await getServiceCategories();
            setServiceCategories(res.data.data);
            setSelectedServiceCategory(res.data.data.filter((i) => service.service_category === i.id)[0]);
        } catch (error) {

        }
    }
    const loadServiceVariations = async () => {
        try {
            const res = await getServiceVariations();
            setServiceVariations(res.data.data);
            setSelectedVariation(res.data.data.filter((i) => service.service_variation === i.id)[0])
        } catch (error) {

        }
    }
    const handleEditService = async () => {
        try {
            let formData = new FormData();
            formData.append('id', service.id);
            formData.append('serviceTitle', serviceTitle);
            formData.append('serviceDesc', serviceDesc);
            formData.append('status', status ? 1 : 0);
            formData.append('serviceDiscount', serviceDiscount);
            formData.append('serviceImage', serviceImage);
            formData.append('serviceDuration', serviceDuration);
            formData.append('serviceCharge', serviceCharge);
            formData.append('serviceVariation', selectedVariation.id);
            formData.append('serviceCategory', selectedServiceCategory.id);
            formData.append('updated_at', getTimeStamp(new Date()));
            const res = await updateService(formData);
            if (res.data.status) {
                toast.current.show({ severity: 'success', summary: t('success'), detail: t(res.data.message), life: 3000 });
            } else {
                toast.current.show({ severity: 'error', summary: t('error'), detail: t(res.data.message), life: 3000 });
            }

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className="glass-card p-3">
            <Toast ref={toast} />
            <div className="d-flex jcsb">
                <div className='mt-2 mb-2'>
                    <h4>{t('edit_service')}</h4>
                </div>
                <div className='p-2'>
                    <Link to='/services' className="link-btn">
                        {t('back')}
                    </Link>
                </div>
            </div>
            <div className="mt-2">
                <form action=""
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleEditService();
                    }}
                >
                    <div className="row">
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <label htmlFor="serviceName" className='mb-1 required'>{t('service_name')}</label>
                                <input type="text" name="serviceName" id="serviceName" className='form-control' required
                                    value={serviceTitle}
                                    onChange={(e) => {
                                        setServiceTitle(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <label htmlFor="serviceCategory" className='mb-1 required'>{t('service_category')}</label>
                                <Select options={serviceCategories} name="serviceName" id="serviceName" className='form-cotrol' required placeholder={t('choose_service_category')}
                                    getOptionLabel={(i) => i.category_title}
                                    getOptionValue={(i) => i.id}
                                    value={selectedServiceCategory}
                                    onChange={(e) => {
                                        setSelectedServiceCategory(e);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 m,b-2">
                            <div className="form-group">
                                <label htmlFor="serviceVariations" className='mb-1 required'>{t('service_variation')}</label>
                                <Select id="serviceVariations" className='pr-input' options={serviceVariations}
                                    getOptionLabel={(i) => i.variation_title}
                                    getOptionValue={(i) => i.id}
                                    onChange={(e) => {
                                        setSelectedVariation(e);
                                    }}
                                    value={selectedVariation}
                                    placeholder={t('choose_variation')}

                                />
                            </div>
                        </div>
                        <div className="col-md-4 m,b-2">
                            <div className="form-group">
                                <label htmlFor="duration" className='mb-1 required'>{t('service_duration_in_mins')}</label>
                                <input type="number" name="duration" id="duration" className='form-control' required
                                    value={serviceDuration}
                                    onChange={(e) => {
                                        setServiceDuration(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <label htmlFor="service_charge" className='mb-1 required'>{t('service_charge_inc_all_taxes')}</label>
                                <InputNumber id="service_charge" useGrouping={false} maxFractionDigits={3} className='pr-input'
                                    value={serviceCharge}
                                    onChange={(e) => {
                                        setServiceCharge(e.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <label htmlFor="serviceDiscount" className='mb-1 required'>{t('discount')}</label>
                                <InputNumber id="serviceDiscount" useGrouping={false} maxFractionDigits={3} className='pr-input'
                                    value={serviceDiscount}
                                    onChange={(e) => {
                                        setServiceDiscount(e.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <label htmlFor="image" className='mb-1' >{t('image')}</label>
                                <input type="file" className='form-control pr-input' id="image" accept="image/*"
                                    onChange={(e) => {
                                        setServiceImage(e.target.files[0]);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-8 mb-2">
                            <div className="form-group">
                                <label htmlFor="serviceDesc" className='mb-1 required'>{t('service_desc')}</label>
                                <input type="text" name="serviceDesc" id="serviceDesc" className='form-control' required
                                    value={serviceDesc}
                                    onChange={(e) => {
                                        setServiceDesc(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
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
                        <div className="col-12 mb-2 mt-3">
                            <div className="form-group">
                                <Button type='submit' label={t('update_service')} className='p-btn' />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default EditService;