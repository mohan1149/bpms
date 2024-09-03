import React from "react";
import { useParams } from 'react-router-dom';
import VoucherRedemption from "./VoucherRedemption";
import RedemptionReport from "./RedemptionReport"
const VoucherPages = (props) => {
    const params = useParams();
    return (
        <div className="card p-4">
            {
                params.page === "VoucherRedemption" &&
                <VoucherRedemption />
            }
            {
            params.page === "RedemptionReport" &&
            <RedemptionReport/>
            }

        </div>
    );
}

export default VoucherPages;