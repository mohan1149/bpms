import React from 'react';
import { CircularProgress } from '@mui/material';
const ButtonLoadingIndicator = (props) => {
    return (
        <CircularProgress size={props.size} thickness={props.thickness} color={props.color} />
    );
}
export default ButtonLoadingIndicator;