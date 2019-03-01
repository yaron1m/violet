import React from "react";
import {CustomFlatButton} from "./CustomButtons";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function CustomDialog(props: CustomDialogProps) {
    const actions = [
        <CustomFlatButton
            key="ok"
            label="אישור"
            onClick={props.onRequestClose}
        />
    ];

    return (
        <Dialog
            open={props.open}
            onClose={props.onRequestClose}
            maxWidth="md"
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                {props.children}
            </DialogContent>
            <DialogActions>
                {props.actions ? props.actions : actions}
            </DialogActions>
        </Dialog>
    );
}

interface CustomDialogProps {
    open: boolean;
    title: string;
    onRequestClose: () => void;
    actions?: React.ReactNode[];
    children?: React.ReactNode;
}
