import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getServiceLocations, getBranches } from '../../apis/services';
import { getFormattedCurrency, getTimeStamp } from '../../helpers/helpers';
import { Button } from 'primereact/button';
import DeleteModalContent from '../../commons/DeleteModalContent';
import { useStore } from 'react-redux';
import { setShowDeleteDialog } from '../../redux/reducer';
import { InputSwitch } from 'primereact/inputswitch';
import { Tag } from 'primereact/tag';
import { Avatar } from 'primereact/avatar';
import Select from 'react-select';

const ViewService = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const service = JSON.parse(location.state);
    const [serviceLocations, setServiceLocations] = useState([]);
    const [branches, setBranches] = useState([]);

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
    return (
        <div className="row">
            <div className="col-md-5 glass-card">
                <div className="p-3">
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
                                <div className="row">
                                    <div className="col-md-4">
                                        <Select
                                            options={branches}
                                            getOptionLabel={(e) => e.branch.branch_name}
                                            getOptionValue={(e) => e.branch.id}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <input type="text" className='form-control' />
                                    </div>
                                    <div className="col-md-4">
                                        <input type="text" className='form-control' />
                                    </div>
                                </div>

                                <Button
                                    className='rounded-btn mt-4'
                                    label={t('add_to_location')}
                                />
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
                            body={
                                <div className='d-flex'>
                                    <Button className='icon-sm-btn mx-1' severity="secondary"
                                        onClick={() => {
                                        }}
                                    >
                                        <span className="material-symbols-outlined">
                                            edit
                                        </span>
                                    </Button>
                                    <Button className='icon-sm-btn mx-1' severity="danger"
                                        onClick={() => {
                                        }}
                                    >
                                        <span className="material-symbols-outlined">
                                            close
                                        </span>
                                    </Button>
                                </div>
                            }

                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}
export default ViewService;