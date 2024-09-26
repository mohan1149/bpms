import React, { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { setShowSidemenu } from '../../../redux/reducer';
import { Button } from 'primereact/button';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { getFormattedCurrency } from '../../../helpers/helpers';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { InputSwitch } from 'primereact/inputswitch';
import { InputNumber } from 'primereact/inputnumber';
const AddServiceOrder = () => {
    const store = useStore();
    const { t } = useTranslation();
    const [itemsPerRow, setItemsPerRow] = useState({ label: t('items_per_row'), value: 2 });
    const [showSettings, setShowSettings] = useState(false);
    const [render, setRender] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const services = [
        {
            id: 1,
            service_name: 'Apple Iphone',
            service_image: 'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg',
            service_price: 10.456,
        },
        {
            id: 2,
            service_name: 'a wsw',
            service_image: 'https://primefaces.org/cdn/primereact/images/product/black-watch.jpg',
            service_price: 10,
        },
        {
            id: 3,
            service_name: 'a dw',
            service_image: 'https://primefaces.org/cdn/primereact/images/product/black-watch.jpg',
            service_price: 10,
        },
        {
            id: 4,
            service_name: 'a swdwdewd ',
            service_image: 'https://primefaces.org/cdn/primereact/images/product/black-watch.jpg',
            service_price: 10,
        },
        {
            id: 5,
            service_name: 'a qwert',
            service_image: 'https://primefaces.org/cdn/primereact/images/product/black-watch.jpg',
            service_price: 10,
        },
        {
            id: 6,
            service_name: 'a oiuyt',
            service_image: 'https://primefaces.org/cdn/primereact/images/product/black-watch.jpg',
            service_price: 10,
        },
        {
            id: 7,
            service_name: 'a sdwefrgthyju ertyu qwert uytr qwertyuio werty ertyu',
            service_image: 'https://primefaces.org/cdn/primereact/images/product/black-watch.jpg',
            service_price: 10,
        },


    ];
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
    useEffect(() => {
        store.dispatch(setShowSidemenu(false));
        return () => {
            store.dispatch(setShowSidemenu(true));
        };
    }, []);
    const addItemToCart = (item) => {
        let existingCart = cartItems;
        let index = existingCart.findIndex((i) => i.id === item.id);
        if (index === -1) {
            existingCart.push(item);
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
    return (
        <div className="">
            <Offcanvas show={showSettings}
                placement="end"
                className="p-2"
            >
                <Offcanvas.Header>
                    <Offcanvas.Title>{t('terminal_settings')}</Offcanvas.Title>
                </Offcanvas.Header>
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
                        <div className="col-12 mt-4">
                            <div className="d-flex jcsb align-items-center">
                                <h6><strong>Show Modifiers</strong></h6>
                                <InputSwitch />
                            </div>
                        </div>
                        <div className="col-12 mt-4">
                            <div className="d-flex jcsb align-items-center">
                                <h6><strong>Show Variations</strong></h6>
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
                                    <input type="text" name="" id="" className='form-control search-input' placeholder={t('search_here')} />
                                </div>
                                <div className="col-md-4">
                                    <Select
                                        placeholder={t('customer')}
                                        options={[]}
                                        onChange={(e) => {
                                            //setItemsPerRow(e.value);
                                        }}
                                    />
                                </div>

                                <div className="col-8 mt-2">
                                    <Select options={[]}
                                        isMulti={true}
                                        isClearable={true}
                                        placeholder={t('filter_by_category')}
                                    />
                                </div>
                                <div className="col-4 mt-2">
                                    <Select options={[]}
                                        isClearable={true}
                                        placeholder={t('filter_by_variation')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='mx-2 mt-2'>
                            <div className="row">
                                {
                                    services.map((service, index) => {
                                        return (
                                            <div className={"col-md-" + itemsPerRow.value + " mb-1 p-0"} key={index}>
                                                <div className="glass-card mx-1 text-center p-1">
                                                    <Button className='service-btn'
                                                        onClick={() => {
                                                            addItemToCart(service);
                                                        }}
                                                    >
                                                        <div>
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
                                                                <strong>{getFormattedCurrency(service.service_price)}</strong>
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
                <div className="col-md-4 m-0 p-0">
                    <div className="p-2 glass-card m-1">
                        <h6 className='d-flex jcsb'>
                            <span> <strong>{t('Date')}</strong> - {new Date().toDateString()}</span>
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

                        <h6 className='d-flex jcsb'>
                            <span> <strong>{t('branch')}</strong> - OHQ</span>
                            <span> <strong>{t('user')}</strong> - Mohan Velegacherla</span>
                        </h6>
                        <hr />
                        <div
                            style={{
                                maxHeight: '85vh',
                                height: '45vh',
                                overflowY: 'scroll'
                            }}
                        >
                            <table className='table'

                            >
                                <thead>
                                    <tr>
                                        <th>itm</th>
                                        <th className='text-center'>qun</th>
                                        <th className='text-center'>price</th>
                                        <th className='text-center'>ac</th>
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
                                                    >{i.service_name}</td>
                                                    <td
                                                        style={{
                                                            maxWidth: '5rem',
                                                            paddingTop: 3,
                                                            paddingBottom: 3,
                                                        }}
                                                    >
                                                        <div className="d-flex align-items-center jcc">
                                                            <Button className='icon-xs-btn mx-1' severity="secondary" outlined>
                                                                <span className="material-symbols-outlined">
                                                                    do_not_disturb_on
                                                                </span>
                                                            </Button>
                                                            <span className='mx-1'>{index}</span>
                                                            <Button className='icon-xs-btn' severity="secondary" outlined>
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
                                                        <InputNumber
                                                            useGrouping={false}
                                                            maxFractionDigits={3}
                                                            value={getFormattedCurrency(i.service_price, 1)}
                                                            className='xs-input'
                                                        />
                                                    </td>
                                                    <td className='text-center'>
                                                        <div className="d-flex align-items-center jcc">
                                                            {/* <Button className='icon-xs-btn mx-1' severity="secondary" outlined>
                                                                <span className="material-symbols-outlined">
                                                                    do_not_disturb_on
                                                                </span>
                                                            </Button> */}

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
                                    <h5>{t('total')} : {getFormattedCurrency(cartItems.reduce((a, b) => a + b.service_price, 0), 1)}</h5>
                                    <h5 className='opacity'>{t('discount')} : {getFormattedCurrency(0, 1)}</h5>
                                </div>
                                <h5>{t('grand_total')} : {getFormattedCurrency(cartItems.reduce((a, b) => a + b.service_price, 0))}</h5>
                            </div>
                            <div className='mt-4 d-flex jcc'>
                                <Button label={t('confrim')} className='mb-1' />
                                <Button label={t('hold')} className='mx-1 mb-1' severity='warning' />
                                <Button label={t('discount')} className='mb-1' severity='info' />
                                <Button label={t('paid')} className='mx-1 mb-1' severity='success' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AddServiceOrder;