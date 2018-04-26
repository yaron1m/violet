import React from 'react';
import PrintSection from "../../../../components/custom-components/order-print/print-section";
import Divider from 'material-ui/Divider';
import {
    PrintOrderConnectedBoolean,
    PrintOrderConnectedText
} from "./ConnectedCustomComponents/PrintOrderConnectedFields";
import PropTypes from "prop-types";

export default class LectureDetailsPrintSection extends React.Component {

    render() {
        return (
            <PrintSection title={this.props.sectionName}>
                <PrintOrderConnectedText name="street"/>
                <PrintOrderConnectedText name="streetNumber"/>
                <PrintOrderConnectedText name="city"/>
                <PrintOrderConnectedText name="location"/>
                <PrintOrderConnectedText name="audienceType"/>
                <PrintOrderConnectedText name="daySchedule"/>

                <PrintOrderConnectedText
                    name="status"
                    values={{status: this.props.status}}
                />

                <Divider style={{marginTop: 10, marginBottom: 10}}/>

                <PrintOrderConnectedBoolean name="projector"/>
                <PrintOrderConnectedBoolean name="soundSystem"/>
                <PrintOrderConnectedBoolean name="microphone"/>
                <PrintOrderConnectedBoolean name="parking"/>
                <PrintOrderConnectedBoolean name="orderApproved"/>
                <PrintOrderConnectedBoolean name="sameAudience"/>
            </PrintSection>
        );
    }
}

LectureDetailsPrintSection.propTypes = {
    sectionName: PropTypes.string,
    status: PropTypes.string,
};