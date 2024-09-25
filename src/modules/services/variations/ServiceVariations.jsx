import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { useStore } from 'react-redux';
import { storeServiceVariation, getServiceVariations, updateServiceVariation } from './../../../apis/services';
import { Modal } from 'react-bootstrap';
import { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { setShowDeleteDialog } from '../../../redux/reducer';
import DeleteModalContent from '../../../commons/DeleteModalContent';
import { getTimeStamp } from '../../../helpers/helpers';
import { Checkbox } from 'primereact/checkbox';
import { InputSwitch } from 'primereact/inputswitch';
const ServiceVariations = () => {
    const { t } = useTranslation();
    const store = useStore();
    const [serviceVariations, setServiceVariations] = useState([]);
    const [showAddServiceVariationModal, setShowAddServiceVariationModal] = useState(false);
    const [showEditServiceVariationModal, setShowEditServiceVariationModal] = useState({ show: false, item: '' });
    useEffect(() => {
        loadServiceVariations();
    }, []);
    const loadServiceVariations = async () => {
        try {
            const res = await getServiceVariations();
            setServiceVariations(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className="glass-card p-3">
                <div className="d-flex jcsb">
                    <div className='mt-2 mb-2'>
                        <h4>{t('manage_service_variations')}</h4>
                    </div>
                    <div className='p-2'>
                        <Button className='p-btn'
                            onClick={() => {
                                setShowAddServiceVariationModal(true);
                            }}
                        > {t('add_service_variation')}</Button>
                    </div>
                </div>
                <Modal
                    show={showAddServiceVariationModal}
                >
                    <div className='p-4'>
                        <AddServiceVariation
                            submit={() => {
                                setShowAddServiceVariationModal(false);
                                loadServiceVariations();
                            }}
                            cancel={() => {
                                setShowAddServiceVariationModal(false);
                            }}
                        />
                    </div>
                </Modal>
                <Modal
                    show={showEditServiceVariationModal.show}
                >
                    <div className='p-4'>
                        <EditServiceVariation
                            submit={() => {
                                setShowEditServiceVariationModal({ show: false, item: '' });
                                loadServiceVariations();
                            }}
                            cancel={() => {
                                setShowEditServiceVariationModal({ show: false, item: '' });
                            }}
                            item={showEditServiceVariationModal.item}
                        />
                    </div>
                </Modal>
                <DeleteModalContent
                    reload={() => {
                        loadServiceVariations();
                    }}
                />
                <div className="data-table mt-2">
                    <DataTable
                        value={serviceVariations}
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
                            field="variation_title"
                            header={t('variation_title')}
                            sortable
                        />
                        <Column
                            field="variation_desc"
                            header={t('variation_desc')}
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
                            header={t('status')}
                            sortField='status'
                            sortable
                            body={(row) => {
                                return (
                                    <InputSwitch checked={row.status === 1 ? true : false} />
                                )
                            }}
                        />
                        <Column
                            header={t('actions')}
                            body={(row) => {
                                return (
                                    <div className='d-flex'>
                                        <Button
                                            onClick={(e) => {
                                                setShowEditServiceVariationModal({ show: true, item: row });
                                            }}
                                            className='icon-btn mx-1' severity='primary' id="edit-btn">
                                            <span className="material-symbols-outlined">
                                                edit
                                            </span>
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                store.dispatch(setShowDeleteDialog({ show: true, url: '/services/variations/delete/' + row.id }))
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

const AddServiceVariation = (props) => {
    const { t } = useTranslation();
    const [variationTitle, setVariationTitle] = useState();
    const [variationDesc, setVariationDesc] = useState();
    const [status, setStatus] = useState(true);
    const handleAddServiceVariation = async () => {
        try {
            let data = {
                variationTitle: variationTitle,
                variationDesc: variationDesc,
                status: status,
                created_at: getTimeStamp(new Date()),
                updated_at: getTimeStamp(new Date()),
            };
            await storeServiceVariation(data);
            props.submit();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form action=""
            onSubmit={(e) => {
                e.preventDefault();
                handleAddServiceVariation();
            }}
        >
            <div className="row">
                <div className="col-12">
                    <div className="d-flex jcsb align-items-center">
                        <h5 className='mt-2 mb-3 opacity'>{t('add_new_service_variation')}</h5>
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
                        <label htmlFor="variationTitle" className='required mb-1' >{t('variation_title')}</label>
                        <input type="text" id="variationTitle" className='form-control' required
                            value={variationTitle}
                            onChange={(e) => { setVariationTitle(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="form-group">
                        <label htmlFor="variationDesc" className='required mb-1' >{t('variation_desc')}</label>
                        <input type="text" id="variationDesc" className='form-control' required
                            value={variationDesc}
                            onChange={(e) => { setVariationDesc(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="col-md-12 mt-2">
                    <div className="d-flex">
                        <div className="flex align-items-center">
                            <Checkbox inputId="status" name="status" checked={status} className=''
                                onChange={() => {
                                    setStatus(!status);
                                }}
                            />
                            <label htmlFor="status" className="ml-2 mx-2">{t('enable_for_use')}</label>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <Button type='submit' className='p-btn'>{t('save')}</Button>
                </div>
            </div>
        </form>
    );
}
const EditServiceVariation = (props) => {
    const { t } = useTranslation();
    const item = props.item;
    const [variationTitle, setVariationTitle] = useState(item.variation_title);
    const [variationDesc, setVariationDesc] = useState(item.variation_desc);
    const [status, setStatus] = useState(item.status === 1 ? true : false);
    const handleEditServiceVariation = async () => {
        try {
            let data = {
                id: item.id,
                variationTitle: variationTitle,
                variationDesc: variationDesc,
                status: status,
                updated_at: getTimeStamp(new Date()),
            };
            await updateServiceVariation(data);
            props.submit();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form action=""
            onSubmit={(e) => {
                e.preventDefault();
                handleEditServiceVariation();
            }}
        >
            <div className="row">
                <div className="col-12">
                    <div className="d-flex jcsb align-items-center">
                        <h5 className='mt-2 mb-3 opacity'>{t('edit_service_variation')}</h5>
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
                        <label htmlFor="variationTitle" className='required mb-1' >{t('variation_title')}</label>
                        <input type="text" id="variationTitle" className='form-control' required
                            value={variationTitle}
                            onChange={(e) => { setVariationTitle(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="form-group">
                        <label htmlFor="variationDesc" className='required mb-1' >{t('variation_desc')}</label>
                        <input type="text" id="variationDesc" className='form-control' required
                            value={variationDesc}
                            onChange={(e) => { setVariationDesc(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="col-md-12 mt-2">
                    <div className="d-flex">
                        <div className="flex align-items-center">
                            <Checkbox inputId="status" name="status" checked={status} className=''
                                onChange={() => {
                                    setStatus(!status);
                                }}
                            />
                            <label htmlFor="status" className="ml-2 mx-2">{t('enable_for_use')}</label>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <Button type='submit' className='p-btn'>{t('update')}</Button>
                </div>
            </div>
        </form>
    );
}
export default ServiceVariations;