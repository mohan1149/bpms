import React from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DraftsIcon from '@mui/icons-material/Drafts';
const OrderStatus = (props) => {
    const renderIcon = () => {
        switch (props.status.status) {
            case 'Draft':
                return (
                    <DraftsIcon />
                );
            case 'In Progress':
                return (
                    <AutorenewIcon />
                );
        }

    }
    return (
        <div>
            <span className="mx-2"
                style={{
                    fontWeight: "bold",
                    fontSize: 18
                }}
            >{props.status.status}</span>
            {renderIcon()}
        </div>
    );
}

export default OrderStatus;