import { useState, useEffect } from "react";
import { Modal, Badge } from 'react-bootstrap';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { t } from "i18next";
import AddProductCategory from './AddProductCategory';
import { getProductCategories } from './../../../apis/services';
const ProductCategories = () => {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [branches, setBranches] = useState([]);
    useEffect(() => {
        loadProductCategories();
    }, []);

    const loadProductCategories = async () => {
        try {
            const res = await getProductCategories();
            setBranches(res.data.data);
        } catch (error) {

        }
    }
    const renderStatus = (row) => {
        return (
            <div>
                {row.status === "active" ? <Badge bg="primary">{t(row.status)}</Badge> : <Badge bg="danger">{t(row.status)}</Badge>}
            </div>
        );
    }
    const renderImage = (row) => {
        return (
            <div>
                {
                    row.category_image !== null &&
                    <img src={process.env.REACT_APP_BASE_URL + process.env.REACT_APP_ASSET_PATH + row.category_image} alt="image" width={62} height={62} />
                }

            </div>
        );
    }
    const renderActions = (row) => {
        return (
            <div>

            </div>
        );
    }

    return (
        <div>
            <Modal
                show={showModal}
                size="lg"
            >
                <AddProductCategory
                    onClose={() => { setShowModal(false) }}
                    onSubmit={() => { loadProductCategories() }}

                />
            </Modal>
            <div className="card p-4">
                <div className="row">
                    <div className="col-12 row mb-3">
                        <div className="col-md-6">
                            <h5><strong>{(t('product_categories'))}</strong></h5>
                        </div>
                        <div className="col-md-6 text-end">
                            <button
                                type="button"
                                className="btn bg-red text-bold btn-round px-4 pb-2"
                                onClick={() => {
                                    setShowModal(true);
                                }}
                            >
                                {t('add_new_category')}
                            </button>
                        </div>
                    </div>
                    <div className="col-12">
                        <DataTable
                            value={branches}
                            paginator
                            rows={10}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            rowsPerPageOptions={[10, 25, 50]}
                            dataKey="id"
                            selectionMode="checkbox"
                            emptyMessage="No data available."
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        >
                            <Column
                                field="id"
                                header={t('id')}
                                sortable
                                style={{ minWidth: '4rem' }}
                            />

                            <Column
                                field="category_image"
                                header={t('image')}
                                body={renderImage}
                            />
                            <Column
                                field="category_name"
                                header={t('name')}
                                sortable
                                style={{ minWidth: '14rem' }}
                            />
                            <Column
                                field="category_description"
                                header={t('description')}
                                sortable
                                style={{ minWidth: '6rem' }}
                            />

                            <Column
                                field="status"
                                header={t('status')}
                                sortable
                                style={{ minWidth: '8rem' }}
                                body={renderStatus}
                            />
                            <Column
                                field="created_at"
                                header={t('created_at')}
                                sortable
                                body={(row) => new Date(row.created_at).toLocaleString()}
                                style={{ minWidth: '8rem' }}
                            />
                            <Column
                                body={renderActions}
                                header={t('actions')}
                                style={{ minWidth: '8rem' }}
                            />
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>

    );


}

export default ProductCategories;