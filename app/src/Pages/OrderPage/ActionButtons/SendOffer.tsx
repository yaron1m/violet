import React from "react";
import SendIcon from '@material-ui/icons/Mail';
import {CustomIconButton} from "../../../Components/CustomComponents/CustomButtons";

export default function SendOfferButton(props: { orderEmailLink?: string }) {
    return (
        <a href={props.orderEmailLink}>
            <CustomIconButton tooltip="שלח הצעת מחיר" onClick={() => {}}>
                <SendIcon/>
            </CustomIconButton>
        </a>
    );
}
