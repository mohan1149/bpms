import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { getServiceCategories, getBranches,getServiceVariations } from '../../apis/services';
import { InputNumber } from 'primereact/inputnumber';
const AddService = () => {
    const { t } = useTranslation();
    const [serviceCategories, setServiceCategories] = useState([]);
    const [selectedServiceCategory, setSelectedServiceCategory] = useState();
    const [branches, setBranches] = useState([]);
    const [selectedBranches, setSelectedBranches] = useState();
    const [serviceVariations, setServiceVariations] = useState([]);

    useEffect(() => {
        loadServiceCategories();
        loadBranches();
        loadServiceVariations();
    }, []);

    const loadServiceCategories = async () => {
        try {
            const res = await getServiceCategories();
            setServiceCategories(res.data.data);
        } catch (error) {

        }
    }
    const loadBranches = async () => {
        try {
            const res = await getBranches();
            setBranches(res.data.data);
        } catch (error) {

        }
    }
    const loadServiceVariations = async () =>{
        try {
            const res = await getServiceVariations();
            setServiceVariations(res.data.data);
        } catch (error) {
            
        }
    }

    return (
        <div className="glass-card p-3">
            <div className="d-flex jcsb">
                <div className='mt-2 mb-2'>
                    <h4>{t('add_new_service')}</h4>
                </div>
                <div className='p-2'>
                    <Link to='/services' className="link-btn">
                        {t('back')}
                    </Link>
                </div>
            </div>
            <div className="mt-2">
                <form action="">
                    <div className="row">
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <label htmlFor="serviceName" className='mb-1 required'>{t('service_title')}</label>
                                <input type="text" name="serviceName" id="serviceName" className='form-control' required />
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
                                <label htmlFor="duration" className='mb-1 required'>{t('service_duration_in_mins')}</label>
                                <input type="number" name="duration" id="duration" className='form-control' required />
                            </div>
                        </div>
                        <div className="col-md-8 mb-2">
                            <div className="form-group">
                                <label htmlFor="branches" className='mb-1 required'>{t('branches')}</label>
                                <Select options={branches} name="branches" id="branches" className='form-cotrol' required placeholder={t('choose_branches')}
                                    isMulti={true}
                                    getOptionLabel={(i) => i.branch.branch_name}
                                    getOptionValue={(i) => i.branch.id}
                                    value={selectedBranches}
                                    onChange={(e) => {
                                        setSelectedBranches(e.branch);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 m,b-2">
                            <div className="form-group">
                                <label htmlFor="service_charge" className='mb-1 required'>{t('service_charge')}</label>
                                <InputNumber id="service_charge"  useGrouping={false} maxFractionDigits={3} className='pr-input' />
                            </div>
                        </div>
                        <div className="col-md-4 m,b-2">
                            <div className="form-group">
                                <label htmlFor="serviceVariations" className='mb-1 required'>{t('service_variation')}</label>
                                <Select id="serviceVariations" className='pr-input' options={serviceVariations}
                                    getOptionLabel={(i) => i.variation_title}
                                    getOptionValue={(i) => i.id}
                                />
                            </div>
                        </div>
                        <div className="col-md-8 mb-2">
                            <div className="form-group">
                                <label htmlFor="serviceDesc" className='mb-1 required'>{t('service_desc')}</label>
                                <input type="text" name="serviceDesc" id="serviceDesc" className='form-control' required />
                            </div>
                        </div>
                        <div className="col-12 mb-2 mt-3">
                            <div className="form-group">
                                <Button type='submit' label={t('add_service')} className='p-btn'/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default AddService;