import React from 'react';
import { Dialog, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { deleteResource } from '../apis/services';
const DeleteDialog = (props) => {
    const handleConfirm = async (item) => {
        try {
            const res = await deleteResource(item);
            props.onCallback();
        } catch (error) {
            props.onCallback();
            console.log(error);
        }
    }
    return (
        <Dialog
            maxWidth="xs"
            open={true}
            aria-labelledby="alert-dialog-loading"
            aria-describedby="alert-dialog-loading-indicator"
        >
            <div className='p-4'>
                <h5><strong>Confirm Delete ?</strong></h5>
                <hr />
                <p>Are you sure, you want to delete "<strong> {props.deleteItem.title}</strong>". Its non reversible operation, all the data associated with this will be deleted permanently.</p>
                <div className='d-flex'>
                    <Button className='btn btn-red text-white text-bold btn-round px-4 p-3'
                        onClick={() => {
                            handleConfirm(props.deleteItem);
                        }}
                    >Confirm & Delete</Button>
                    <Button className='btn btn-black text-white text-bold btn-round p-3 px-5 mx-3'
                        onClick={() => {
                            props.onCancel();
                        }}
                    >Cancel</Button>
                </div>
            </div>
        </Dialog>
    );
}
DeleteDialog.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onCallback: PropTypes.func.isRequired,
    deleteItem: PropTypes.object.isRequired,
    title:PropTypes.string.isRequired,
}
export default DeleteDialog;