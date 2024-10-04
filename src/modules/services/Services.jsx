import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getServices, getServiceVariations } from '../../apis/services';
import { Avatar } from 'primereact/avatar';
import { getFormattedCurrency } from '../../helpers/helpers';
import { Button } from 'primereact/button';
import DeleteModalContent from '../../commons/DeleteModalContent';
import { useStore } from 'react-redux';
import { setShowDeleteDialog } from '../../redux/reducer';
import { InputSwitch } from 'primereact/inputswitch';
import { FilterMatchMode,FilterOperator } from 'primereact/api';
import { MultiSelect } from 'primereact/multiselect';
import Select from 'react-select';
const Services = () => {
    const { t } = useTranslation();
    const store = useStore();
    const [services, setServices] = useState([]);
    const [serviceVariations, setServiceVariations] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        service_variation: { value: null, matchMode: FilterMatchMode.IN },

    });
    useEffect(() => {
        loadServices();
        loadServiceVariations();
    }, []);
    const loadServices = async () => {
        try {
            const res = await getServices();
            setServices(res.data.data);
        } catch (error) {

        }
    }
    const loadServiceVariations =  async () =>{
        try {
            const res = await getServiceVariations(1);
            setServiceVariations(res.data.data.map((e)=> { return {value:e.id,name:e.variation_title} }));
        } catch (error) {
            
        }
    }
    const statusItemTemplate = (option) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{option.name}</span>
            </div>
        );
    };
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
                    <DataTable
                        value={services}
                        header={
                            <div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <input type="text" className='search-input form-control'
                                            placeholder={t('search_here')}
                                            onChange={(e) => {
                                                let _filters = { ...filters };
                                                _filters['global'].value = e.target.value;
                                                setFilters(_filters);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                        paginator
                        rows={10}
                        filters={filters}
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
                            field="category_title"
                            header={t('service_category')}
                            sortable
                            filter
                        />
                        <Column
                            field="variation_title"
                            header={t('service_variation')}
                            sortable
                            filter
                            filterField='service_variation'
                            showFilterMatchModes={false}
                            filterElement={(options) => {
                                return (
                                    <MultiSelect
                                        value={options.value}
                                        options={serviceVariations}
                                        itemTemplate={statusItemTemplate}
                                        onChange={(e) => {
                                            options.filterCallback(e.value)
                                        }}
                                        optionLabel="name"
                                        placeholder={t('select_variations')}
                                        className="p-column-filter"  
                                    />
                                )
                            }}
                        />
                        <Column
                            sortField="service_duration"
                            header={t('service_duration')}
                            body={(row) => row.service_price + ' ' + t('mins')}
                            sortable
                        />
                        <Column
                            sortField="service_price"
                            header={t('service_price')}
                            body={(row) => getFormattedCurrency(row.service_price)}
                            sortable
                        />
                        <Column
                            sortFieldfield="service_discount"
                            header={t('discount')}
                            body={(row) => row.service_discount + '%'}
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