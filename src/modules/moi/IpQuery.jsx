import React, { useState } from 'react';
import { ipQuerySendFile, ipQuerygetStatus, ipQueryDownloadFile } from '../../apis/services';
import { ProgressBar } from 'react-bootstrap';
function IpQuery() {
    const [completionPercentage, setCompletionPercentage] = useState(5);
    const [csvFile, setCsvFile] = useState();
    const [showProgressBar, setShowProgressBar] = useState(false);
    const [output, setOutputCode] = useState('');
    const [outputFile, setOutputFile] = useState()
    const [hasFormErrors, setHasFormErrors] = useState(true);
    const handleFileUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', csvFile);
            const response = await ipQuerySendFile(formData);
            setShowProgressBar(true);
            if (response?.data?.businessResponse !== undefined) {
                const responseString = response.data.businessResponse;
                setOutputFile(responseString)
                const responseWithoutPrefix = responseString.replace('output_', '');
                const responseCode = responseWithoutPrefix.replace('.csv', '')
                setOutputCode(responseCode);
                getStatus(responseCode);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getStatus = (code) => {
        const timer = setInterval(async () => {
            const response = await ipQuerygetStatus({ fileCode: code });
            const completionPercentageString = response.data.businessResponse;
            if (completionPercentageString == "Processing complete") {
                setCompletionPercentage(100);
                clearInterval(timer);
            } else {
                const matches = completionPercentageString.match(/\d+/);
                if (matches && matches.length > 0) {
                    const percentage = parseInt(matches[0], 10);
                    if (percentage < 100) {
                        setCompletionPercentage(percentage);
                    } else {
                        setCompletionPercentage(100);
                        clearInterval(timer);
                    }
                }
            }
        }, 10000);
    };
    const handleDownload = async () => {
        try {
            const response = await ipQueryDownloadFile(outputFile);
            const fileData = response.data;
            const blob = new Blob([fileData], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'CDR-Portal-IPQuery-Results' + new Date().toLocaleString() + '.csv');
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <h3><strong>IP Query</strong></h3>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleFileUpload();
            }}>
                <input
                    type="file"
                    id="searchValue"
                    className="form-control"
                    accept=".csv"
                    onChange={(e) => {
                        if (e.target.files[0].type === 'text/csv') {
                            setCsvFile(e.target.files[0]);
                            setHasFormErrors(false);
                        } else {
                            setHasFormErrors(true);
                        }
                    }}
                />
                {
                    showProgressBar &&
                    <div>
                        <ProgressBar
                            now={completionPercentage}
                            label={`${completionPercentage} %`}
                            animated
                        />
                    </div>
                }
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group d-flex mt-3">
                            <input
                                disabled={hasFormErrors}
                                type="submit"
                                value="Search"
                                className="btn btn-round bg-red text-bold"
                            />
                            <input
                                type="reset"
                                value="Reset"
                                className="btn btn-round bg-black text-white text-bold mx-2"
                                onClick={() => {
                                    setCsvFile(null);
                                    setCompletionPercentage(5);
                                    setHasFormErrors(true);
                                    setOutputFile();
                                    setShowProgressBar(false);
                                }}
                            />
                            <button
                                type="button"
                                className="btn btn-round bg-green text-bold mx-2"
                                onClick={handleDownload}
                                disabled={outputFile === undefined ? true : false}
                            >
                                Download File
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default IpQuery;
