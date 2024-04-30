import React from "react";
import { useParams } from 'react-router-dom';
import CustomerProfile from './CustomerProfile';
import IMEIDetails from './IMEIDetails';
import IpQuery from './IpQuery';
import CallTrace from './CallTrace';
import CellTrace from './CellTrace';
const MOIPages = (props) => {
    const params = useParams();
    return (
        <div className="card p-4">
            {
                params.page === "customer-profile" &&
                <CustomerProfile />
            }
            {
                params.page === "imei-details" &&
                <IMEIDetails />
            }
            {
                params.page === "call-trace" &&
                <CallTrace />
            }
            {
                params.page === "cell-trace" &&
                <CellTrace />
            }
            {
                params.page === "ip-query" &&
                <IpQuery />
            }
        </div>
    );
}

export default MOIPages;