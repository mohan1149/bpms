import React, { useState } from "react";
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { getCustomerProfileById, getCustomerProfileByCSVFile } from '../../apis/services';
import { FilterMatchMode } from 'primereact/api';
import * as XLSX from 'xlsx';
import { InputNumber } from 'primereact/inputnumber';
const AddProduct = (props) => {
    const { t } = useTranslation();
    const stockOptions = [
        { value: true, label: t('yes') },
        { value: false, label: t('no') }
    ];
    const activationOptions = [
        { value: true, label: t('yes') },
        { value: false, label: t('no') }
    ];
    const [productName, setProductName] = useState();
    const [productSku, setProductSku] = useState();
    const [productSalePrice, setProductSalePrice] = useState();
    const [productCostPrice, setProductCostPrice] = useState(0);
    const [productBranch, setProductBranch] = useState();
    const [productCategory, setProductCategory] = useState();
    const [productUnit, setProductUnit] = useState();
    const [productBrand, setProductBrand] = useState();
    const [productImage, setProductImage] = useState();
    const [isStockItem, setIsStockItem] = useState({ value: true, label: t('yes') });
    const [productStock, setProductStock] = useState();
    const [activateProduct, setActivateProduct] = useState({ value: true, label: t('yes') });
    const [productDescription, setProductDescription] = useState();
    return (
        <div className="card p-4">
            <h3><strong>{t('add_new_product')}</strong></h3>
            <form action="" method="post"
                onSubmit={(e) => {
                    e.preventDefault();

                }}
            >
                <div className="row">

                    <div className="col-md-4">
                        <div className="form-group my-2">
                            <label htmlFor="product_name" className="required mb-2">{t('product_name')}</label>
                            <input type="text" id="product_name" name="product_name" className="form-control" required
                                value={productName}
                                onChange={(e) => {
                                    setProductName(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group my-2">
                            <label htmlFor="product_sku" className="mb-2">{t('product_sku')}</label>
                            <input type="text" id="product_sku" name="product_sku" className="form-control"
                                value={productSku}
                                onChange={(e) => {
                                    setProductSku(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group my-2">
                            <label htmlFor="sale_price" className="mb-2 required">{t('sale_price')}</label>
                            <InputNumber
                                minFractionDigits={3}
                                maxLength={8}
                                useGrouping={false}
                                className='pr-input'
                                required
                                onValueChange={(e) => {
                                    setProductSalePrice(e.value);
                                }}
                                value={productSalePrice}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group my-2">
                            <label htmlFor="cost_price" className="mb-2">{t('cost_price')}</label>
                            <InputNumber
                                minFractionDigits={3}
                                maxLength={8}
                                useGrouping={false}
                                className='pr-input'
                                onValueChange={(e) => {
                                    setProductCostPrice(e.value);
                                }}
                                value={productCostPrice}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group my-2">
                            <label htmlFor="branch" className="mb-2 required">{t('branch')}</label>
                            <Select options={[]} required
                                onChange={(e) => {
                                    setProductBranch(e);
                                }}
                                value={productBranch}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group my-2">
                            <label htmlFor="category" className="mb-2 required">{t('category')}</label>
                            <Select options={[]} required
                                onChange={(e) => {
                                    setProductCategory(e);
                                }}
                                value={productCategory}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group my-2">
                            <label htmlFor="unit" className="mb-2 required">{t('unit')}</label>
                            <Select options={[]} required
                                onChange={(e) => {
                                    setProductUnit(e);
                                }}
                                value={productUnit}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group my-2">
                            <label htmlFor="brand" className="mb-2">{t('brand')}</label>
                            <Select options={[]}
                                onChange={(e) => {
                                    setProductBrand(e);
                                }}
                                value={productBrand}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group my-2">
                            <label htmlFor="product_image" className="mb-2">{t('product_image')}</label>
                            <input type="file" name="product_image" id="product_image" className="form-control"
                                onChange={(e) => {
                                    setProductImage(e.target.files[0])
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group my-2">
                            <label htmlFor="stock_item" className="mb-2">{t('stock_item')}</label>
                            <Select options={stockOptions}
                                onChange={(e) => {
                                    setIsStockItem(e)
                                }}
                                value={isStockItem}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group my-2">
                            <label htmlFor="stock_quantity" className="mb-2">{t('stock_quantity')}</label>
                            <InputNumber
                                maxLength={8}
                                useGrouping={false}
                                className='pr-input'
                                onValueChange={(e) => {
                                    setProductStock(e.value)
                                }}
                                disabled={false}
                                value={productStock}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group my-2">
                            <label htmlFor="activate_product" className="mb-2">{t('activate_product')}</label>
                            <Select options={activationOptions}
                                onChange={(e) => {
                                    setActivateProduct(e)
                                }}
                                value={activateProduct}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group my-2">
                            <label htmlFor="product_description" className="mb-2">{t('product_description')}</label>
                            <textarea name="product_description" id="product_description" cols="30" rows="10" className="form-control"
                                onChange={(e) => {
                                    setProductDescription(e.target.value);
                                }}
                            >{productDescription}</textarea>
                        </div>
                    </div>
                    <div className="col-12 mt-3 mb-3">
                        <div className="form-group my-2">
                            <input type="submit" value={t('save_product')} className="btn btn-red text-bold btn-round px-4" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default AddProduct;