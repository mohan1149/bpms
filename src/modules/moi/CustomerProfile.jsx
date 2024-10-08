import React, { useState } from "react";
import Select from 'react-select';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getCustomerProfileById, getCustomerProfileByCSVFile } from '../../apis/services';
import { FilterMatchMode } from 'primereact/api';
import * as XLSX from 'xlsx';
import { InputNumber } from 'primereact/inputnumber';
import { Tooltip } from 'primereact/tooltip';
const CustomerProfile = (props) => {
    const searchTypes = [
        { value: 'MSISDN', label: 'MSISDN' },
        { value: 'CIVIL', label: 'Civil ID' }
    ];
    const [searchType, setSearchType] = useState();
    const [hasFormErrors, setHasFormErrors] = useState(true);
    const [customerID, setCustomerID] = useState('12345678');
    const [customerProfiles, setCustomerProfiles] = useState([]);
    const [csvFile, setCsvFile] = useState();
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const handleCustomerProfileSearch = () => {
        if (csvFile === undefined && customerID !== '') {
            handleCustomerProfileSearchById();
        } else if (csvFile !== undefined) {
            handleCustomerProfileSearchByFile();
        }
    }
    const handleCustomerProfileSearchById = async () => {
        try {
            const res = await getCustomerProfileById(customerID);
            setCustomerProfiles(res.data.businessResponse);
        } catch (error) {
            setCustomerProfiles([]);
        }
    }
    const handleCustomerProfileSearchByFile = async () => {
        if (searchType !== undefined) {
            try {
                const formData = new FormData();
                formData.append('file', csvFile);
                formData.append('type', searchType.value)
                const res = await getCustomerProfileByCSVFile(formData);
                setCustomerProfiles(res.data.businessResponse);
            } catch (error) {
                setCustomerProfiles([]);
            }
        }
    }
    const exportData = () => {
        let formattedResults = customerProfiles.map((item) => {
            return {
                'MSIDN': item.msisdn,
                'Arabic Name': item.arabicName,
                'English Name': item.englishName,
                'ID': item.idNumber,
                'Nationality': item.nationality,
                'Address': item.address,
                'Activation Date': item.activationDate,
                'Deactivation Date': item.deactivationDate,
                'PrePost Type': item.prepostType,
                'Sub Type': item.subType,
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
        a.download = 'CDR-Dashboard-Customer-Profile-' + new Date().toDateString() + '.xlsx';
        a.click();
        URL.revokeObjectURL(url);
    }
    return (
        <div>
            <h3><strong>Customer Profile</strong></h3>
            <form action="" method="post"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCustomerProfileSearch();
                }}
            >
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <label htmlFor="searchValue" className="mb-2">Civil ID / Mobile Number </label>
                            {/* <input type="number" id="searchValue" className="form-control"  onChange={(e) => { (e.target.value) }} /> */}
                            <InputNumber
                                tooltip="Please Enter 12 digit Civil ID or Mobile Number with or with out 965"
                                placeholder="Enter 12 digit Civil ID or Mobile Number with or with out 965"
                                maxLength={12}
                                useGrouping={false}
                                invalid={!/^(?:\d{8}|\d{11}|\d{12})$/.test(customerID)}
                                className='pr-input'
                                onChange={(e) => {
                                    setCustomerID(e.value);
                                    if (!/^(?:\d{8}|\d{11}|\d{12})$/.test(e.value)) {
                                        setHasFormErrors(true);
                                    } else {
                                        setHasFormErrors(false);
                                    }
                                }}
                                value={customerID}
                            />
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="searchType" className="mb-2">Search Type</label>
                            <Select options={searchTypes} id="searchType"
                                onChange={(e) => {
                                    setSearchType(e);
                                }}
                                value={searchType}
                            />
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="csvFile" className="mb-2">Upload CSV having MSISDNs or Civil IDs</label>
                            <Tooltip target=".csvFile">Please choose a CSV file containing MSISDNs or Civil IDs. Only (.csv) file is supported.</Tooltip>
                            <input type="file" id="csvFile" className="form-control csvFile" accept=".csv"
                                onChange={(e) => {
                                    if (e.target.files[0].type === 'text/csv') {
                                        setCsvFile(e.target.files[0]);
                                        setHasFormErrors(false);
                                    } else {
                                        setHasFormErrors(true);
                                    }
                                }}
                            />
                        </div>
                        <div className="form-group d-flex mt-3">
                            <input type="submit" value="Search" className="btn btn-round bg-red text-bold"
                                disabled={hasFormErrors}
                            />
                            <input type="reset" value="Reset" className="btn btn-round bg-black text-white text-bold mx-2"
                                onClick={() => {
                                    setCsvFile();
                                    setCustomerID('');
                                    setSearchType();
                                    setHasFormErrors(true);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </form>
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
                        value={customerProfiles}
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
                            field="arabicName"
                            header="Arabic Name"
                            sortable
                            style={{ minWidth: '14rem' }}
                        />
                        <Column
                            field="englishName"
                            header="English Name"
                            sortable
                            style={{ minWidth: '14rem' }}
                        />
                        <Column
                            field="idNumber"
                            header="ID"
                            sortable
                            style={{ minWidth: '4rem' }}
                        />
                        <Column
                            field="nationality"
                            header="Nationality"
                            sortable
                            style={{ minWidth: '8rem' }}
                        />
                        <Column
                            field="address"
                            header="Address"
                            sortable
                            style={{ minWidth: '8rem' }}
                        />
                        <Column
                            field="activationDate"
                            header="Activation Date"
                            sortable
                            style={{ minWidth: '8rem' }}
                            body={(row) => { return new Date(row.activationDate).toDateString() }}
                        />
                        <Column
                            field="deactivationDate"
                            header="Deactivation Date"
                            sortable
                            style={{ minWidth: '14rem' }}
                            body={(row) => {
                                if (row.deactivationDate !== null) {
                                    return new Date(row.deactivationDate).toDateString();
                                } else {
                                    return '';
                                }
                            }}
                        />
                        <Column
                            field="prepostType"
                            header="PrePost Type"
                            sortable
                            style={{ minWidth: '10rem' }}
                        />
                        <Column
                            field="subType"
                            header="Sub Type"
                            sortable
                            style={{ minWidth: '8rem' }}
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}
export default CustomerProfile;