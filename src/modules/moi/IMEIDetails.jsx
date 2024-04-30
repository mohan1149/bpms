import React, { useState } from "react";
import Select from 'react-select';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getCustomerProfileByIMEI, getCustomerProfileByIMEIFile } from "../../apis/services";
import { FilterMatchMode } from 'primereact/api';
import * as XLSX from 'xlsx';
const IMEIDetails = (props) => {
    const searchTypes = [
        { value: 'MSISDN', label: 'MSISDN' },
        { value: 'IMEI', label: 'IMEI' }
    ]
    const [IMEI, setIMEI] = useState('');
    const [searchType, setSearchType] = useState();
    const [imeiDetails, setImeiDetails] = useState([]);
    const [csvFile, setCsvFile] = useState();
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const handleimeiDetailsearch = () => {
        if (csvFile === undefined && IMEI !== '') {
            handleProfileSearchByIMEI();
        } else if (csvFile !== undefined) {
            handleimeiDetailsearchByFile();
        }
    }
    const handleProfileSearchByIMEI = async () => {
        try {
            const res = await getCustomerProfileByIMEI(IMEI)
            if (res.data.businessResponse !== null) {
                setImeiDetails(res.data.businessResponse)
            }
        } catch (error) {
        }
    }
    const handleimeiDetailsearchByFile = async () => {
        try {
            const formData = new FormData();
            formData.append('file', csvFile);
            formData.append('type', searchType.value);
            const res = await getCustomerProfileByIMEIFile(formData);
            setImeiDetails(res.data.businessResponse);
        } catch (error) {
        }
    }
    const exportData = () => {
        let formattedResults = imeiDetails.map((item) => {
            return {
                'MSISDN': item.msisdn,
                'Contract Number': item.contractNumber,
                'IMEI': item.anumberImei,
                'Device Brand': item.deviceBrand,
                'Device Model': item.deviceModel,
                'Activation Date Of Device': item.activationDateOfDevice,
                'Deactivation Date Of Device': item.deactivationDateOfDevice,
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
        a.download = 'CDR-Dashboard-IMEI-Details-' + new Date().toDateString() + '.xlsx';
        a.click();
        URL.revokeObjectURL(url);
    }
    return (
        <div>
            <h3><strong>IMEI Details</strong></h3>
            <form action="" method="post" onSubmit={(e) => {
                e.preventDefault();
                handleimeiDetailsearch();
            }}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <label htmlFor="searchType" className="mb-2">Search Type</label>
                            <Select options={searchTypes} id="searchType"
                                onChange={(e) => {
                                    setSearchType(e);
                                }}
                            />
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="searchValue" className="mb-2">Mobile Number / IMEI</label>
                            <input type="text" id="searchValue" className="form-control" value={IMEI} onChange={(e) => { setIMEI(e.target.value) }} />
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="searchValue" className="mb-2">Upload CSV having MSISDNs or IMEIs</label>
                            <input type="file" id="searchValue" className="form-control" accept=".csv"
                                onChange={(e) => {
                                    setCsvFile(e.target.files[0]);
                                }}
                            />
                        </div>
                        <div className="form-group d-flex mt-3">
                            <input type="submit" value="Search" className="btn btn-round bg-red text-bold" />
                            <input type="reset" value="Reset" className="btn btn-round bg-black text-white text-bold mx-2" onClick={() => {
                                setCsvFile();
                                setIMEI('');
                            }} />
                        </div>
                    </div>
                </div>
                <h2 className="mt-4 mb-2" ><strong>Customer History</strong></h2>
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
                            value={imeiDetails}
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
                                field="msisdn"
                                header="MSISDN"
                                sortable
                                style={{ minWidth: '4rem' }}
                            />
                            <Column
                                field="contractNumber"
                                header="Contract Number"
                                sortable
                                style={{ minWidth: '14rem' }}
                            />
                            <Column
                                field="anumberImei"
                                header="IMEI"
                                sortable
                                style={{ minWidth: '14rem' }}
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
                                field="activationDateOfDevice"
                                header="Activation Date Of Device"
                                sortable
                                style={{ minWidth: '8rem' }}
                            />
                            <Column
                                field="deactivationDateOfDevice"
                                header="Deactivation Date Of Device"
                                sortable
                                style={{ minWidth: '14rem' }}
                            />
                        </DataTable>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default IMEIDetails;