import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { useStore } from 'react-redux';
import { storeServiceCategory, getServiceCategories, updateServiceCategory } from './../../../apis/services';
import { Modal } from 'react-bootstrap';
import { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Avatar } from 'primereact/avatar';
import { setShowDeleteDialog } from '../../../redux/reducer';
import DeleteModalContent from '../../../commons/DeleteModalContent';
import { getTimeStamp } from '../../../helpers/helpers';
const ServiceCategories = () => {
    const { t } = useTranslation();
    const store = useStore();
    const [serviceCategories, setServiceCategories] = useState([]);
    const [showAddServiceCategoryModal, setShowAddServiceCategoryModal] = useState(false);
    const [showEditServiceCategoryModal, setShowEditServiceCategoryModal] = useState({ show: false, item: '' });
    useEffect(() => {
        loadPaymentTypes();
    }, []);
    const loadPaymentTypes = async () => {
        try {
            const res = await getServiceCategories();
            setServiceCategories(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className="glass-card p-3">
                <div className="d-flex jcsb">
                    <div className='mt-2 mb-2'>
                        <h4>{t('manage_service_categories')}</h4>
                    </div>
                    <div className='p-2'>
                        <Button className='p-btn'
                            onClick={() => {
                                setShowAddServiceCategoryModal(true);
                            }}
                        > {t('add_service_category')}</Button>
                    </div>
                </div>
                <Modal
                    show={showAddServiceCategoryModal}
                >
                    <div className='p-4'>
                        <AddServiceCategory
                            submit={() => {
                                setShowAddServiceCategoryModal(false);
                                loadPaymentTypes();
                            }}
                            cancel={() => {
                                setShowAddServiceCategoryModal(false);
                            }}
                        />
                    </div>
                </Modal>
                <Modal
                    show={showEditServiceCategoryModal.show}
                >
                    <div className='p-4'>
                        <EditServiceCategory
                            submit={() => {
                                setShowEditServiceCategoryModal({ show: false, item: '' });
                                loadPaymentTypes();
                            }}
                            cancel={() => {
                                setShowEditServiceCategoryModal({ show: false, item: '' });
                            }}
                            item={showEditServiceCategoryModal.item}
                        />
                    </div>
                </Modal>
                {

                }
                <DeleteModalContent
                    reload={() => {
                        loadPaymentTypes();
                    }}
                />
                <div className="data-table mt-2">
                    <DataTable
                        value={serviceCategories}
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
                                    <Avatar image={row.category_image} size="large" imageAlt={row.category_title} />
                                )
                            }}
                        />
                        <Column
                            field="category_title"
                            header={t('category_title')}
                            sortable
                        />
                        <Column
                            field="category_desc"
                            header={t('category_desc')}
                            sortable
                        />
                        <Column
                            field="created_at"
                            header={t('added_at')}
                            sortable
                            sortField='created_at'
                            body={(row) => new Date(row.created_at).toUTCString()}
                        />

                        <Column
                            header={t('actions')}
                            body={(row) => {
                                return (
                                    <div className='d-flex'>
                                        <Button
                                            onClick={(e) => {
                                                setShowEditServiceCategoryModal({ show: true, item: row });
                                            }}
                                            className='icon-btn mx-1' severity='primary' id="edit-btn">
                                            <span className="material-symbols-outlined">
                                                edit
                                            </span>
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                store.dispatch(setShowDeleteDialog({ show: true, url: '/services/categories/delete/' + row.id }))
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

const AddServiceCategory = (props) => {
    const { t } = useTranslation();
    const [categoryTitle, setCategoryTitle] = useState();
    const [categoryDesc, setCategoryDesc] = useState();
    const [image, setImage] = useState();
    const handleAddServiceCategory = async () => {
        try {
            let formData = new FormData();
            formData.append('categoryTitle', categoryTitle);
            formData.append('categoryImage', image);
            formData.append('categoryDesc', categoryDesc);
            formData.append('created_at', getTimeStamp(new Date()));
            formData.append('updated_at', getTimeStamp(new Date()));
            await storeServiceCategory(formData);
            props.submit();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form action=""
            onSubmit={(e) => {
                e.preventDefault();
                handleAddServiceCategory();
            }}
        >
            <div className="row">
                <div className="col-12">
                    <div className="d-flex jcsb align-items-center">
                        <h5 className='mt-2 mb-3 opacity'>{t('add_new_service_category')}</h5>
                        <Button raised className='icon-btn' severity='secondary' type='button'
                            onClick={() => {
                                props.cancel();
                            }}
                        >
                            <span className="material-symbols-outlined">
                                cancel
                            </span>
                        </Button>
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="form-group">
                        <label htmlFor="categoryTitle" className='required mb-1' >{t('category_title')}</label>
                        <input type="text" id="categoryTitle" className='form-control' required
                            value={categoryTitle}
                            onChange={(e) => { setCategoryTitle(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="form-group">
                        <label htmlFor="categoryDesc" className='required mb-1' >{t('category_desc')}</label>
                        <input type="text" id="categoryDesc" className='form-control' required
                            value={categoryDesc}
                            onChange={(e) => { setCategoryDesc(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="form-group">
                        <label htmlFor="image" className='required mb-1' >{t('image')}</label>
                        <input type="file" className='form-control' id="image" required accept="image/*"
                            onChange={(e) => {
                                setImage(e.target.files[0]);
                            }}
                        />
                    </div>
                </div>

                <div className="col-12 mt-3">
                    <Button type='submit' className='p-btn'>{t('save')}</Button>
                </div>
            </div>
        </form>
    );
}
const EditServiceCategory = (props) => {
    const { t } = useTranslation();
    const item = props.item;
    const [categoryTitle, setCategoryTitle] = useState(item.category_title);
    const [image, setImage] = useState();
    const [categoryDesc, setCategoryDesc] = useState(item.category_desc);
    const handleEditServiceCategory = async () => {
        try {
            let formData = new FormData();
            formData.append('id', item.id);
            formData.append('categoryTitle', categoryTitle);
            formData.append('categoryImage', image);
            formData.append('categoryDesc', categoryDesc);
            formData.append('updated_at', getTimeStamp(new Date()));
            await updateServiceCategory(formData);
            props.submit();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form action=""
            onSubmit={(e) => {
                e.preventDefault();
                handleEditServiceCategory();
            }}
        >
            <div className="row">
                <div className="col-12">
                    <div className="d-flex jcsb align-items-center">
                        <h5 className='mt-2 mb-3 opacity'>{t('edit_service_category')}</h5>
                        <Button raised className='icon-btn' severity='secondary' type='button'
                            onClick={() => {
                                props.cancel();
                            }}
                        >
                            <span className="material-symbols-outlined">
                                cancel
                            </span>
                        </Button>
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="form-group">
                        <label htmlFor="categoryTitle" className='required mb-1' >{t('category_title')}</label>
                        <input type="text" id="categoryTitle" className='form-control' required
                            value={categoryTitle}
                            onChange={(e) => { setCategoryTitle(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="form-group">
                        <label htmlFor="categoryDesc" className='required mb-1' >{t('category_desc')}</label>
                        <input type="text" id="categoryDesc" className='form-control' required
                            value={categoryDesc}
                            onChange={(e) => { setCategoryDesc(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="form-group">
                        <label htmlFor="image" className='mb-1' >{t('image')}</label>
                        <input type="file" className='form-control' id="image" accept="image/*"
                            onChange={(e) => {
                                setImage(e.target.files[0]);
                            }}
                        />
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <Button type='submit' className='p-btn'>{t('update')}</Button>
                </div>
            </div>
        </form>
    );
}
export default ServiceCategories;