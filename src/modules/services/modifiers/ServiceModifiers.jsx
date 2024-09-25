import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { useStore } from 'react-redux';
import { storeServiceModifier, getServiceModifiers, updateServiceModifier } from './../../../apis/services';
import { Modal } from 'react-bootstrap';
import { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { setShowDeleteDialog } from '../../../redux/reducer';
import DeleteModalContent from '../../../commons/DeleteModalContent';
import { getTimeStamp, getFormattedCurrency } from '../../../helpers/helpers';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import { InputSwitch } from 'primereact/inputswitch';

const ServiceModifiers = () => {
    const { t } = useTranslation();
    const store = useStore();
    const [serviceModifiers, setServiceModifiers] = useState([]);
    const [showAddServiceModifierModal, setShowAddServiceModifierModal] = useState(false);
    const [showEditServiceModifierModal, setShowEditServiceModifierModal] = useState({ show: false, item: '' });
    useEffect(() => {
        loadServiceModifiers();
    }, []);
    const loadServiceModifiers = async () => {
        try {
            const res = await getServiceModifiers();
            setServiceModifiers(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className="glass-card p-3">
                <div className="d-flex jcsb">
                    <div className='mt-2 mb-2'>
                        <h4>{t('manage_service_modifiers')}</h4>
                    </div>
                    <div className='p-2'>
                        <Button className='p-btn'
                            onClick={() => {
                                setShowAddServiceModifierModal(true);
                            }}
                        > {t('add_service_modifier')}</Button>
                    </div>
                </div>
                <Modal
                    show={showAddServiceModifierModal}
                >
                    <div className='p-4'>
                        <AddServiceModifier
                            submit={() => {
                                setShowAddServiceModifierModal(false);
                                loadServiceModifiers();
                            }}
                            cancel={() => {
                                setShowAddServiceModifierModal(false);
                            }}
                        />
                    </div>
                </Modal>
                <Modal
                    show={showEditServiceModifierModal.show}
                >
                    <div className='p-4'>
                        <EditServiceModifier
                            submit={() => {
                                setShowEditServiceModifierModal({ show: false, item: '' });
                                loadServiceModifiers();
                            }}
                            cancel={() => {
                                setShowEditServiceModifierModal({ show: false, item: '' });
                            }}
                            item={showEditServiceModifierModal.item}
                        />
                    </div>
                </Modal>
                {

                }
                <DeleteModalContent
                    reload={() => {
                        loadServiceModifiers();
                    }}
                />
                <div className="data-table mt-2">
                    <DataTable
                        value={serviceModifiers}
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
                            field="modifier_title"
                            header={t('modifier_title')}
                            sortable
                        />
                        <Column
                            field="modifier_desc"
                            header={t('modifier_desc')}
                            sortable
                        />
                        <Column
                            sortField="modifier_price"
                            header={t('modifier_price')}
                            sortable
                            body={(row) => getFormattedCurrency(row.modifier_price)}
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
                                                setShowEditServiceModifierModal({ show: true, item: row });
                                            }}
                                            className='icon-btn mx-1' severity='primary' id="edit-btn">
                                            <span className="material-symbols-outlined">
                                                edit
                                            </span>
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                store.dispatch(setShowDeleteDialog({ show: true, url: '/services/modifiers/delete/' + row.id }))
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

const AddServiceModifier = (props) => {
    const { t } = useTranslation();
    const [modifierTitle, setModifierTitle] = useState();
    const [modifierDesc, setModifierDesc] = useState();
    const [modifierPrice, setModifierPrice] = useState();
    const [status, setStatus] = useState(true);

    const handleAddServiceModifier = async () => {
        try {
            let data = {
                modifierTitle: modifierTitle,
                modifierDesc: modifierDesc,
                modifierPrice: modifierPrice,
                status:status,
                created_at: getTimeStamp(new Date()),
                updated_at: getTimeStamp(new Date()),
            };
            await storeServiceModifier(data);
            props.submit();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form action=""
            onSubmit={(e) => {
                e.preventDefault();
                handleAddServiceModifier();
            }}
        >
            <div className="row">
                <div className="col-12">
                    <div className="d-flex jcsb align-items-center">
                        <h5 className='mt-2 mb-3 opacity'>{t('add_new_service_modifier')}</h5>
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
                        <label htmlFor="modifierTitle" className='required mb-1' >{t('modifier_title')}</label>
                        <input type="text" id="modifierTitle" className='form-control' required
                            value={modifierTitle}
                            onChange={(e) => { setModifierTitle(e.target.value) }}
                        />
                    </div>
                </div>

                <div className="col-12 mb-2">
                    <div className="form-group">
                        <label htmlFor="modifierPrice" className='required mb-1' >{t('modifier_price')}</label>
                        <InputNumber type="text" id="modifierPrice" className='pr-input' required useGrouping={false} maxFractionDigits={3}
                            value={modifierPrice}
                            onChange={(e) => { setModifierPrice(e.value) }}
                        />
                    </div>
                </div>

                <div className="col-12 mb-2">
                    <div className="form-group">
                        <label htmlFor="modifierDesc" className='required mb-1' >{t('modifier_desc')}</label>
                        <input type="text" id="modifierDesc" className='form-control' required
                            value={modifierDesc}
                            onChange={(e) => { setModifierDesc(e.target.value) }}
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
const EditServiceModifier = (props) => {
    const { t } = useTranslation();
    const item = props.item;
    const [modifierTitle, setModifierTitle] = useState(item.modifier_title);
    const [modifierDesc, setModifierDesc] = useState(item.modifier_desc);
    const [modifierPrice, setModifierPrice] = useState(item.modifier_price);
    const [status, setStatus] = useState(item.status === 1 ? true : false);

    const handleEditServiceModifier = async () => {
        try {
            let data = {
                id: item.id,
                modifierTitle: modifierTitle,
                modifierDesc: modifierDesc,
                modifierPrice: modifierPrice,
                status:status,
                updated_at: getTimeStamp(new Date()),
            };
            await updateServiceModifier(data);
            props.submit();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form action=""
            onSubmit={(e) => {
                e.preventDefault();
                handleEditServiceModifier();
            }}
        >
            <div className="row">
                <div className="col-12">
                    <div className="d-flex jcsb align-items-center">
                        <h5 className='mt-2 mb-3 opacity'>{t('edit_service_modifier')}</h5>
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
                        <label htmlFor="modifierTitle" className='required mb-1' >{t('modifier_title')}</label>
                        <input type="text" id="modifierTitle" className='form-control' required
                            value={modifierTitle}
                            onChange={(e) => { setModifierTitle(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="form-group">
                        <label htmlFor="modifierPrice" className='required mb-1' >{t('modifier_price')}</label>
                        <InputNumber type="text" id="modifierPrice" className='pr-input' required useGrouping={false} maxFractionDigits={3}
                            value={modifierPrice}
                            onChange={(e) => { setModifierPrice(e.value) }}
                        />
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="form-group">
                        <label htmlFor="modifierDesc" className='required mb-1' >{t('modifier_desc')}</label>
                        <input type="text" id="modifierDesc" className='form-control' required
                            value={modifierDesc}
                            onChange={(e) => { setModifierDesc(e.target.value) }}
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
export default ServiceModifiers;