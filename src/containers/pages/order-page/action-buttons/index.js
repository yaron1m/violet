import React from 'react';
import SendOfferButton from './send-offer';
import SaveOrderButton from './save-order';
import ClearFormButton from './clear-form';
import {ActionButtonsBox} from "../../../../components/action-buttons-box";

export default class OrderActionButtons extends React.Component {
    render() {

        return (
            <ActionButtonsBox>

                <SaveOrderButton/>

                <SendOfferButton/>

                <ClearFormButton/>

            </ActionButtonsBox>

        );
    }
}