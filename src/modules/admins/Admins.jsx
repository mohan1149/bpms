import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const Admins = () => {
    const { t } = useTranslation();
    return (
        <div>
            <div className="glass-card p-3">
                <div className="d-flex jcsb">
                    <div className='mt-2 mb-2'>
                        <h4>{t('manage_admins')}</h4>
                    </div>
                    <div>
                        <Link to='/admins/add' className="link-btn">
                            {t('add_admin')}
                        </Link>
                    </div>
                </div>
                <div className="data-table">
                    <DataTable value={[]}
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
                            field="name" 
                            header={t('name')}
                            sortable
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}
export default Admins;