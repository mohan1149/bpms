import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getRoles } from '../../../apis/services';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';
import { setShowDeleteDialog } from '../../../redux/reducer';
import { useStore } from 'react-redux';
import DeleteModalContent from '../../../commons/DeleteModalContent';

const Roles = () => {
    const { t } = useTranslation();
    const store = useStore();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        loadRoles();
    }, []);

    const loadRoles = async () => {
        try {
            const res = await getRoles();
            setRoles(res.data.data);
        } catch (error) {

        }
    }
    return (
        <div className="p-3 glass-card">
            <div className="d-flex jcsb">
                <div className='mt-2 mb-2'>
                    <h4>{t('manage_roles')}</h4>
                </div>
                <div className='p-2'>
                    <Link to='/employees/roles/add' className="link-btn">
                        {t('add_role')}
                    </Link>
                </div>
            </div>
            <DeleteModalContent
                reload={() => {
                    loadRoles();
                }}
            />
            <div className="p-3">
                <DataTable
                    value={roles}
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
                        field="role_title"
                        header={t('role_name')}
                        sortable
                    />
                    <Column
                        field="role_desc"
                        header={t('role_desc')}
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
                                        to="/employees/roles/edit"
                                        state={JSON.stringify(row)}
                                        className='link-icon-btn mx-1' severity='primary' id="edit-btn">
                                        <span className="material-symbols-outlined">
                                            edit
                                        </span>
                                    </Link>
                                    <Button
                                        onClick={() => {
                                            store.dispatch(setShowDeleteDialog({ show: true, url: '/roles/delete/' + row.id }))
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

export default Roles;