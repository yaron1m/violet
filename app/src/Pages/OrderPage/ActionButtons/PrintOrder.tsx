import React from "react";
import PrintIcon from '@material-ui/icons/Print';
import {CustomIconButton} from "../../../Components/CustomComponents/CustomButtons";

export default function PrintOrderButton(props: { printLabel: string, onClick: () => void }) {
    return (
        <CustomIconButton
            tooltip={props.printLabel}
            onClick={props.onClick}
        >
            <PrintIcon/>
        </CustomIconButton>
    );
}