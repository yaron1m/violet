import React from 'react';
import PrintSection from "../../../../components/custom-components/order-print/print-section";
import {
    PrintOrderConnectedBoolean, PrintOrderConnectedDate,
    PrintOrderConnectedText
} from "./ConnectedCustomComponents/PrintOrderConnectedFields";

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
