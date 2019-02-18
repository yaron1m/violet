import React from "react";
import SendOfferButton from './SendOfferContainer';
import SaveOrderButton from './SaveOrderButton/SaveOrderContainer';
import ClearFormButton from './ClearFormContainer';
import PrintOrderButton from './PrintOrderContainer';
import ActionButtonsBox from "../../../Components/ActionButtons/ActionButtonsBox";

export default function OrderActionButtons() {
    return (
        <ActionButtonsBox>

            <SaveOrderButton/>

            <SendOfferButton/>

            <PrintOrderButton/>

            <ClearFormButton/>

        </ActionButtonsBox>
    );
}