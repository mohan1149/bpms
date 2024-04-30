import React from "react";
import Select from 'react-select';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from "react";
import { getCallTrace } from '../../apis/services';
import { FilterMatchMode } from 'primereact/api';
import * as XLSX from 'xlsx';
import { Calendar } from 'primereact/calendar';

const CallTrace = (props) => {
    const lineTypes = [
        { value: 'VOICE', label: 'Voice/SMS' },
        { value: 'DATA', label: 'Data' }
    ];
    const [lineType, setLineType] = useState();
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [msisdn, setMsisdn] = useState('');
    const [callTrace, setCallTrace] = useState([]);
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

    const handleSearchCallTrace = async () => {
        try {
            const fDate = new Date(fromDate);
            const tDate = new Date(toDate);
            let data = {
                msisdn: msisdn,
                fromDate: getFromattedDateTime(fDate),
                toDate: getFromattedDateTime(tDate),
                // fromDate: fDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replaceAll('/','-'),
                // toDate: tDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replaceAll('/','-'),
                lineType: lineType.value,
            }
            const res = await getCallTrace(data);
            setCallTrace(res.data.businessResponse);
        } catch (error) {
            console.log(error);
        }
    }
    const exportData = () => {
        let formattedResults = callTrace.map((item) => {
            return {
                'Date': item.date,
                'Time': item.time,
                'A-Number': item.anumber,
                'B-Number': item.bnumber,
                'Third Party': item.thirdParty,
                'Charge Type': item.chargeType,
                'Service Type': item.serviceType,
                'Duration': item.duration,
                'Duration Unit': item.durationUnit,
                'Device IMEI': item.deviceImei,
                'Device Brand': item.deviceBrand,
                'Device Model': item.deviceModel,
                'User IP': item.userIp,
                'Cell Address': item.cellAddress,
                'Cell ID': item.cellId,
                'Location':item.cellId,
                'Cell Name A-Number': item.cellNameANumber,
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
        a.download = 'CDR-Dashboard-Call-Trace-' + new Date().toDateString() + '.xlsx';
        a.click();
        URL.revokeObjectURL(url);
    }
    return (
        <div>
            <h3><strong>Call Trace</strong></h3>
            <form action="" method="post"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearchCallTrace();
                }}
            >
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <label htmlFor="msisdn" className="mb-2 required">MSISDN</label>
                            <input type="number" id="msisdn" required className="form-control" value={msisdn} onChange={(e) => { setMsisdn(e.target.value) }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="from_date" className='mb-2 required'>From Date</label>
                            <Calendar value={fromDate} onChange={(e) => setFromDate(e.value)} className='pr-input' maxDate={new Date()} dateFormat="dd/mm/yy" />
                        </div>
                        <div className="form-group d-flex mt-3">
                            <input type="submit" value="Search" className="btn btn-round bg-red text-bold" />
                            <input type="reset" value="Reset" className="btn btn-round bg-black text-white text-bold mx-2" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <label htmlFor="lineType" className="required mb-2">Line Type</label>
                            <Select options={lineTypes} id="lineType"
                                onChange={(e) => {
                                    setLineType(e);
                                }}
                                value={lineType}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="to_date" className='mb-2 required'>To Date</label>
                            <Calendar value={toDate} onChange={(e) => setToDate(e.value)} className='pr-input' maxDate={new Date()} dateFormat="dd/mm/yy" />
                        </div>
                    </div>
                </div>
            </form>
            <h2 className="mt-4 mb-2" ><strong>Call Trace</strong></h2>
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
                        value={callTrace}
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
                            header="A-Number"
                            sortable
                            style={{ minWidth: '8rem' }}
                        />
                        <Column
                            field="bnumber"
                            header="B-Number"
                            sortable
                            style={{ minWidth: '8rem' }}
                        />
                        <Column
                            field="thirdParty"
                            header="Third Party"
                            sortable
                            style={{ minWidth: '8rem' }}
                        />
                        <Column
                            field="chargeType"
                            header="Charge Type"
                            sortable
                            style={{ minWidth: '8rem' }}
                        />
                        <Column
                            field="serviceType"
                            header="Service Type/Traffic"
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
                            style={{ minWidth: '8rem' }}
                        />
                        <Column
                            field="deviceImei"
                            header="Device IMEI"
                            sortable
                            style={{ minWidth: '8rem' }}
                        />
                        <Column
                            field="deviceBrand"
                            header="Device Brand"
                            sortable
                            style={{ minWidth: '8rem' }}
                        />
                        <Column
                            field="deviceModel"
                            header="Device Model"
                            sortable
                            style={{ minWidth: '8rem' }}
                        />
                        <Column
                            field="userIp"
                            header="User IP"
                            sortable
                            style={{ minWidth: '8rem' }}
                        />
                        <Column
                            field="cellAddress"
                            header="Cell Address"
                            sortable
                            style={{ minWidth: '8rem' }}
                        />
                        <Column
                            field="cellId"
                            header="Cell ID"
                            sortable
                            style={{ minWidth: '8rem' }}
                        />
                          <Column
                            field="cellId"
                            header="Location"
                            sortable
                            style={{ minWidth: '8rem' }}
                        />
                        <Column
                            field="cellNameANumber"
                            header="Cell Name A-Number"
                            sortable
                            style={{ minWidth: '8rem' }}
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );

}
export default CallTrace;