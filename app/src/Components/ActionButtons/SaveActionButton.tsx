import React from "react";
import SaveIcon from '@material-ui/icons/Save';
import {CustomIconButton} from "../CustomComponents/CustomButtons";

export default function SaveActionButton(props: SaveActionButtonProps) {
    return (
        <CustomIconButton
            onClick={props.onClick}
            tooltip={props.tooltip}
        >
            <SaveIcon/>
        </CustomIconButton>
    );
}

interface SaveActionButtonProps {
    tooltip?: string,
    onClick: () => void;
}
