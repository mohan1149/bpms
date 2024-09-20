import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getBranches } from '../../apis/services';
import { Avatar } from 'primereact/avatar';
import { getTimeFromString } from '../../helpers/helpers';
import { Button } from 'primereact/button';
import DeleteModalContent from '../../commons/DeleteModalContent';
import { useStore } from 'react-redux';
import { setShowDeleteDialog } from '../../redux/reducer';


const Branches = () => {
    const { t } = useTranslation();
    const store = useStore();
    const [branches, setBranches] = useState();
    useEffect(() => {
        loadBranches();
    }, []);
    const loadBranches = async () => {
        try {
            const res = await getBranches();
            setBranches(res.data.data);
        } catch (error) {

        }
    }
    return (
        <div>
            <div className="glass-card p-3">
                <div className="d-flex jcsb">
                    <div className='mt-2 mb-2'>
                        <h4>{t('manage_branches')}</h4>
                    </div>
                    <div className='p-2'>
                        <Link to='/branches/add' className="link-btn">
                            {t('add_branch')}
                        </Link>


                    </div>
                </div>
                <DeleteModalContent
                    reload={()=>{
                        loadBranches();
                    }}
                />
                <div className="data-table mt-2">
                    <DataTable value={branches}
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
                                    <Avatar image={row.branch_image} size="large" imageAlt={row.branch_image} />
                                )
                            }}
                        />
                        <Column
                            field="branch_name"
                            header={t('branch_name')}
                            sortable
                        />

                        <Column
                            field="branch_email"
                            header={t('email')}
                            sortable
                        />
                        <Column
                            field="branch_phone"
                            header={t('phone')}
                            sortable
                        />
                        <Column
                            field="branch_address"
                            header={t('address')}
                            sortable
                        />
                        <Column
                            header={t('opening_time')}
                            body={(i) => getTimeFromString(i.opening_time)}
                            sortable
                        />
                        <Column
                            body={(i) => getTimeFromString(i.closing_time)}
                            header={t('closing_time')}
                            sortable
                        />
                        <Column
                            field="payment_types"
                            header={t('payment_types')}
                            sortable
                        />
                        <Column
                            header={t('actions')}
                            body={(row) => {
                                return (
                                    <div className='d-flex'>
                                        <Link
                                            onClick={(e) => {
                                                // setShowEditPaymentTypeModal({ show: true, item: row });
                                            }}
                                            className='link-icon-btn mx-1' severity='primary' id="edit-btn">
                                            <span className="material-symbols-outlined">
                                                edit
                                            </span>
                                        </Link>
                                        <Button
                                            onClick={() => {
                                                store.dispatch(setShowDeleteDialog({ show: true, url: '/branches/delete/' + row.id }))
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
export default Branches;