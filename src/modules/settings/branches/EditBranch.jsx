import { useState, useEffect } from "react";
import { setUser } from "../../../redux/reducer";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { t } from "i18next";

const Branches = () => {
    const [showModal, setShowModal] = useState(false);

    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [disabled, setDisabled] = useState(false)
    const [show, setShow] = useState(false);
    const [newUsername, setNewUserName] = useState('')
    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    const [newMobile, setNewMobile] = useState('')
    const [newMail, setNewMail] = useState('')
    const [remark, setRemark] = useState('')
    const [userType, setUserType] = useState('')
    const [role, setRole] = useState('')

    useEffect(() => {
        loadBranches();
    }, []);

    const loadBranches = async () => {

    }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChecked = (e) => {
        setDisabled(e.target.checked);
        console.log('Switch value:', e.target.checked);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
        console.log(e.target.value)
    }

    const handleRadioChange = (e) => {
        setUserType(e.target.value)
        console.log(e.target.value)
    }

    const handleModuleWindow = () => {
        return (
            <>
                <Modal
                    centered
                    show={true}
                    size="lg">

                    <Modal.Header>
                        <Modal.Title>Create New User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group my-2">
                                    <label htmlFor="newUsername" className="mb-2">Username</label>
                                    <input type="text" id="newUsername" className="form-control" value={newUsername} onChange={(e) => { setNewUserName(e.target.value) }} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group my-2">
                                    <label htmlFor="newFirstName" className="mb-2">First Name</label>
                                    <input type="text" id="newFirstName" className="form-control" value={newFirstName} onChange={(e) => { setNewFirstName(e.target.value) }} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group my-2">
                                    <label htmlFor="newLastName" className="mb-2">Last Name</label>
                                    <input type="text" id="newLastName" className="form-control" value={newLastName} onChange={(e) => { setNewLastName(e.target.value) }} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group my-2">
                                    <label htmlFor="newMobile" className="mb-2">Mobile</label>
                                    <input type="text" id="newMobile" className="form-control" value={newMobile} onChange={(e) => { setNewMobile(e.target.value) }} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group my-2">
                                    <label htmlFor="newMail" className="mb-2">E-Mail</label>
                                    <input type="text" id="newMail" className="form-control" value={newMail} onChange={(e) => { setNewMail(e.target.value) }} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group my-2">
                                    <label htmlFor="remark" className="mb-2">Remark</label>
                                    <input type="text" id="remark" className="form-control" value={remark} onChange={(e) => { setRemark(e.target.value) }} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mt-2">
                                <Form.Check
                                    inline
                                    label="Super User"
                                    type='radio'
                                    name="group 1"
                                    value='superUser'
                                    onChange={handleRadioChange}
                                />
                            </div>
                            <div className="col-md-6 mt-2">
                                <Form.Check
                                    inline
                                    label="Administrator"
                                    type='radio'
                                    name="group 1"
                                    value='admin'
                                    onChange={handleRadioChange}
                                />
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-6 mt-2">
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={handleRoleChange}
                                    value={role}>
                                    <option>Role</option>
                                    <option value="x">x</option>
                                    <option value="y">y</option>
                                    <option value="z">z</option>
                                </Form.Select>

                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                        <div className="col-md-12 mb-2 mt-3 d-flex justify-content-start">
                            <Button variant="btn bg-red text-bold btn-round px-4 pt-2" onClick={() => { handleClose() }}>
                                Add Record
                            </Button>
                            <Button variant="sbtn bg-black text-bold btn-round px-4 pt-2 mx-3" onClick={() => { handleClose() }}>
                                Cancel
                            </Button>
                        </div>


                    </Modal.Footer>

                </Modal>
            </>
        );
    };

    return (
        <div>
            <Modal
                show={showModal}
                size="lg"
            >
                <form action="">
                    <Modal.Header>
                        <Modal.Title>{t('create_branch')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row p-2">
                            <div className="col-12 mb-2">
                                <div className="form-group">
                                    <label htmlFor="branch_name" className="mb-2 required">{t('branch_name')}</label>
                                    <input type="text" name="branch_name" id="branch_name" className="form-control" required />
                                </div>
                            </div>
                            <div className="col-12 mb-2">
                                <div className="form-group">
                                    <label htmlFor="branch_phone" className="mb-2 required">{t('branch_phone')}</label>
                                    <input type="text" name="branch_phone" id="branch_phone" className="form-control" required />
                                </div>
                            </div>
                            <div className="col-12 mb-2">
                                <div className="form-group">
                                    <label htmlFor="branch_address" className="mb-2 required">{t('branch_address')}</label>
                                    <input type="text" name="branch_address" id="branch_address" className="form-control" required />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <input type="submit" value={t('save')} className="btn btn-red btn-round text-bold pb-2 px-4" />
                        <input type="button" onClick={() => { setShowModal(false) }} value={t('cancel')} className="btn btn-black btn-round text-bold pb-2 px-4" />
                    </Modal.Footer>
                </form>
            </Modal>
            <div className="card p-4">
                <div className="row">
                    <div className="col-12 row mb-3">
                        <div className="col-md-6">
                            <h5><strong>{(t('manage_branches'))}</strong></h5>
                        </div>
                        <div className="col-md-6 text-end">
                            <button
                                type="button"
                                className="btn bg-red text-bold btn-round px-4 pb-2"
                                onClick={() => {
                                    setShowModal(true);
                                }}
                            >
                                {t('add_new_branch')}
                            </button>
                        </div>
                    </div>
                    <div className="col-12">
                        <DataTable
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
                                field=""
                                header="Username"
                                sortable
                                style={{ minWidth: '4rem' }}
                            />
                            <Column
                                field=""
                                header="First Name"
                                sortable
                                style={{ minWidth: '14rem' }}
                            />
                            <Column
                                field=""
                                header="Last Name"
                                sortable
                                style={{ minWidth: '14rem' }}
                            />
                            <Column
                                field=""
                                header="E-Mail"
                                sortable
                                style={{ minWidth: '8rem' }}
                            />
                            <Column
                                field=""
                                header="Contact No"
                                sortable
                                style={{ minWidth: '8rem' }}
                            />
                            <Column
                                field=""
                                header="Status"
                                sortable
                                style={{ minWidth: '8rem' }}
                            />
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>

    );


}

export default Branches;