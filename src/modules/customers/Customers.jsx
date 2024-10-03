import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getCustomers } from '../../apis/services';
import { getFormattedCurrency } from '../../helpers/helpers';
import { Button } from 'primereact/button';
import DeleteModalContent from '../../commons/DeleteModalContent';
import { useStore } from 'react-redux';
import { setShowDeleteDialog } from '../../redux/reducer';
import { InputSwitch } from 'primereact/inputswitch';
import { Tag } from 'primereact/tag';
const Customers = () => {
    const { t } = useTranslation();
    const store = useStore();
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        loadCustomers();
    }, []);
    const loadCustomers = async () => {
        try {
            const res = await getCustomers();
            setCustomers(res.data.data);
        } catch (error) {

        }
    }
    const renderSubscriptionPlan = (row) => {
        if (row.subscription_plan === 0 || row.subscription_plan === null) {
            return <Tag severity="warning" value={t('no')}></Tag>
        } else {
            return (
                <div className="d-fle align-items-center">
                    <h6>{row.group_title}</h6>
                    <Tag value={getFormattedCurrency(row.group_cost, 1)}></Tag>
                </div>
            );
        }

    }
    return (
        <div className="p-3 glass-card">
            <div className="d-flex jcsb">
                <div className='mt-2 mb-2'>
                    <h4>{t('manage_customers')}</h4>
                </div>
                <div className='p-2'>
                    <Link to='/customers/add' className="link-btn">
                        {t('add_customer')}
                    </Link>
                </div>
            </div>
            <DeleteModalContent
                reload={() => {
                    loadCustomers();
                }}
            />
            <div className='mt-3'>
                <DataTable
                    value={customers}
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
                        field="full_name"
                        header={t('full_name')}
                        sortable
                    />
                    <Column
                        field="phone"
                        header={t('phone')}
                        sortable
                    />
                    <Column
                        field="phone_2"
                        header={t('phone2')}
                        sortable
                    />
                    <Column
                        field="email"
                        header={t('email')}
                        sortable
                    />
                    <Column
                        sortField="wallet"
                        header={t('wallet')}
                        sortable
                        body={(row) => {
                            return (
                                row.wallet === 0 ? <Tag severity="warning" value={t('no')}></Tag> : <Tag severity="success" value={t('yes')}></Tag>
                            );
                        }}
                    />
                    <Column
                        header={t('subscription_plan')}
                        body={renderSubscriptionPlan}

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
                                    {/* <Link
                                        to="/customers/edit"
                                        state={JSON.stringify(row)}
                                        className='link-icon-btn mx-1' severity='primary' id="edit-btn">
                                        <span className="material-symbols-outlined">
                                            edit
                                        </span>
                                    </Link> */}
                                    <Link
                                        to="/customers/view"
                                        state={JSON.stringify(row)}
                                        className='link-icon-btn mx-1' severity='primary' id="edit-btn">
                                        <span className="material-symbols-outlined">
                                            visibility
                                        </span>
                                    </Link>
                                    
                                    <Button
                                        onClick={() => {
                                            store.dispatch(setShowDeleteDialog({ show: true, url: '/customers/delete/' + row.id }))
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
    );
}

export default Customers;