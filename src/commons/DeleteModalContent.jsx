import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { useStore } from 'react-redux';
import { deleteRecord } from './../apis/services';
import { setShowDeleteDialog } from './../redux/reducer';

const DeleteModalContent = (props) => {
    const { t } = useTranslation();
    const store = useStore();
    const [deleteDialog, setDeleteDialog] = useState(false);
    store.subscribe(() => {
        if (store.getState().app.showDeleteDialog.show) {
            setDeleteDialog(true);
        }
    });
    const handleDeleteRecord = async () => {
        try {
          
            let recordPath = store.getState().app.showDeleteDialog.url;
            const res = await deleteRecord(recordPath);
            store.dispatch(setShowDeleteDialog({show:false}));
            setDeleteDialog(false);
            props.reload();
        } catch (error) {
            
        }
    }
    return (
        <Modal
            size="md"
            show={deleteDialog}
            top
            className='delete_modal'
        >
            <div className="p-4">
                <div className="d-flex align-items-center jscb">
                    <h4>{t('confirm_deletion')}</h4>
                    <Button severity='secondary' raised className='icon-btn'
                        onClick={() => {
                            setDeleteDialog(false);
                        }}
                    >
                        <span className="material-symbols-outlined">
                            cancel
                        </span>
                    </Button>

                </div>
                <h6 className="mt-3">{t('delete_text_message')}</h6>
                <div className='mt-4'>
                    <Button severity='danger' raised className='btn-pill'
                        onClick={() => {
                            setDeleteDialog(false);
                            handleDeleteRecord();
                        }}
                    >{t('confirm_delete')}</Button>
                </div>
            </div>
        </Modal>
    );
}
export default DeleteModalContent;