import React from 'react';
import SendOfferButton from './SendOfferContainer';
import SaveOrderButton from './save-order';
import ClearFormButton from './ClearFormContainer';
import PrintOrderButton from './PrintOrderContainer';
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