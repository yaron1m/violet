import React from 'react';
import SendIcon from '@material-ui/icons/Mail';
import {CustomIconButton} from "../../../Components/CustomComponents/CustomButtons";

export default function SendOfferButton(props: { sendLabel: string, orderEmailLink?: string }) {
    return (
        <a href={props.orderEmailLink}>
            <CustomIconButton tooltip={props.sendLabel} onClick={() => {}}>
                <SendIcon/>
            </CustomIconButton>
        </a>
    );
}
