import React from 'react';
import PrintSection from "../../../../Components/CustomComponents/OrderPrint/PrintSection";
import {
    PrintOrderConnectedBoolean, PrintOrderConnectedDate,
    PrintOrderConnectedText
} from "./ConnectedCustomComponents/PrintOrderConnectedFields";
import PropTypes from "prop-types";

export default class FollowUpPrintSection extends React.Component {

    render() {
        if (!this.props.display)
            return null;

        return (
            <PrintSection title={this.props.sectionName}>
                <PrintOrderConnectedBoolean name="followUpRequired"/>
                <PrintOrderConnectedDate name="followUpDate"/>
                <PrintOrderConnectedText name="followUpDetails"/>
            </PrintSection>
        );
    }
}

FollowUpPrintSection.propTypes = {
    display: PropTypes.bool,
    sectionName: PropTypes.string,
};