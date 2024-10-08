import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getServiceLocations } from '../../apis/services';
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
    const [serviceLocations, setServiceLocations] = useState();
    useEffect(() => {
        loadServiceLocations();
    }, []);
    const loadServiceLocations = async () => {
        try {
            const res = await getServiceLocations(service.id);
            setServiceLocations(res.data.data);
        } catch (error) {

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
                    <div className='mt-4 pt-2'>
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
                        value={serviceLocations}
                        footer={
                            <div>
                                <Select />
                                <Button
                                    className='rounded-btn mt-2'
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