import React, { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { setShowSidemenu } from '../../../redux/reducer';
import { Button } from 'primereact/button';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { getFormattedCurrency } from '../../../helpers/helpers';

const AddServiceOrder = () => {
    const store = useStore();
    const [itemsPerRow, setItemsPerRow] = useState(2);
    const { t } = useTranslation();

    const services = [
        {
            id: 1,
            service_name: 'Apple Iphone',
            service_image: 'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg',
            service_price: 10,
        },
        {
            id: 2,
            service_name: 'a',
            service_image: 'https://primefaces.org/cdn/primereact/images/product/black-watch.jpg',
        },
        {
            id: 3,
            service_name: 'a',
            service_image: 'https://primefaces.org/cdn/primereact/images/product/black-watch.jpg',
        },
        {
            id: 4,
            service_name: 'a',
            service_image: 'https://primefaces.org/cdn/primereact/images/product/black-watch.jpg'
        },
        {
            id: 4,
            service_name: 'a',
            service_image: 'https://primefaces.org/cdn/primereact/images/product/black-watch.jpg'
        },
        {
            id: 4,
            service_name: 'a',
            service_image: 'https://primefaces.org/cdn/primereact/images/product/black-watch.jpg'
        },
        {
            id: 4,
            service_name: 'a',
            service_image: 'https://primefaces.org/cdn/primereact/images/product/black-watch.jpg'
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

    return (
        <div className="">
            <div className="row">
                <div className="col-md-9 m-0 p-0">
                    <div className="p-2 card m-1"
                        style={{
                            maxHeight: '85vh',
                            height: '85vh',
                            overflowY: 'scroll'
                        }}
                    >
                        <div className='mt-3 mb-3'>
                            <div className="row">
                                <div className="col-md-5">
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
                                <div className="col-md-3">
                                    <Select
                                        placeholder={t('items_per_row')}
                                        options={itemsPerRowCount}
                                        onChange={(e) => {
                                            setItemsPerRow(e.value);
                                        }}
                                    />
                                </div>
                                
                            </div>
                        </div>
                        <div className='mx-2 mt-2'>
                            <div className="row">
                                {
                                    services.map((service, index) => {
                                        return (
                                            <div className={"col-md-" + itemsPerRow + " mb-1 p-0"} key={index}>
                                                <div className="glass-card mx-1 text-center p-1">
                                                    <Button className='service-btn'>
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
                <div className="col-md-3 m-0 p-0">
                    <div className="p-2 glass-card m-1">
                        <h6 className='mt-2'><strong>{t('date')}</strong> - {new Date().toDateString()}</h6>
                        <h6 className='d-flex jcsb'>
                            <span> <strong>{t('branch')}</strong> - OHQ</span>
                            <span> <strong>{t('user')}</strong> - Mohan Velegacherla</span>
                        </h6>
                        <hr />
                        <div>
                            <h6>1.Apple Iphone 15 Pro max 16Gb Gold 23 QWERTY log text</h6>
                            <div className="d-flex align-items-center jcsb">
                                <h6>Price: 2</h6>
                                <div>
                                    <Button className='icon-sm-btn mx-1' severity="secondary">
                                        <span className="material-symbols-outlined">
                                            do_not_disturb_on
                                        </span>
                                    </Button>
                                    <Button className='icon-sm-btn mx-1' severity="secondary">
                                        <span className="material-symbols-outlined">
                                            add_circle
                                        </span>
                                    </Button>
                                    <Button className='icon-sm-btn mx-1' severity="danger">
                                        <span className="material-symbols-outlined">
                                            cancel
                                        </span>
                                    </Button>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div>
                            <h6>1.Apple Iphone 15 Pro max 16Gb Gold 23 QWERTY log text(x6)</h6>
                            <div className="d-flex align-items-center jcsb">
                                <h6>Price: 2</h6>
                                <div>
                                    <Button className='icon-sm-btn mx-1' severity="secondary">
                                        <span className="material-symbols-outlined">
                                            do_not_disturb_on
                                        </span>
                                    </Button>
                                    <Button className='icon-sm-btn mx-1' severity="secondary">
                                        <span className="material-symbols-outlined">
                                            add_circle
                                        </span>
                                    </Button>
                                    <Button className='icon-sm-btn mx-1' severity="danger">
                                        <span className="material-symbols-outlined">
                                            cancel
                                        </span>
                                    </Button>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AddServiceOrder;