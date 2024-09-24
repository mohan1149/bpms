import React, { useEffect } from 'react';
import { useStore } from 'react-redux';
import { setShowSidemenu } from '../../../redux/reducer';
const AddServiceOrder = () => {
    const store = useStore();
    useEffect(() => {
        store.dispatch(setShowSidemenu(false));
        return () => {
            store.dispatch(setShowSidemenu(true));
        };
    }, []);
    return (
        <div className="card">
            <h2>sw</h2>
        </div>
    );
}
export default AddServiceOrder;