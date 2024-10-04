import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getServices } from '../../apis/services';
import { Avatar } from 'primereact/avatar';
import { getTimeFromString } from '../../helpers/helpers';
import { Button } from 'primereact/button';
import DeleteModalContent from '../../commons/DeleteModalContent';
import { useStore } from 'react-redux';
import { setShowDeleteDialog } from '../../redux/reducer';
import { Chip } from 'primereact/chip';
import { InputSwitch } from 'primereact/inputswitch';

const Services = () => {
    const { t } = useTranslation();
    const store = useStore();
    const [services, setServices] = useState();
    useEffect(() => {
        loadServices();
    }, []);
    const loadServices = async () => {
        try {
            const res = await getServices();
            setServices(res.data.data);
        } catch (error) {

        }
    }
    return (
        <div>
            <div className="glass-card p-3">
                <div className="d-flex jcsb">
                    <div className='mt-2 mb-2'>
                        <h4>{t('manage_services')}</h4>
                    </div>
                    <div className='p-2'>
                        <Link to='/services/add' className="link-btn">
                            {t('add_service')}
                        </Link>


                    </div>
                </div>
                <DeleteModalContent
                    reload={() => {
                        loadServices();
                    }}
                />
                <div className="data-table mt-2">
                    <DataTable value={services}
                        paginator
                        rows={10}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        rowsPerPageOptions={[10, 25, 50]}
                        dataKey="id"
                        selectionMode="checkbox"
                        filterDisplay="menu"
                        emptyMessage={t('data_not_available')}
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    >
                        <Column
                            header={t('image')}
                            body={(row) => {
                                return (
                                    <Avatar image={row.service_image} size="large" imageAlt={row.service_image} />
                                )
                            }}
                        />
                        <Column
                            field="service_name"
                            header={t('service_name')}
                            sortable
                        />

                        <Column
                            field="category"
                            header={t('category')}
                            sortable
                        />
                        <Column
                            field="variation"
                            header={t('variation')}
                            sortable
                        />
                        <Column
                            field="variation"
                            header={t('duration')}
                            sortable
                        />
                        <Column
                            field="variation"
                            header={t('sevice_price')}
                            sortable
                        />
                        <Column
                            field="discount"
                            header={t('discount')}
                            sortable
                        />
                        <Column
                            sortField='status'
                            header={t('status')}
                            body={(row) => {
                                return (
                                    <InputSwitch checked={row.status === 1 ? true : false} />
                                );
                            }}
                            sortable
                        />

                        <Column
                            header={t('actions')}
                            body={(row) => {
                                return (
                                    <div className='d-flex'>
                                        <Link
                                            to="/services/edit"
                                            state={JSON.stringify(row)}
                                            className='link-icon-btn mx-1' severity='primary' id="edit-btn">
                                            <span className="material-symbols-outlined">
                                                edit
                                            </span>
                                        </Link>
                                        <Button
                                            onClick={() => {
                                                store.dispatch(setShowDeleteDialog({ show: true, url: '/services/delete/' + row.id }))
                                            }}
                                            className='icon-btn mx-1' severity='danger' id="edit-btn">
                                            <span className="material-symbols-outlined">
                                                delete
                                            </span>
                                        </Button>
                                    </div>
                                )
                            }}
                        />

                    </DataTable>
                </div>
            </div>
        </div>
    );
}
export default Services;