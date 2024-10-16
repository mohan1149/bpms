import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getServiceLocations, getBranches, addServiceToLocation, deleteServiceFromLocation, updateServiceLocationDetails } from '../../apis/services';
import { getFormattedCurrency, getTimeStamp } from '../../helpers/helpers';
import { Button } from 'primereact/button';
import DeleteModalContent from '../../commons/DeleteModalContent';
import { useStore } from 'react-redux';
import { setShowDeleteDialog } from '../../redux/reducer';
import { InputSwitch } from 'primereact/inputswitch';
import { Tag } from 'primereact/tag';
import { Avatar } from 'primereact/avatar';
import Select from 'react-select';
import { InputNumber } from 'primereact/inputnumber';
import { Modal } from 'react-bootstrap';
import { Checkbox } from 'primereact/checkbox';


const ViewService = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const service = JSON.parse(location.state);
    const [serviceLocations, setServiceLocations] = useState([]);
    const [branches, setBranches] = useState([]);
    const [branch, setBranch] = useState();
    const [price, setPrice] = useState(service.service_price);
    const [status, setStatus] = useState();
    const [discount, setDiscount] = useState(service.service_discount);
    const [locationPrice, setLocationPrice] = useState();
    const [locationDiscount, setLocationDiscount] = useState();
    const [serviceEditModal, setServiceEditModal] = useState({ show: false, item: '' });

    useEffect(() => {
        loadServiceLocations();
    }, []);
    const loadServiceLocations = async () => {
        try {
            const res = await getServiceLocations(service.id);
            setServiceLocations(res.data.data);
            loadBranches(res.data.data);
        } catch (error) {

        }
    }
    const loadBranches = async (existingBranches) => {
        try {
            const res = await getBranches(1);
            let existingBranchesId = existingBranches.map((e) => e.location_id);
            let nonExisting = res.data.data.filter((e) => !existingBranchesId.includes(e.branch.id));
            setBranches(nonExisting);
        } catch (error) {
            console.log(error);

        }
    }
    const handleAddServiceToLocation = async () => {
        try {
            let data = {
                service: service.id,
                location: branch.branch.id,
                price: price,
                discount: discount
            }
            await addServiceToLocation(data);
            loadServiceLocations();
            setBranch('');
        } catch (error) {
            console.log(error);

        }
    }
    const handleUpdateServiceToLocation = async () => {
        try {
            let data = {
                service: service.id,
                location: serviceEditModal.item.location_id,
                price: locationPrice,
                discount: locationDiscount,
                status: status,
            }
            setServiceEditModal({ showL: false, item: '' });
            await updateServiceLocationDetails(data);
            loadServiceLocations();
        } catch (error) {
            console.log(error);

        }
    }


    const handleDeleteServiceFromLocations = async (loc) => {
        try {
            let data = {
                service: loc.service_id,
                location: loc.location_id,
            }
            await deleteServiceFromLocation(data);
            loadServiceLocations();
        } catch (error) {

        }
    }
    return (
        <div className="row">
            <Modal
                show={serviceEditModal.show}
            >
                <div className="p-3">
                    <div className="d-flex jcsb align-items-center">
                        <h5>{t('edit_location_details')}</h5>
                        <Button className='icon-btn' severity='secondary'
                            onClick={() => {
                                setServiceEditModal({ show: false, item: '' });
                            }}
                        >
                            <span className="material-symbols-outlined">
                                close
                            </span>
                        </Button>
                    </div>
                    <form action=""
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateServiceToLocation();
                        }}
                    >
                        <div className="row p-2">
                            <div className="col-12 mt-2">
                                <div className="form-group">
                                    <label htmlFor="price" className='required'>{t('price')}</label>
                                    <InputNumber className='pr-input sm'
                                        placeholder={t('price')}
                                        value={locationPrice}
                                        useGrouping={false}
                                        maxFractionDigits={3}
                                        onChange={(e) => {
                                            setLocationPrice(e.value);
                                        }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 mt-2">
                                <div className="form-group">
                                    <label htmlFor="discount" className='required'>{t('discount')}</label>
                                    <InputNumber className='pr-input sm'
                                        placeholder={t('discount')}
                                        useGrouping={false}
                                        maxFractionDigits={3}
                                        value={locationDiscount}
                                        onChange={(e) => {
                                            setLocationDiscount(e.value);
                                        }}
                                        required
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
                            <div className="col-12 mt-3 mb-3">
                                <Button type='submit' label={t('update')} className='p-btn ' />
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
            <div className="col-md-5">
                <div className="p-3 glass-card">
                    <h4 className='mt-2 mb-3'>{t('service_details')}</h4>
                    <table className='table'>
                        <tbody>
                            <tr><td>{t('service_name')}</td><td><strong>{service.service_name}</strong></td></tr>
                            <tr><td>{t('service_category')}</td><td><strong>{service.category_title}</strong></td></tr>
                            <tr><td>{t('service_variation')}</td><td><strong>{service.variation_title}</strong></td></tr>
                            <tr><td>{t('service_duration')}</td><td><strong>{service.service_duration}{t('mins')}</strong></td></tr>
                            <tr><td>{t('service_price')}</td><td><strong>{getFormattedCurrency(service.service_price)}</strong></td></tr>
                            <tr><td>{t('discount')}</td><td><strong>{service.service_discount}%</strong></td></tr>
                        </tbody>
                    </table>
                    <div className='mt-4 pt-2 mb-3'>
                        <Link className='link-btn' to='/services/edit'
                            state={location.state}
                        >{t('edit_service')}</Link>
                    </div>
                </div>

            </div>
            <div className="col-md-7">
                <div className="p-3 glass-card">
                    <h4 className='mt-2 mb-3'>{t('service_location_details')}</h4>
                    <DataTable
                        emptyMessage={t('data_not_available')}
                        value={serviceLocations}
                        footer={
                            <div>
                                <form action=""
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleAddServiceToLocation();
                                    }}
                                >
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="" className='required'>{t('branch')}</label>
                                                <Select
                                                    options={branches}
                                                    getOptionLabel={(e) => e.branch.branch_name}
                                                    getOptionValue={(e) => e.branch.id}
                                                    required
                                                    placeholder={t('choose_branch')}
                                                    onChange={(e) => {
                                                        setBranch(e);
                                                    }}
                                                    value={branch}
                                                    isClearable
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="" className='required'>{t('price')}</label>
                                                <InputNumber className='pr-input sm'
                                                    placeholder={t('price')}
                                                    value={price}
                                                    useGrouping={false}
                                                    maxFractionDigits={3}
                                                    onChange={(e) => {
                                                        setPrice(e.value);
                                                    }}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="" className='required'>{t('discount')}</label>
                                                <InputNumber className='pr-input sm'
                                                    placeholder={t('discount')}
                                                    useGrouping={false}
                                                    maxFractionDigits={3}
                                                    value={discount}
                                                    onChange={(e) => {
                                                        setDiscount(e.value);
                                                    }}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        type='submit'
                                        className='rounded-btn mt-4'
                                        label={t('add_to_location')}
                                    />
                                </form>
                            </div>
                        }
                    >
                        <Column
                            header={t('branch')}
                            field='branch_name'
                            sortable
                        />
                        <Column
                            header={t('price')}
                            sortField='price'
                            body={(row) => getFormattedCurrency(row.price)}
                            sortable
                        />

                        <Column
                            header={t('discount')}
                            field='service_location_discount'
                            sortable
                        />
                        <Column
                            header={t('status')}
                            sortField='status'
                            sortable
                            body={(row) => <Tag
                                value={row.status === 1 ? t('active') : t('in_active')}
                                severity={row.status === 1 ? 'success' : 'danger'}
                            />
                            }
                        />
                        <Column
                            header={t('actions')}
                            body={(row) => {
                                return (
                                    <div className='d-flex'>
                                        <Button className='icon-sm-btn mx-1' severity="secondary"
                                            onClick={() => {
                                                setLocationDiscount(row.service_location_discount);
                                                setLocationPrice(row.price);
                                                setStatus(row.status === 1 ? true : false);
                                                setServiceEditModal({ show: true, item: row });
                                            }}
                                        >
                                            <span className="material-symbols-outlined">
                                                edit
                                            </span>
                                        </Button>
                                        <Button className='icon-sm-btn mx-1' severity="danger"
                                            onClick={() => {
                                                handleDeleteServiceFromLocations(row);
                                            }}
                                        >
                                            <span className="material-symbols-outlined">
                                                close
                                            </span>
                                        </Button>
                                    </div>
                                );
                            }}

                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}
export default ViewService;