import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getEmployees } from '../../apis/services';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import DeleteModalContent from '../../commons/DeleteModalContent';
import { useStore } from 'react-redux';
import { setShowDeleteDialog } from '../../redux/reducer';
import { Tag } from 'primereact/tag';
import { can } from '../../helpers/helpers';
import NoPerm from '../../commons/NoPerm';
const Employees = () => {
    const { t } = useTranslation();
    const store = useStore();
    const [employees, setEmployees] = useState();
    useEffect(() => {
        loadBranches();
        console.log(can('add_edit_view_customers'));

    }, []);
    const loadBranches = async () => {
        try {
            const res = await getEmployees();
            setEmployees(res.data.data);
        } catch (error) {

        }
    }
    return (
        <div>
            {
                !can('manage_emps') &&
                <NoPerm />
            }
            {
                can('manage_emps') &&
                <div className="glass-card p-3">
                    <div className="d-flex jcsb">
                        <div className='mt-2 mb-2'>
                            <h4>{t('manage_employees')}</h4>
                        </div>
                        <div className='p-2'>
                            {
                                can('add_edit_view_emp') &&
                                <Link to='/employees/add' className="link-btn">
                                    {t('add_employee')}
                                </Link>
                            }

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
                                header={t('image')}
                                body={(row) => {
                                    return (
                                        <Avatar image={row.image} size="large" imageAlt={row.name} />
                                    )
                                }}
                            />
                            <Column
                                header={t('full_name')}
                                field='name'
                                sortable
                            />
                            <Column
                                header={t('email')}
                                field='email'
                                sortable
                            />
                            <Column
                                header={t('phone')}
                                field='phone'
                                sortable
                            />
                            <Column
                                header={t('nid')}
                                field='nid'
                                sortable
                            />
                            <Column
                                header={t('role')}
                                field='role_title'
                                sortable
                            />
                            <Column
                                header={t('address')}
                                field='address'
                                sortable
                            />


                            <Column
                                sortField='status'
                                header={t('status')}
                                body={(row) => {
                                    return (
                                        <Tag value={t(row.status)} severity={row.status === 'active' ? 'primary' : 'warning'} />
                                    );
                                }}
                                sortable
                            />
                            <Column
                                header={t('actions')}
                                body={(row) => {
                                    return (
                                        <div className='d-flex'>
                                            {
                                                can('add_edit_view_emp') &&
                                                <Link
                                                    to="/employees/view"
                                                    state={JSON.stringify(row)}
                                                    className='link-icon-btn mx-1' severity='primary' id="edit-btn">
                                                    <span className="material-symbols-outlined">
                                                        visibility
                                                    </span>
                                                </Link>
                                            }
                                            {
                                                can('delete_emp') &&
                                                <Button
                                                    onClick={() => {
                                                        store.dispatch(setShowDeleteDialog({ show: true, url: '/employees/delete/' + row.id }))
                                                    }}
                                                    className='icon-btn mx-1' severity='danger' id="edit-btn">
                                                    <span className="material-symbols-outlined">
                                                        delete
                                                    </span>
                                                </Button>
                                            }

                                        </div>
                                    )
                                }}
                            />

                        </DataTable>
                    </div>
                </div>
            }

        </div>
    );
}
export default Employees;