import React from 'react';
import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../../store/labels/reducer";
import {getSelectedOrder} from "../../../../store/selected/reducer";
import PrintSection from "../../../../components/custom-components/order-print/print-section";
import {
    PrintOrderConnectedBoolean, PrintOrderConnectedDate,
    PrintOrderConnectedText
} from "./ConnectedCustomComponents/PrintOrderConnectedFields";

class FollowUpPrintSection extends React.Component {

    render() {
        if(!this.props.selectedOrder.followUpRequired)
            return null;

        return (
            <PrintSection title={this.props.labels.sectionName}>
                <PrintOrderConnectedBoolean name="followUpRequired"/>
                <PrintOrderConnectedDate name="followUpDate"/>
                <PrintOrderConnectedText name="followUpDetails"/>
            </PrintSection>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.orderPage.sections.followUp,
        selectedOrder: getSelectedOrder(state),
    };
}

export default connect(mapStateToProps)(FollowUpPrintSection);