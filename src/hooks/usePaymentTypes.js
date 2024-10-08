import { useState, useEffect } from 'react';
import { getPaymentTypes } from '../apis/services';
const usePaymentTypes = (activeOnly) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getPaymentTypes(activeOnly);
                setData(response.data.data);
            } catch (err) {
                setData({
                    status:false,
                    message:'Some'
                });
            } finally {
                // setLoading(false);
            }
        };

        fetchData();
    }, [activeOnly]);

    return { data };
};

export default usePaymentTypes;
