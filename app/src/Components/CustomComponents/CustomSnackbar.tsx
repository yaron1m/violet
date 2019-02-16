import React from "react";
import Snackbar from '@material-ui/core/Snackbar';

export default function CustomSnackbar(props: CustomSnackbarProps) {
    return (
        <Snackbar
            open={props.open}
            message={props.message}
            autoHideDuration={4000}
            onClose={props.onRequestClose}
        />
    );
}

interface CustomSnackbarProps {
    open: boolean;
    message: string;
    onRequestClose: () => void;
}