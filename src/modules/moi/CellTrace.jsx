import React from "react";
import Select from 'react-select';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from "react";
import { getCellTrace } from './../../apis/services';
import { getCellTracrByFile } from "./../../apis/services";
import { FilterMatchMode } from 'primereact/api';
import * as XLSX from 'xlsx';
import { Calendar } from 'primereact/calendar';
import moment from "moment/moment";
const CellTrace = (props) => {
    const searchTypes = [
        { value: 'text', label: 'Single Location' },
        { value: 'csvFile', label: 'Multiple Locations' }
    ]
    const [searchType, setSearchType] = useState({ value: 'text', label: 'Single Location' });
    const [cellId, setCellId] = useState();
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [cellTrace, setCellTrace] = useState([]);
    const [csvFile, setCsvFile] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    function pad(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }
    const getFromattedDateTime = (date) => {
        let currentDate = date;
        var year = currentDate.getFullYear();
        var month = pad(currentDate.getMonth() + 1); // Months are zero-based
        var day = pad(currentDate.getDate());
        var hours = pad(currentDate.getHours());
        var minutes = pad(currentDate.getMinutes());
        var seconds = pad(currentDate.getSeconds());
        var milliseconds = pad(currentDate.getMilliseconds());
        var formattedDateTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
        return formattedDateTime;
    }

    const handleSearchcellTrace = async () => {
        try {
            const fDate = new Date(fromDate);
            const tDate = new Date(toDate);
            if (searchType.value === 'text') {
                let data = {
                    fromDate: getFromattedDateTime(fDate),
                    toDate: getFromattedDateTime(tDate),
                    cellId: cellId,
                };
                const res = await getCellTrace(data);
                setCellTrace(res.data.businessResponse);

            }
            else if (searchType.value === 'csvFile') {
                let formData = new FormData();
                formData.append('fromDate', getFromattedDateTime(fDate));
                formData.append('toDate', getFromattedDateTime(tDate));
                formData.append('file', csvFile);
                const res = await getCellTracrByFile(formData);
                setCellTrace(res.data.businessResponse)
            }

        } catch (error) {
            console.log("Error:", error);
        }
    };

    const exportData = () => {
        let formattedResults = cellTrace.map((item) => {
            return {
                'Date': item.date,
                'Time': item.time,
                'MSISDN Under Site': item.anumber, //ask what's its name
                'Other Party Number': item.bnumber, //ask what's its name
                'Charge Type': item.chargeType,
                'Service Type': item.serviceType,
                'Duration': item.duration,
                'Duration Unit': item.durationUnit,
                'Cell Address': item.cellAddress,
            }
        });
        const worksheet = XLSX.utils.json_to_sheet(formattedResults);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const binaryData = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
        const blob = new Blob([s2ab(binaryData)], { type: 'application/octet-stream' });
        function s2ab(s) {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i < s.length; i++) {
                view[i] = s.charCodeAt(i) & 0xFF;
            }
            return buf;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'CDR-Dashboard-Cell-Trace-' + new Date().toDateString() + '.xlsx';
        a.click();
        URL.revokeObjectURL(url);
    }
    return (
        <div>
            <h3><strong>Cell Trace</strong></h3>
            <form action="" method="post"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearchcellTrace();
                }}
            >
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <label htmlFor="searchType" className="mb-2">Search Location By</label>
                            <Select options={searchTypes} id="searchType"
                                onChange={(e) => {
                                    setSearchType(e);
                                }}
                                value={searchType}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        {searchType.value === "text" ? (
                            <div className="form-group my-2">
                                <label htmlFor="searchValue" className="mb-2 required">Enter Location </label>
                                <input type="text" id="searchValue" className="form-control" value={cellId} required onChange={(e) => { setCellId(e.target.value) }} />
                            </div>
                        ) : (searchType.value === "csvFile" ? (
                            <div className="form-group my-2">
                                <label htmlFor="searchValue" className="mb-2 required">Upload CSV containing Locations</label>
                                <input type="file" id="searchValue" className="form-control" required accept=".csv"
                                    onChange={(e) => {
                                        setCsvFile(e.target.files[0]);
                                    }}
                                />
                            </div>
                        ) : null)}
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="from_date" className='mb-2 required'>From Date</label>
                            <Calendar value={fromDate} onChange={(e) => setFromDate(e.value)} dateFormat="dd/mm/yy" className='pr-input' maxDate={new Date()} />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="to_date" className='mb-2 required'>To Date</label>
                            <Calendar value={toDate} onChange={(e) => setToDate(e.value)} dateFormat="dd/mm/yy" className='pr-input' maxDate={new Date()} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group d-flex mt-3">
                            <input type="submit" value="Search" className="btn btn-round bg-red text-bold" />
                            <input type="reset" value="Reset" className="btn btn-round bg-black text-white text-bold mx-2" />
                        </div>
                    </div>
                </div>

            </form>

            <h2 className="mt-4 mb-2" ><strong>Cell Trace</strong></h2>
            <div className="row">
                <div className="col-12">
                    <DataTable
                        header={
                            <div className='row'>
                                <div className="col-md-6">
                                    <input className='form-control'
                                        placeholder='Search..'
                                        onChange={(e) => {
                                            let _filters = { ...filters };
                                            _filters['global'].value = e.target.value;
                                            setFilters(_filters);
                                        }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <button className="btn bg-red btn-round text-white text-bold"
                                        onClick={() => {
                                            exportData();
                                        }}
                                    >Export</button>
                                </div>
                            </div>
                        }
                        value={cellTrace}
                        paginator
                        rows={10}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        rowsPerPageOptions={[10, 25, 50]}
                        dataKey="id"
                        selectionMode="checkbox"
                        filters={filters}
                        filterDisplay="menu"
                        emptyMessage="No data available."
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    >
                        <Column
                            field="date"
                            header="Date"
                            sortable
                            style={{ minWidth: '4rem' }}
                        />
                        <Column
                            field="time"
                            header="Time"
                            sortable
                            style={{ minWidth: '4rem' }}
                        />
                        <Column
                            field="anumber"
                            header="MSISDN Under Site"
                            sortable
                            style={{ minWidth: '14rem' }}
                        />
                        <Column
                            field="bnumber"
                            header="Other Party Number"
                            sortable
                            style={{ minWidth: '14rem' }}
                        />
                        <Column
                            field="chargeType"
                            header="Charge Type"
                            sortable
                            style={{ minWidth: '8rem' }}
                        />
                        <Column
                            field="serviceType"
                            header="Service Type"
                            sortable
                            style={{ minWidth: '8rem' }}
                        />
                        <Column
                            field="duration"
                            header="Duration"
                            sortable
                            style={{ minWidth: '8rem' }}
                        />
                        <Column
                            field="durationUnit"
                            header="Duration Unit"
                            sortable
                            style={{ minWidth: '14rem' }}
                        />
                        <Column
                            field="cellAddress"
                            header="Cell Address"
                            sortable
                            style={{ minWidth: '10rem' }}
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );

}
export default CellTrace;