import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Button } from '@mui/material';
const TableHeader = (props) => {
    const [dateRange, setDateRange] = useState();
    const [query,setQuery] = useState();
    return (
        <div className="row align-items-center">
            <div className="col-md-3 mt-2">
                <input type="text" className="form-control search_order_input"
                    onChange={(e) => {
                        setQuery(e.target.value);
                        props.applySearch(e.target.value);
                    }}
                    placeholder="Search here..."
                    value={props.value}
                />
            </div>
            {/* <div className="col-md-4">
                <Calendar
                    value={dateRange}
                    onChange={(e) => setDateRange(e.value)}
                    selectionMode="range"
                    readOnlyInput
                    placeholder="Date Range"
                />
                <Button className="btn-round bg-red text-white text-bold mx-3 px-4 py-2">Apply</Button>
            </div> */}
            <div className="col-md-3 mt-2">
                <Button
                    onClick={() => {
                        props.refreshTable();
                    }}
                    className="btn-round bg-red text-white text-bold mx-3 px-4 py-2 float-right"
                >Refresh</Button>
            </div>
        </div>
    );
}

export default TableHeader;