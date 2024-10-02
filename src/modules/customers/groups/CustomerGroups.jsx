import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getCustomerGroups } from '../../../apis/services';
import { getFormattedCurrency } from '../../../helpers/helpers';
import { Button } from 'primereact/button';
import DeleteModalContent from '../../../commons/DeleteModalContent';
import { useStore } from 'react-redux';
import { setShowDeleteDialog } from '../../../redux/reducer';
import { InputSwitch } from 'primereact/inputswitch';
const CustomerGroups = () => {
    const { t } = useTranslation();
    const store = useStore();
    const [customerGroups, setCustomerGroups] = useState();
    useEffect(() => {
        loadCustomerGroups();
    }, []);
    const loadCustomerGroups = async () => {
        try {
            const res = await getCustomerGroups();
            setCustomerGroups(res.data.data);
        } catch (error) {

        }
    }
    return (
        <div>
            <div className="glass-card p-3">
                <div className="d-flex jcsb">
                    <div className='mt-2 mb-2'>
                        <h4>{t('manage_customer_subs_groups')}</h4>
                    </div>
                    <div className='p-2'>
                        <Link to='/customers/groups/add' className="link-btn">
                            {t('add_group')}
                        </Link>
                    </div>
                </div>
                <DeleteModalContent
                    reload={() => {
                        loadCustomerGroups();
                    }}
                />
                <div className="data-table mt-2">
                    <DataTable value={customerGroups}
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
                            field="group_title"
                            header={t('group_title')}
                            sortable
                        />

                        <Column
                            field="group_desc"
                            header={t('group_desc')}
                            sortable
                        />
                        <Column
                            sortField="group_cost"
                            header={t('group_cost')}
                            sortable
                            body={(row) => getFormattedCurrency(row.group_cost)}
                        />
                        <Column
                            sortField="benefit_type"
                            header={t('benefit_type')}
                            sortable
                            body={(row) => t(row.benefit_type)}
                        />
                        <Column
                            sortField="discount"
                            header={t('discount')}
                            sortable
                            body={(row) => row.benefit_type === 'discount' ? row.discount+'%' : '***'}
                        />
                        <Column
                            field="free_amount"
                            header={t('free_amount')}
                            sortable
                            body={(row) => row.benefit_type === 'free_amount' ? row.free_amount : '***'}
                        />
                        <Column
                            field="how_many_orders"
                            header={t('how_many_orders')}
                            sortable
                            body={(row) => row.benefit_type !== 'free_amount' ? row.how_many_orders : '***'}
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
                                            to="/customers/groups/edit"
                                            state={JSON.stringify(row)}
                                            className='link-icon-btn mx-1' severity='primary' id="edit-btn">
                                            <span className="material-symbols-outlined">
                                                edit
                                            </span>
                                        </Link>
                                        <Button
                                            onClick={() => {
                                                store.dispatch(setShowDeleteDialog({ show: true, url: '/customers/groups/delete/' + row.id }))
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
export default CustomerGroups;