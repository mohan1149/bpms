import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { useStore } from 'react-redux';
import { storePaymentType, getPaymentTypes, updatePaymentType } from './../../apis/services';
import { Modal } from 'react-bootstrap';
import { Checkbox } from "primereact/checkbox";
import { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Avatar } from 'primereact/avatar';
import { InputSwitch } from "primereact/inputswitch";
import { setShowDeleteDialog } from '../../redux/reducer';
import DeleteModalContent from '../../commons/DeleteModalContent';
import { getTimeStamp } from '../../helpers/helpers';
const PaymentTypes = () => {
    const { t } = useTranslation();
    const store = useStore();
    const [paymentTypes, setPaymentTypes] = useState([]);
    const [showAddPaymentTypeModal, setShowAddPaymentTypeModal] = useState(false);
    const [showEditPaymentTypeModal, setShowEditPaymentTypeModal] = useState({ show: false, item: '' });
    useEffect(() => {
        loadPaymentTypes();
    }, []);
    const loadPaymentTypes = async () => {
        try {
            const res = await getPaymentTypes();
            setPaymentTypes(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className="glass-card p-3">
                <div className="d-flex jcsb">
                    <div className='mt-2 mb-2'>
                        <h4>{t('manage_payment_types')}</h4>
                    </div>
                    <div className='p-2'>
                        <Button className='p-btn'
                            onClick={() => {
                                setShowAddPaymentTypeModal(true);
                            }}
                        > {t('add_payment_type')}</Button>
                    </div>
                </div>
                <Modal
                    show={showAddPaymentTypeModal}
                >
                    <div className='p-4'>
                        <AddPaymentType
                            submit={() => {
                                setShowAddPaymentTypeModal(false);
                                loadPaymentTypes();
                            }}
                            cancel={() => {
                                setShowAddPaymentTypeModal(false);
                            }}
                        />
                    </div>
                </Modal>
                <Modal
                    show={showEditPaymentTypeModal.show}
                >
                    <div className='p-4'>
                        <EditPaymentType
                            submit={() => {
                                setShowEditPaymentTypeModal({ show: false, item: '' });
                                loadPaymentTypes();
                            }}
                            cancel={() => {
                                setShowEditPaymentTypeModal({ show: false, item: '' });
                            }}
                            item={showEditPaymentTypeModal.item}
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
                        value={paymentTypes}
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
                            header={t('payment_image')}
                            body={(row) => {
                                return (
                                    <Avatar image={row.payment_image} size="large" imageAlt={row.payment_title} />
                                )
                            }}
                        />
                        <Column
                            field="payment_title"
                            header={t('payment_title')}
                            sortable
                        />
                        <Column
                            field="created_at"
                            header={t('added_at')}
                            sortable
                        />
                        <Column
                            header={t('track_field')}
                            sortField='payment_track_field'
                            sortable
                            body={(row) => {
                                return (
                                    <InputSwitch checked={row.payment_track_field === 1 ? true : false} />
                                )
                            }}
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
                                                setShowEditPaymentTypeModal({ show: true, item: row });
                                            }}
                                            className='icon-btn mx-1' severity='primary' id="edit-btn">
                                            <span className="material-symbols-outlined">
                                                edit
                                            </span>
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                store.dispatch(setShowDeleteDialog({ show: true, url: '/payment-types/delete/' + row.id }))
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

const AddPaymentType = (props) => {
    const { t } = useTranslation();
    const [paymentTitle, setPaymentTitle] = useState();
    const [image, setImage] = useState();
    const [trackField, setTrackField] = useState(true);
    const [status, setStatus] = useState(true);
    const handleAddPaymentType = async () => {
        try {
            let formData = new FormData();
            formData.append('paymentTitle', paymentTitle);
            formData.append('paymentImage', image);
            formData.append('trackField', trackField);
            formData.append('status', status ? 1 : 0);
            formData.append('created_at', getTimeStamp(new Date()));
            formData.append('updated_at', getTimeStamp(new Date()));
            await storePaymentType(formData);
            props.submit();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form action=""
            onSubmit={(e) => {
                e.preventDefault();
                handleAddPaymentType();
            }}
        >
            <div className="row">
                <div className="col-12">
                    <div className="d-flex jcsb align-items-center">
                        <h5 className='mt-2 mb-3 opacity'>{t('add_new_payment_type')}</h5>
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
                        <label htmlFor="paymentTitle" className='required mb-1' >{t('payment_title')}</label>
                        <input type="text" id="paymentTitle" className='form-control' required
                            value={paymentTitle}
                            onChange={(e) => { setPaymentTitle(e.target.value) }}
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
                <div className="col-12 mb-2 mt-2">
                    <div className="d-flex align-items-center">
                        <Checkbox inputId="trackField" name="trackField" id="trackField" className='' checked={trackField}
                            onChange={() => {
                                setTrackField(!trackField);
                            }}
                        />
                        <label htmlFor="trackField" className="mx-2">{t('require_track_field')}</label>
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
const EditPaymentType = (props) => {
    const { t } = useTranslation();
    const item = props.item;
    const [paymentTitle, setPaymentTitle] = useState(item.payment_title);
    const [image, setImage] = useState();
    const [trackField, setTrackField] = useState(item.payment_track_field === 1 ? true : false);
    const [status, setStatus] = useState(item.status === 1 ? true : false);

    const handleEditPaymentType = async () => {
        try {
            let formData = new FormData();
            formData.append('id', item.id);
            formData.append('paymentTitle', paymentTitle);
            formData.append('paymentImage', image);
            formData.append('trackField', trackField);
            formData.append('status', status ? 1 : 0);
            formData.append('updated_at', getTimeStamp(new Date()));
            await updatePaymentType(formData);
            props.submit();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form action=""
            onSubmit={(e) => {
                e.preventDefault();
                handleEditPaymentType();
            }}
        >
            <div className="row">
                <div className="col-12">
                    <div className="d-flex jcsb align-items-center">
                        <h5 className='mt-2 mb-3 opacity'>{t('edit_payment_type')}</h5>
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
                        <label htmlFor="paymentTitle" className='required mb-1' >{t('payment_title')}</label>
                        <input type="text" id="paymentTitle" className='form-control' required
                            value={paymentTitle}
                            onChange={(e) => { setPaymentTitle(e.target.value) }}
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
                <div className="col-12 mb-2 mt-2">
                    <div className="d-flex align-items-center">
                        <Checkbox inputId="trackField" name="trackField" id="trackField" checked={trackField}
                            onChange={() => {
                                setTrackField(!trackField);
                            }}
                        />
                        <label htmlFor="trackField" className="mx-2">{t('require_track_field')}</label>
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
export default PaymentTypes;