import React from 'react';
// import SendOfferButton from './SendOfferContainer';
import SavePublicCourseButton from './SavePublicCourseContainer';
// import ClearFormButton from './ClearFormContainer';
// import PrintOrderButton from './PrintOrderContainer';
import {ActionButtonsBox} from "../../../../components/ActionButtons/ActionButtonsBox";

export default class PublicCourseActionButtons extends React.Component {
    render() {

        return (
            <ActionButtonsBox>

                <SavePublicCourseButton/>

                {/*<SendOfferButton/>*/}

                {/*<PrintOrderButton/>*/}

                {/*<ClearFormButton/>*/}

            </ActionButtonsBox>
        );
    }
}