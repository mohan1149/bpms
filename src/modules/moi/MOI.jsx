// import React, { useState, useEffect } from 'react';
// import { TabView, TabPanel } from 'primereact/tabview';
// import { useParams } from 'react-router-dom';
// import CustomerProfile from './CustomerProfile';
// import IMEIDetails from './IMEIDetails';
// import CallTrace from './CallTrace';
// import CellTrace from './CellTrace';
// import IpQuery from './IpQuery';

// const MOC = () => {
//     const { tab } = useParams();
//     const [activeIndex, setActiveIndex] = useState(0);
//     useEffect(() => {
//         setActiveIndex(getActiveIndex(tab));
//     }, [tab]);
//     const getActiveIndex = (tab) => {
//         switch (tab) {
//             case 'customer-profile':
//                 return 0;
//             case 'imei-details':
//                 return 1;
//             case 'call-trace':
//                 return 2;
//             case 'cell-trace':
//                 return 3
//             case "ip-query":
//                 return 4
//             default:
//                 return 0;
//         }
//     };

//     return (
//         <div className="card pt-1">
//             <TabView activeIndex={activeIndex} onTabChange={((e) => { setActiveIndex(e.index) })}>
//                 <TabPanel header="Customer Profile">
//                     <CustomerProfile />
//                 </TabPanel>
//                 <TabPanel header="IMEI Details">
//                     <IMEIDetails />
//                 </TabPanel>
//                 <TabPanel header="Call Trace">
//                     <CallTrace />
//                 </TabPanel>
//                 <TabPanel header="Cell Trace">
//                     <CellTrace />
//                 </TabPanel>
//                 <TabPanel header="IP Query">
//                     <IpQuery/>
//                 </TabPanel>
//             </TabView>
//         </div>
//     )
// }
// export default MOC;
import React from 'react';
import { Link } from 'react-router-dom';
const MOI = () => {
    return (
        <div className="pt-1">
            <div className="row moi-links">
                <div className="col-md-3 mb-4">
                    <div className='card p-3'>
                        <div className="d-flex justify-content-between align-items-center">
                            <Link to="/moi/customer-profile"><strong>Customer Profile</strong></Link>
                            <img className = "moiImg bg-red" src="/assets/img/user.png"/>
                        </div>

                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className='card p-3'>
                        <div className="d-flex justify-content-between align-items-center">
                            <Link to="/moi/imei-details"><strong>IMEI Details</strong></Link>
                            <img className = "moiImg bg-black" src="/assets/img/phone-book.png"/>
                        </div>

                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className='card p-3'>
                        <div className="d-flex justify-content-between align-items-center">
                            <Link to="/moi/call-trace"><strong>Call Trace</strong></Link>
                            <img className = "moiImg bg-green" src="/assets/img/mobile-phone.png"/>
                        </div>

                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className='card p-3'>
                        <div className="d-flex justify-content-between align-items-center">
                            <Link to="/moi/cell-trace"><strong>Cell Trace</strong></Link>
                            <img className = "moiImg bg-pink" src="/assets/img/phone.png"/>
                        </div>

                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className='card p-3'>
                        <div className="d-flex justify-content-between align-items-center">
                            <Link to="/moi/ip-query"><strong>IP Query</strong></Link>
                            <img className = "moiImg bg-blue" src="/assets/img/ip.png"/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default MOI;

