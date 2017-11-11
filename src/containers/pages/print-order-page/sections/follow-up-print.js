import React from 'react';
import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../../store/labels/reducer";
import {getSelectedOrder} from "../../../../store/selected/reducer";
import PrintField from "../../../../components/custom-components/order-print/print-field";
import PrintSection from "../../../../components/custom-components/order-print/print-section";
import PrintBoolean from "../../../../components/custom-components/order-print/print-boolean";

class FollowUpPrintSection extends React.Component {

    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selectedOrder,
        };

        if(!this.props.selectedOrder.followUpRequired)
            return null;

        return (
            <PrintSection title={this.props.labels.sectionName}>
                <PrintBoolean data={fieldData} name="followUpRequired"/>
                <PrintField data={fieldData} name="followUpDate"/>
                <PrintField data={fieldData} name="followUpDetails"/>
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