import React from "react";
import Select from 'react-select';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from "react";
import { getCallTrace } from '../../apis/services';
import { FilterMatchMode } from 'primereact/api';
import * as XLSX from 'xlsx';
import { Calendar } from 'primereact/calendar';
import store from "../../redux/store";
import { InputNumber } from 'primereact/inputnumber';
const CallTrace = (props) => {
    const lineTypes = [
        { value: 'VOICE', label: 'Voice/SMS' },
        { value: 'DATA', label: 'Data' }
    ];
    const [lineType, setLineType] = useState({ value: 'VOICE', label: 'Voice/SMS' });
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [msisdn, setMsisdn] = useState('12345678');
    const [remarks, setRemarks] = useState();
    const [callTrace, setCallTrace] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [hasFormErrors, setHasFormErrors] = useState(true);
    function pad(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }
    const getFromattedDateTime = (date) => {
        let currentDate = date;
        var year = currentDate.getFullYear();
        var month = pad(currentDate.getMonth() + 1);
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
                remarks: remarks,
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
                'Location': item.cellId,
                'Cell Name A-Number': item.cellNameANumber,
            }
        });
        const user = store.getState().app.user;
        let Heading = [['Requested By', user.username], ['Request date ', new Date().toLocaleString()], ['Remark', remarks], ['Mobile number', msisdn], ['From Date', fromDate], ['To Date', toDate]];
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet([]);
        XLSX.utils.sheet_add_aoa(ws, Heading, { origin: 'D2' });
        XLSX.utils.sheet_add_json(ws, formattedResults, { origin: 'A10', skipHeader: false });
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'CDR-Dashboard-Call-Trace-' + new Date().toDateString() + '.xlsx');
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
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <label htmlFor="msisdn" className="mb-2 required">MSISDN</label>
                            {/* <input type="number" id="msisdn" required className="form-control" value={msisdn} onChange={(e) => { setMsisdn(e.target.value) }} /> */}
                            <InputNumber
                                placeholder="Enter a Mobile Number with or with out 965"
                                maxLength={11}
                                tooltip="Please Enter a Mobile Number with or with out 965 (Only 8 or 11 digits allowed)"
                                useGrouping={false}
                                invalid={!/^(?:\d{8}|\d{11})$/.test(msisdn)}
                                className='pr-input'
                                onChange={(e) => {
                                    setMsisdn(e.value);
                                    if (!/^(?:\d{8}|\d{11})$/.test(e.value)) {
                                        setHasFormErrors(true);
                                    } else {
                                        setHasFormErrors(false);
                                    }
                                }}
                                value={msisdn}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <label htmlFor="lineType" className="required mb-2">Line Type</label>
                            <Select options={lineTypes} id="lineType"
                                onChange={(e) => {
                                    setLineType(e);
                                }}
                                value={lineType}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <label htmlFor="from_date" className='mb-2 required'>From Date</label>
                            <Calendar value={fromDate} onChange={(e) => setFromDate(e.value)} className='pr-input' maxDate={new Date()} dateFormat="dd/mm/yy" />
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <label htmlFor="to_date" className='mb-2 required'>To Date</label>
                            <Calendar value={toDate} onChange={(e) => setToDate(e.value)} className='pr-input' maxDate={new Date()} dateFormat="dd/mm/yy" />
                        </div>
                    </div>
                    <div className="col-12 mb-2 ">
                        <div className="form-group">
                            <label htmlFor="remarks" className="mb-2 required">Remarks</label>
                            <input type="text" className="form-control" required id="remarks" name="remarks"
                                value={remarks}
                                onChange={(e) => {
                                    setRemarks(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-12 mt-3 mb-3">
                        <div className="form-group d-flex mt-3">
                            <input type="submit" value="Search" className="btn btn-round bg-red text-bold"  
                                disabled={hasFormErrors}
                            />
                            <input type="reset" value="Reset" className="btn btn-round bg-black text-white text-bold mx-2" />
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