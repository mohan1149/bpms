import { useState } from "react";
import { getPaymentTypes } from "../apis/services";
const usePaymentTypes = async (activeOnly) =>{
    const [data,setData] = useState([]);
    const res = await getPaymentTypes(activeOnly);  
    setData(res.data.data);
    return data;
}

export default usePaymentTypes;