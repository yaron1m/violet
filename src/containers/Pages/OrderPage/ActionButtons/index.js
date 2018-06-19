import React from 'react';
import SendOfferButton from './SendOfferContainer';
import SaveOrderButton from './SaveOrderButton/SaveOrderContainer';
import ClearFormButton from './ClearFormContainer';
import PrintOrderButton from './PrintOrderContainer';
import {ActionButtonsBox} from "../../../../components/ActionButtons/ActionButtonsBox";

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