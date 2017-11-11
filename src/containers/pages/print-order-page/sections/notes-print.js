import React from 'react';
import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../../store/labels/reducer";
import {getSelectedOrder} from "../../../../store/selected/reducer";
import PrintField from "../../../../components/custom-components/order-print/print-field";
import PrintSection from "../../../../components/custom-components/order-print/print-section";

class NotesPrintSection extends React.Component {

    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selectedOrder,
        };

        return (
            <PrintSection title={this.props.labels.sectionName}>
                <PrintField data={fieldData} name="notes"/>
            </PrintSection>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.orderPage.sections.notes,
        selectedOrder: getSelectedOrder(state),
    };
}

export default connect(mapStateToProps)(NotesPrintSection);