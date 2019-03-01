import React from "react";
import SaveIcon from "@material-ui/icons/Save";
import {CustomIconButton} from "../CustomComponents/CustomButtons";

export default function SaveActionButton(props: SaveActionButtonProps) {
    return (
        <CustomIconButton
            onClick={props.onClick}
            tooltip="שמור הזמנה"
        >
            <SaveIcon/>
        </CustomIconButton>
    );
}

interface SaveActionButtonProps {
    onClick: () => void;
}
