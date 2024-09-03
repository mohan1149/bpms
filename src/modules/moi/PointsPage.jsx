import React from "react";
import { useParams } from 'react-router-dom';
import EarnPoints from "./EarnPoint";
import TransactionReport from "./TransactionReport";
const PointsPages = (props) => {
    const params = useParams();
    return (
        <div className="card p-4">
            {
                params.page === "earn-points" &&
                <EarnPoints />
            }
            {
                params.page === "transaction-report" &&
                <TransactionReport />
            }
        </div>
    );
}

export default PointsPages;