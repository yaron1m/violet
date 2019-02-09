import React from 'react';
import PrintSection from "../../../Components/CustomComponents/OrderPrint/PrintSection";
import {
    PrintOrderConnectedBoolean,
    PrintOrderConnectedText
} from "./ConnectedCustomComponents/PrintOrderConnectedFields";
import PropTypes from "prop-types";
import CustomDivider from "../../../Components/CustomComponents/CustomDivider";

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

                <CustomDivider/>

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