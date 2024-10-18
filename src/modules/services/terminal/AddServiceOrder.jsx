import React, { useEffect, useState, useRef } from 'react';
import { useStore } from 'react-redux';
import { setShowSidemenu } from '../../../redux/reducer';
import { Button } from 'primereact/button';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { getFormattedCurrency } from '../../../helpers/helpers';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { InputSwitch } from 'primereact/inputswitch';
import { InputNumber } from 'primereact/inputnumber';
import { Modal } from 'react-bootstrap';
import { getServiceRegsiterDetails } from '../../../apis/services';
import { useReactToPrint } from "react-to-print";
import { can } from '../../../helpers/helpers';
import NoPerm from '../../../commons/NoPerm';
import OpenRegisterForm from './components/OpenRegisterForm';
import TerminalMeta from './components/TerminalMeta';
import { Tag } from 'primereact/tag';
const AddServiceOrder = () => {
    const store = useStore();
    const user = store.getState().app.user;
    const { t } = useTranslation();
    const componentRef = useRef();
    const [registerData, setRegisterData] = useState();
    const [openTerminal, setOpenTerminal] = useState(false);

    const [services, setServices] = useState([]);
    const [itemsPerRow, setItemsPerRow] = useState({ label: t('items_per_row'), value: 2 });
    const [showSettings, setShowSettings] = useState(false);
    const [render, setRender] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [showModifiersModal, setShowModifiersModal] = useState({ show: false, item: '' });
    const [serviceModifiers, setServiceModifiers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [variations, setVariations] = useState([]);
    const [variation, setVariation] = useState();
    const [searchKey, setSearchKey] = useState();
    const [customer, setCustomer] = useState();
    const [employees, setEmployees] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [branch, setBranch] = useState();
    const [discount, setDiscount] = useState(0);
    const [showSaveOrder, setShowSaveOrder] = useState(true);

    const [discountType, setDiscountType] = useState({
        label: t('flat'),
        value: 'flat',
    });
    const [showDiscountModal, setShowDiscountModal] = useState(false);
    const [filteredServices, setFilteredServices] = useState(services);
    const itemsPerRowCount = [
        {
            label: t('6_per_row'),
            value: '2',
        },
        {
            label: t('4_per_row'),
            value: '3',
        },
        {
            label: t('3_per_row'),
            value: '4',
        },
    ];
    const discountOptions = [
        {
            label: t('flat'),
            value: 'flat',
        },
        {
            label: t('percent'),
            value: 'percent',
        },

    ];
    useEffect(() => {
        store.dispatch(setShowSidemenu(false));
        loadServiceRegisterDetails();
        return () => {
            store.dispatch(setShowSidemenu(true));
        };
    }, []);

    const loadServiceRegisterDetails = async () => {
        let data = {
            register: localStorage.getItem('_register'),
        }
        const res = await getServiceRegsiterDetails(data);
        setBranch(res.data.data.branch);
        setCategories(res.data.data.categories);
        setServiceModifiers(res.data.data.modifiers);
        setCustomers(res.data.data.customers);
        setServices(res.data.data.services);
        setFilteredServices(res.data.data.services);
        setVariations(res.data.data.variations);
        setEmployees(res.data.data.employees);
        setRegisterData(res.data.data);
    }

    const addItemToCart = (item) => {
        let locDiscount = item.service_location_discount;
        let discountMoney = (item.location_price * locDiscount) / 100;
        let existingCart = cartItems;
        let index = existingCart.findIndex((i) => i.id === item.id);
        if (index === -1) {
            let cartItem = {
                id: item.id,
                service_name: item.service_name,
                image: item.service_image,
                quantity: 1,
                service_price: item.location_price - discountMoney,
                total_price: item.location_price - discountMoney,
                altered_price: item.location_price - discountMoney,
                modifiers: [],
                item_service_staff: '',
                notes: '',
            };
            existingCart.push(cartItem);
        }
        setCartItems(existingCart);
        setRender(!render);
    }
    const removeItemFromCart = (item) => {
        let existingCart = cartItems;
        let index = existingCart.findIndex((i) => i.id === item.id);
        existingCart.splice(index, 1);
        setCartItems(existingCart);
        setRender(!render);
    }
    const alterItemPrice = (item, newPrice) => {
        let existingCart = cartItems;
        let index = existingCart.findIndex((i) => i.id === item.id);
        let clickedItem = existingCart[index];
        clickedItem.altered_price = newPrice;
        clickedItem.total_price = newPrice * clickedItem.quantity;
        existingCart[index] = clickedItem;
        setCartItems(existingCart);
        setRender(!render);
    }
    const assignServiceStaff = (item, staff) => {
        let existingCart = cartItems;
        let index = existingCart.findIndex((i) => i.id === item.id);
        let clickedItem = existingCart[index];
        clickedItem.item_service_staff = staff;
        existingCart[index] = clickedItem;
        setCartItems(existingCart);
        setRender(!render);
    }
    const addServiceNotes = (item, notes) => {
        let existingCart = cartItems;
        let index = existingCart.findIndex((i) => i.id === item.id);
        let clickedItem = existingCart[index];
        clickedItem.notes = notes;
        existingCart[index] = clickedItem;
        setCartItems(existingCart);
        setRender(!render);
    }
    const updateItemQuantity = (item, newPrice, op) => {
        let existingCart = cartItems;
        let index = existingCart.findIndex((i) => i.id === item.id);
        let clickedItem = existingCart[index];
        if (clickedItem.quantity > 1 || op == 1) {
            clickedItem.total_price = clickedItem.total_price + newPrice;
            clickedItem.quantity = clickedItem.quantity + op;
            existingCart[index] = clickedItem;
            setCartItems(existingCart);
            setRender(!render);
        } else {
            removeItemFromCart(item);
        }
    }
    const alterModifiers = (item, modifiers) => {
        let existingCart = cartItems;
        let index = existingCart.findIndex((i) => i.id === item.id);
        let clickedItem = existingCart[index];
        clickedItem.modifiers = modifiers;
        existingCart[index] = clickedItem;
        setCartItems(existingCart);
        setRender(!render);
    }
    const getTotalPrice = (withDiscount = 0) => {
        let totalPrice = cartItems.reduce((a, b) => a + b.total_price, 0);
        let modifiers_price = cartItems.map((i) => {
            return i.modifiers.reduce((a, b) => a + b.modifier_price, 0);
        });
        let modifiers_total = modifiers_price.length > 0 ? modifiers_price[0] : 0;
        return withDiscount === 1 ? getFormattedCurrency(((totalPrice - discount) + modifiers_total)) : getFormattedCurrency((totalPrice + modifiers_total), 1);
    }
    const searchServices = (key) => {
        let filteredByKey = services.filter((item) => item.service_name.toLowerCase().includes(key.toLowerCase()));
        setFilteredServices(filteredByKey);
    }
    const applyVariationFilter = (v) => {
        if (v !== null) {
            let filteredByVariation = services.filter((item) => item.service_variation === v.id);
            setFilteredServices(filteredByVariation);
        } else {
            setFilteredServices(services);
        }
    }
    const applyCategoriesFilter = (cats) => {
        if (cats.length === 0) {
            setFilteredServices(services);
        } else {
            let filteredByCategories = services.filter((item) => cats.includes(item.service_category));
            setFilteredServices(filteredByCategories);
        }
    }
    const handlePrint = useReactToPrint({
        contentRef: componentRef,
    });
    return (
        <div className="">
            {
                !can('service_terminal') &&
                <NoPerm />
            }
            {
                can('service_terminal') &&
                <div>
                    {
                        registerData !== undefined &&
                        <div>
                            {
                                (registerData.register.status === 'not_exist' && !openTerminal) &&
                                <OpenRegisterForm openRegister={() => { setOpenTerminal(true) }} />
                            }
                            {
                                (registerData.register.status === 'opened' || openTerminal) &&
                                <div>
                                    <TerminalMeta branch={branch.branch_name} user={user.user.name} />
                                    <Offcanvas show={showSettings}
                                        placement="end"
                                        className="p-2"
                                    >
                                        <div className='p-3'>
                                            <div className="d-flex jcsb align-items-center">
                                                <h4>{t('terminal_settings')}</h4>
                                                <Button severity='secondary' className='icon-btn'
                                                    onClick={() => {
                                                        setShowSettings(false);
                                                    }}
                                                >
                                                    <span className="material-symbols-outlined">
                                                        close
                                                    </span>
                                                </Button>
                                            </div>
                                        </div>
                                        <Offcanvas.Body>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label className="mb-1">{t('items_per_row')}</label>
                                                        <Select
                                                            placeholder={t('items_per_row')}
                                                            options={itemsPerRowCount}
                                                            onChange={(e) => {
                                                                setItemsPerRow(e);
                                                            }}
                                                            value={itemsPerRow}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 mt-3">
                                                    <div className="form-group">
                                                        <label className="mb-1">{t('invoice_style')}</label>
                                                        <Select
                                                            placeholder={t('items_per_row')}
                                                            options={itemsPerRowCount}
                                                            onChange={(e) => {
                                                                setItemsPerRow(e);
                                                            }}
                                                            value={itemsPerRow}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-12 mt-4">
                                                    <div className="d-flex jcsb align-items-center">
                                                        <h6><strong>Show Variations</strong></h6>
                                                        <InputSwitch />
                                                    </div>
                                                </div>
                                                <div className="col-12 mt-4">
                                                    <div className="d-flex jcsb align-items-center">
                                                        <h6><strong>Show Images</strong></h6>
                                                        <InputSwitch />
                                                    </div>
                                                </div>
                                            </div>

                                        </Offcanvas.Body>
                                        <Button label={t('save_settings')}
                                            onClick={() => {
                                                setShowSettings(false);
                                            }}
                                        />
                                    </Offcanvas>
                                    <Modal
                                        show={showDiscountModal}>
                                        <div className="p-3">
                                            <div className="d-flex jcsb">
                                                <h5>{t('add_discount')}</h5>
                                                <Button className='icon-btn' severity='danger'
                                                    onClick={() => {
                                                        setShowDiscountModal(false);
                                                    }}
                                                >
                                                    <span className="material-symbols-outlined">
                                                        close
                                                    </span>
                                                </Button>
                                            </div>
                                            <div className="mt-3">
                                                <label htmlFor="discount" className='mb-1'>{t('discoun_type')}</label>
                                                <Select options={discountOptions} value={discountType}
                                                    onChange={(e) => {
                                                        setDiscountType(e)
                                                    }}
                                                />
                                                <label htmlFor="discount" className='mb-1 mt-2'>{t('discount')}</label>
                                                <InputNumber
                                                    className='pr-input'
                                                    maxFractionDigits={3}
                                                    onChange={(e => {
                                                        if (discountType.value === "flat") {
                                                            setDiscount(e.value);
                                                        }
                                                        else {
                                                            let val = (getTotalPrice() * e.value) / 100;
                                                            setDiscount(val);
                                                        }
                                                    })}
                                                />

                                                <Button label={t('save')} className='p-btn mt-3'
                                                    onClick={() => {
                                                        setShowDiscountModal(false);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </Modal>
                                    <Modal
                                        show={showModifiersModal.show}
                                        size="lg"
                                    >
                                        <div className="p-3">
                                            <div className="d-flex jcsb">
                                                <h5>{t('item_modifiers')} - {showModifiersModal.item.service_name}</h5>
                                                <Button className='icon-btn' severity='danger'
                                                    onClick={() => {
                                                        setShowModifiersModal({ show: false, item: '' });
                                                    }}
                                                >
                                                    <span className="material-symbols-outlined">
                                                        close
                                                    </span>
                                                </Button>

                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="" className='mb-1'>{t('item_price')}</label>
                                                        <InputNumber
                                                            value={showModifiersModal.item.altered_price}
                                                            useGrouping={false}
                                                            maxFractionDigits={3}
                                                            className='pr-input'
                                                            onChange={(e) => {
                                                                alterItemPrice(showModifiersModal.item, e.value);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="" className='mb-1 mt-2'>{t('service_modifiers')}</label>
                                                        <Select options={serviceModifiers}
                                                            getOptionValue={(i) => i.id}
                                                            getOptionLabel={(i) => i.modifier_title}
                                                            isMulti={true}
                                                            onChange={(e) => {
                                                                alterModifiers(showModifiersModal.item, e)
                                                            }}
                                                            value={showModifiersModal.item.modifiers}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="" className='mb-1 mt-2'>{t('service_staff')}</label>
                                                        <Select options={employees}
                                                            getOptionValue={(i) => i.id}
                                                            getOptionLabel={(i) => i.full_name + ' (' + i.phone + ')'}
                                                            onChange={(e) => {
                                                                assignServiceStaff(showModifiersModal.item, e)
                                                            }}
                                                            value={showModifiersModal.item.item_service_staff}
                                                            isClearable
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="serviceNotes" className='mb-1 mt-2'>{t('notes')}</label>
                                                        <input type="text" name="serviceNotes" id="serviceNotes" className='form-control'
                                                            onChange={(e) => {
                                                                addServiceNotes(showModifiersModal.item, e.target.value);
                                                            }}
                                                            value={showModifiersModal.item.notes}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 mt-2 mb-3">
                                                    <Button label={t('attach')} className='p-btn'
                                                        onClick={() => {
                                                            setShowModifiersModal({ show: false, item: '' });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Modal>
                                    <Modal
                                        show={showSaveOrder}
                                        size="lg"
                                    >
                                        <div className="p-3">
                                            <h5>{t('save_order')}</h5>
                                            <table className='table'>
                                                <thead>
                                                    <tr>
                                                        <th>{t('item')}</th>
                                                        <th className='text-center'>{t('qun')}</th>
                                                        <th className='text-center'>{t('price')}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        cartItems.map((i, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td
                                                                        style={{
                                                                            maxWidth: '7rem',
                                                                            padding: 0,
                                                                            paddingTop: 3,
                                                                            paddingBottom: 3,
                                                                        }}
                                                                    >
                                                                        {i.service_name}
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            maxWidth: '5rem',
                                                                            paddingTop: 3,
                                                                            paddingBottom: 3,
                                                                        }}
                                                                    >
                                                                        <div className="d-flex align-items-center jcc">
                                                                           
                                                                            <span className='mx-1'>{i.quantity}</span>
                                                                           
                                                                        </div>
                                                                    </td>
                                                                    <td
                                                                        className='text-center'
                                                                        style={{
                                                                            paddingTop: 3,
                                                                            paddingBottom: 3,
                                                                            cursor: 'pointer'
                                                                        }}
                                                                    >
                                                                        <strong>{getFormattedCurrency(i.total_price, 1)}</strong>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                            <Button label={t('cancel')} severity='danger' className='rounded-btn'
                                                onClick={()=>{
                                                    setShowSaveOrder(false);
                                                }}
                                            />
                                        </div>
                                    </Modal>
                                    <div className="row">
                                        <div className="col-md-8 m-0 p-0">
                                            <div className="p-2 card m-1"
                                                style={{
                                                    maxHeight: '82vh',
                                                    height: '82vh',
                                                    overflowY: 'scroll'
                                                }}
                                            >
                                                <div className='mt-3 mb-3'>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <input type="text" name="" id="" className='form-control' placeholder={t('search_here')}
                                                                onChange={(e) => {
                                                                    setSearchKey(e.target.value);
                                                                    setVariation('');
                                                                    setSelectedCategories([]);
                                                                    searchServices(e.target.value);
                                                                }}
                                                                value={searchKey}
                                                            />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <Select
                                                                placeholder={t('customer')}
                                                                options={customers}
                                                                getOptionLabel={(e) => e.full_name + ' (' + e.phone + ')'}
                                                                getOptionValue={(e) => e.id}
                                                                onChange={(e) => {
                                                                    setCustomer(e);
                                                                }}
                                                                value={customer}
                                                                isClearable
                                                            />
                                                        </div>

                                                        <div className="col-8 mt-2">
                                                            <Select options={categories}
                                                                isMulti={true}
                                                                isClearable={true}
                                                                placeholder={t('filter_by_category')}
                                                                getOptionLabel={(e) => e.category_title}
                                                                getOptionValue={(e) => e.id}
                                                                value={selectedCategories}
                                                                onChange={(e) => {
                                                                    setSelectedCategories(e);
                                                                    setSearchKey('');
                                                                    setVariation('');
                                                                    applyCategoriesFilter(e.map((e) => e.id))
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col-4 mt-2">
                                                            <Select options={variations}
                                                                isClearable={true}
                                                                placeholder={t('filter_by_variation')}
                                                                getOptionLabel={(v) => v.variation_title}
                                                                getOptionValue={(v) => v.id}
                                                                onChange={(e) => {
                                                                    setSelectedCategories([]);
                                                                    setSearchKey('');
                                                                    setVariation(e);
                                                                    applyVariationFilter(e);
                                                                }}
                                                                value={variation}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='mx-2 mt-2'>
                                                    <div className="row">
                                                        {
                                                            filteredServices.map((service, index) => {
                                                                return (
                                                                    <div className={"col-md-" + itemsPerRow.value + " mb-1 p-0"} key={index}>
                                                                        <div className="glass-card mx-1 text-center p-1">
                                                                            <Button className='service-btn'
                                                                                onClick={() => {
                                                                                    addItemToCart(service);
                                                                                }}
                                                                            >
                                                                                <div>
                                                                                    {service.service_location_discount !== 0 &&
                                                                                        <Tag
                                                                                            style={{
                                                                                                position: 'absolute',
                                                                                                right: 0
                                                                                            }}
                                                                                            value={service.service_location_discount + '%'}
                                                                                        />
                                                                                    }
                                                                                    <div>
                                                                                        <img src={service.service_image} alt=""
                                                                                            style={{
                                                                                                width: '100%',
                                                                                                padding: 4,
                                                                                                borderRadius: 10,
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                    <div>
                                                                                        <strong className='p-2 opacity'>{service.service_name}</strong>
                                                                                    </div>
                                                                                    <div className='mt-1 mb-1'>
                                                                                        {
                                                                                            service.service_location_discount !== 0 &&
                                                                                            <span><strong>{getFormattedCurrency(((service.location_price) - service.location_price * service.service_location_discount / 100), 1)}</strong>/
                                                                                                <span
                                                                                                    style={{
                                                                                                        textDecorationLine: "line-through"
                                                                                                    }}
                                                                                                >{getFormattedCurrency(service.location_price, 1)}</span>
                                                                                            </span>
                                                                                        }
                                                                                        {
                                                                                            service.service_location_discount === 0 &&
                                                                                            <span> <strong>{getFormattedCurrency(service.location_price)} </strong></span>
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 m-0 p-0"
                                            style={{
                                                maxHeight: '83vh',
                                                height: '83vh',
                                                overflow: 'scroll'
                                            }}
                                        >
                                            <div className="p-2 glass-card m-1">
                                                <h6 className='d-flex jcsb'>
                                                    {/* <span> <strong>{t('Date')}</strong> - {new Date().toDateString()}</span> */}
                                                    <Button className='icon-sm-btn mx-1' severity="primary"
                                                        onClick={() => {
                                                            setShowSettings(true);
                                                        }}
                                                    >
                                                        <span className="material-symbols-outlined">
                                                            settings
                                                        </span>
                                                    </Button>
                                                </h6>
                                                <div
                                                    style={{
                                                        maxHeight: '85vh',
                                                        height: '53vh',
                                                        overflowY: 'scroll'
                                                    }}
                                                >
                                                    <table className='table'>
                                                        <thead>
                                                            <tr>
                                                                <th>{t('item')}</th>
                                                                <th className='text-center'>{t('qun')}</th>
                                                                <th className='text-center'>{t('price')}</th>
                                                                <th className='text-center'>{t('edit')}</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                cartItems.map((i, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td
                                                                                style={{
                                                                                    maxWidth: '7rem',
                                                                                    padding: 0,
                                                                                    paddingTop: 3,
                                                                                    paddingBottom: 3,
                                                                                }}
                                                                            >
                                                                                {i.service_name}
                                                                            </td>
                                                                            <td
                                                                                style={{
                                                                                    maxWidth: '5rem',
                                                                                    paddingTop: 3,
                                                                                    paddingBottom: 3,
                                                                                }}
                                                                            >
                                                                                <div className="d-flex align-items-center jcc">
                                                                                    <Button className='icon-xs-btn' severity="secondary" outlined
                                                                                        onClick={() => {
                                                                                            updateItemQuantity(i, -(i.altered_price), -1);
                                                                                        }}
                                                                                    >
                                                                                        <span className="material-symbols-outlined">
                                                                                            do_not_disturb_on
                                                                                        </span>
                                                                                    </Button>
                                                                                    <span className='mx-1'>{i.quantity}</span>
                                                                                    <Button className='icon-xs-btn' severity="secondary" outlined
                                                                                        onClick={() => {
                                                                                            updateItemQuantity(i, i.altered_price, 1);
                                                                                        }}
                                                                                    >
                                                                                        <span className="material-symbols-outlined">
                                                                                            add_circle
                                                                                        </span>
                                                                                    </Button>
                                                                                </div>
                                                                            </td>
                                                                            <td
                                                                                className='text-center'
                                                                                style={{
                                                                                    paddingTop: 3,
                                                                                    paddingBottom: 3,
                                                                                    cursor: 'pointer'
                                                                                }}
                                                                            >
                                                                                <strong>{getFormattedCurrency(i.total_price, 1)}</strong>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <div className="d-flex align-items-center jcc">
                                                                                    <Button className='icon-xs-btn bg mx-1' severity="secondary"
                                                                                        onClick={() => {
                                                                                            setShowModifiersModal({ show: true, item: i });
                                                                                        }}
                                                                                    >
                                                                                        <span className="material-symbols-outlined">
                                                                                            edit_note
                                                                                        </span>
                                                                                    </Button>

                                                                                    <Button className='icon-xs-btn bg mx-1' severity="danger"
                                                                                        onClick={(e) => {
                                                                                            removeItemFromCart(i);
                                                                                        }}
                                                                                    >
                                                                                        <span className="material-symbols-outlined">
                                                                                            close
                                                                                        </span>
                                                                                    </Button>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>

                                                </div>
                                                <div
                                                    style={{
                                                        backgroundColor: '#141B4D',
                                                        color: "#FFF",
                                                        padding: 15,
                                                        borderRadius: 10,
                                                    }}
                                                >
                                                    <div>
                                                        <div className='d-flex jcsb'>
                                                            <h5>{t('total')} : {getTotalPrice()}</h5>
                                                            <h5 className='opacity'
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    textDecoration: 'underline'
                                                                }}
                                                                onClick={() => {
                                                                    setShowDiscountModal(true);
                                                                }}
                                                            >{t('discount')} : {getFormattedCurrency(discount, 1)}</h5>
                                                        </div>
                                                        <h5>{t('grand_total')} : {getTotalPrice(1)}</h5>
                                                    </div>
                                                    <h2
                                                        id="printOrder"
                                                        style={{
                                                            display: 'none'
                                                        }}
                                                        ref={componentRef}>sws</h2>
                                                    <div className='mt-4 d-flex jcc'>
                                                        <Button label={t('confrim')} className='mb-1'
                                                            // onClick={handlePrint}
                                                            onClick={() => {
                                                                var mywindow = window.open('', 'PRINT', 'height=800,width=800');
                                                                mywindow.document.write('<html><head><title>' + document.title + '</title>');
                                                                mywindow.document.write('</head><body >');
                                                                mywindow.document.write(document.getElementById('printOrder').innerHTML);
                                                                mywindow.document.write('</body></html>');
                                                                mywindow.document.close();
                                                                mywindow.focus();
                                                                mywindow.print();
                                                                mywindow.close();
                                                                return true;
                                                            }}

                                                        />
                                                        <Button label={t('save_order')} className='mx-1 mb-1' severity='success'
                                                            onClick={() => {
                                                                setShowSaveOrder(true);
                                                            }}
                                                        />
                                                        <Button label={t('booking')} className='mb-1' severity='info' />
                                                        {/* <Button label={t('hold')} className='mx-1 mb-1' severity='warning' /> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    }


                </div>
            }
        </div>
    );
}
export default AddServiceOrder;