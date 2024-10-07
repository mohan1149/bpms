import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getBranches } from '../../apis/services';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import DeleteModalContent from '../../commons/DeleteModalContent';
import { useStore } from 'react-redux';
import { setShowDeleteDialog } from '../../redux/reducer';
import { InputSwitch } from 'primereact/inputswitch';
const Employees = () => {
    const { t } = useTranslation();
    const store = useStore();
    const [employees, setBranches] = useState();
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
                        <h4>{t('manage_employees')}</h4>
                    </div>
                    <div className='p-2'>
                        <Link to='/employees/add' className="link-btn">
                            {t('add_employee')}
                        </Link>
                    </div>
                </div>
                <DeleteModalContent
                    reload={() => {
                        loadBranches();
                    }}
                />
                <div className="data-table mt-2">
                    <DataTable value={employees}
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
                            sortField='status'
                            header={t('status')}
                            body={(row) => {
                                return (
                                    <InputSwitch checked={row.branch.status === 1 ? true : false} />
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
                                            to="/employees/edit"
                                            state={JSON.stringify(row)}
                                            className='link-icon-btn mx-1' severity='primary' id="edit-btn">
                                            <span className="material-symbols-outlined">
                                                edit
                                            </span>
                                        </Link>
                                        <Button
                                            onClick={() => {
                                                store.dispatch(setShowDeleteDialog({ show: true, url: '/employees/delete/' + row.branch.id }))
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
export default Employees;