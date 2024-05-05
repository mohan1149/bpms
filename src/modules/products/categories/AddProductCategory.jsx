import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { t } from "i18next";
import { getBranches, storeProductCategory } from '../../../apis/services';
import Select from 'react-select';
const AddProductCategory = (props) => {
    const [categoryName, setCategoryName] = useState();
    const [categoryDescription, setCategoryDescription] = useState();
    const [categoryImage, setCategoryImage] = useState();
    const [branches, setBranches] = useState([]);
    const [selectedBranches, setSelectedBranches] = useState([]);

    useEffect(() => {
        loadBranches();
    }, []);
    const loadBranches = async () => {
        try {
            const response = await getBranches();
            setBranches(response.data.data);
        } catch (error) {

        }
    }
    const handleAddCategoryFormSubmission = async () => {
        try {
            let formData = new FormData();
            formData.append('categoryName',categoryName);
            formData.append('categoryDescription',categoryDescription);
            formData.append('selectedBranches',JSON.stringify(selectedBranches.map((item)=> item.id)));
            if(categoryImage){
                formData.append('categoryImage',categoryImage);
            }
            const res = storeProductCategory(formData);
            props.onSubmit();
            props.onClose();
        } catch (error) {
            console.log(error);
            props.onClose();
        }
    }
    return (
        <form action=""
            onSubmit={(e) => {
                e.preventDefault();
                handleAddCategoryFormSubmission();
            }}
        >
            <Modal.Header>
                <Modal.Title>{t('create_product_category')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row p-2">
                    <div className="col-12 mb-2">
                        <div className="form-group">
                            <label htmlFor="category_name" className="mb-2 required">{t('category_name')}</label>
                            <input type="text" name="category_name" id="category_name" className="form-control" required
                                onChange={(e) => {
                                    setCategoryName(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-12 mb-2">
                        <div className="form-group">
                            <label htmlFor="categoryDescription" className="mb-2">{t('category_description')}</label>
                            <input type="text" name="categoryDescription" id="categoryDescription" className="form-control"
                                onChange={(e) => {
                                    setCategoryDescription(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-12 mb-2">
                        <div className="form-group">
                            <label htmlFor="category_image" className="mb-2">{t('category_image')}</label>
                            <input type="file" name="categoryImage" id="categoryImage" className="form-control"
                                onChange={(e) => {
                                    setCategoryImage(e.target.files[0]);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-12 mb-2">
                        <div className="form-group">
                            <label htmlFor="branch_address" className="mb-2 required">{t('branches')}</label>
                            <Select options={branches}
                                getOptionLabel={(item) => item.branch_name}
                                getOptionValue={(item) => item.id}
                                isMulti={true}
                                onChange={(e) => {
                                    setSelectedBranches(e);
                                }}
                                value={selectedBranches}
                            />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <input type="submit" value={t('save')} className="btn btn-red btn-round text-bold pb-2 px-4" />
                <input type="button" onClick={() => { props.onClose() }} value={t('cancel')} className="btn btn-black btn-round text-bold pb-2 px-4" />
            </Modal.Footer>
        </form>
    );


}

export default AddProductCategory;