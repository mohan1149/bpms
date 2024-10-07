import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { json, Link } from 'react-router-dom';
import Select from 'react-select';
import { Button } from 'primereact/button';
import { getBranches, getServicesByBranch,addEmployee } from '../../apis/services';
import { Avatar } from 'primereact/avatar';
import { getTimeStamp } from '../../helpers/helpers';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
const AddEmployee = () => {
    const { t } = useTranslation();
    const toast = useRef();
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [branches, setBranches] = useState([]);
    const [services, setServices] = useState([]);
    const [empImage, setEmpImage] = useState();
    const [nid, setNid] = useState();
    const [status, setStatus] = useState(true);
    const [selectedServices, setSelectedServices] = useState([]);
    const [branch, setBranch] = useState();
    const [password, setPassword] = useState();
    const [confrimPassword, setConfrimPassword] = useState();

    useEffect(() => {
        loadBranches();
    }, []);
    const loadBranches = async () => {
        try {
            const res = await getBranches(1);
            setBranches(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    const loadServices = async (bid) => {
        try {
            const res = await getServicesByBranch([bid]);
            setServices(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleAddEmployee = async () => {
        try {
            let formData = new FormData();
            let serviceBranches = selectedServices.map((e) => e.id);
            formData.append('selectedServices',JSON.stringify(serviceBranches));
            formData.append('fullName', fullName);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('address', address);
            formData.append('branch', branch.branch.id);
            formData.append('status', status ? 1 : 0);
            formData.append('nid',nid);
            formData.append('password',password);
            formData.append('created_at', getTimeStamp(new Date()));
            formData.append('updated_at', getTimeStamp(new Date()));
            formData.append('empImage', empImage);
            const res = await addEmployee(formData);
            if (res.data.status) {
                toast.current.show({ severity: 'success', summary: t('success'), detail: t(res.data.message), life: 3000 });
            } else {
                toast.current.show({ severity: 'error', summary: t('error'), detail: t(res.data.message), life: 3000 });
            }

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div>
            <Toast ref={toast} />
            <div className="glass-card p-3">
                <div className="d-flex jcsb">
                    <div className='mt-2 mb-2'>
                        <h4>{t('add_new_employee')}</h4>
                    </div>
                    <div className='p-2'>
                        <Link to='/employees' className="link-btn">
                            {t('back')}
                        </Link>
                    </div>
                </div>
                <div>
                    <form action=""
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAddEmployee();
                        }}
                    >
                        <div className="row">
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="fullName" className='required mb-1' >{t('full_name')}</label>
                                    <input type="text" id="fullName" className='form-control' required
                                        value={fullName}
                                        onChange={(e) => { setFullName(e.target.value) }}
                                    />
                                </div>
                            </div>

                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="email" className='required mb-1' >{t('email')}</label>
                                    <input type="email" className='form-control' id="email" required
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="phone" className='required mb-1' >{t('phone')}</label>
                                    <input type="number" className='form-control' id="phone" required
                                        value={phone}
                                        onChange={(e) => { setPhone(e.target.value) }}
                                    />
                                </div>
                            </div>


                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="address" className='required mb-1' >{t('address')}</label>
                                    <input type="address" className='form-control' id="address" required
                                        value={address}
                                        onChange={(e) => { setAddress(e.target.value) }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="nid" className='required mb-1' >{t('nid')}</label>
                                    <input type="text" id="nid" className='form-control' required
                                        value={nid}
                                        onChange={(e) => { setNid(e.target.value) }}
                                    />
                                </div>
                            </div>


                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="branch" className='required mb-1' >{t('branch')}</label>
                                    <Select options={branches} id="branch" required
                                        placeholder={t('choose_branch')}
                                        onChange={(e) => {
                                            setBranch(e);
                                            setSelectedServices([]);
                                            loadServices(e.branch.id);
                                        }}
                                        getOptionLabel={(e) => {
                                            return (
                                                <div className='d-flex align-items-center'>
                                                    <Avatar image={e.branch.branch_image} size="normal" imageAlt={e.branch.branch_name} />
                                                    <span className='mx-2'>{e.branch.branch_name}</span>
                                                </div>
                                            )
                                        }}
                                        getOptionValue={(e) => e.branch.id}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="password" className='required mb-1' >{t('password')}</label>
                                    <input type="password" className='form-control' id="password" required
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="confirm_password" className='required mb-1' >{t('confirm_password')}</label>
                                    <input type="password" className='form-control' id="confirm_password" required
                                        value={confrimPassword}
                                        onChange={(e) => { setConfrimPassword(e.target.value) }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <label htmlFor="image" className='required mb-1' >{t('image')}</label>
                                    <input type="file" className='form-control pr-input' id="image" required accept="image/*"
                                        onChange={(e) => {
                                            setEmpImage(e.target.files[0]);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <label htmlFor="services" className='required mb-1' >{t('services')}</label>
                                    <Select options={services} id="services" required
                                        placeholder={t('select_services')}
                                        isMulti={true}
                                        onChange={(e) => {
                                            setSelectedServices(e)
                                        }}
                                        getOptionValue={(e) => e.id}
                                        getOptionLabel={(e)=> e.service_name}
                                        value={selectedServices}

                                    />
                                </div>
                            </div>
                            <div className="col-md-12 mt-2">
                                <div className="d-flex">
                                    <div className="flex align-items-center">
                                        <Checkbox inputId="status" name="status" checked={status} className='mx-1'
                                            onChange={() => {
                                                setStatus(!status);
                                            }}
                                        />
                                        <label htmlFor="status" className="ml-2">{t('enable_for_use')}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <Button type='submit' className='p-btn'>{t('add_employee')}</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default AddEmployee;