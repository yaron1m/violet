import React from 'react';
import SendOfferButton from './send-offer';
import SaveOrderButton from './save-order';
import ClearFormButton from './ClearFormContainer';
import PrintOrderButton from './print-order';
import {ActionButtonsBox} from "../../../../components/ActionButtonsBox";

export default class OrderActionButtons extends React.Component {
    render() {

        return (
            <ActionButtonsBox>

                <SaveOrderButton/>

                <SendOfferButton/>

                <PrintOrderButton/>

                <ClearFormButton/>

            </ActionButtonsBox>
        );
    }
}