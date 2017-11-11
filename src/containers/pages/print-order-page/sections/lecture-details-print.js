import React from 'react';
import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../../store/labels/reducer";
import {getSelectedOrder} from "../../../../store/selected/reducer";
import PrintField from "../../../../components/custom-components/order-print/print-field";
import PrintSection from "../../../../components/custom-components/order-print/print-section";
import PrintBoolean from "../../../../components/custom-components/order-print/print-boolean";
import Divider from 'material-ui/Divider';

class LectureDetailsPrintSection extends React.Component {

    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selectedOrder,
        };

        return (
            <PrintSection title={this.props.labels.sectionName}>
                <PrintField data={fieldData} name="street"/>
                <PrintField data={fieldData} name="streetNumber"/>
                <PrintField data={fieldData} name="city"/>
                <PrintField data={fieldData} name="location"/>
                <PrintField data={fieldData} name="audienceType"/>
                <PrintField data={fieldData} name="daySchedule"/>

                <Divider style={{marginTop: 10, marginBottom: 10}}/>

                <PrintBoolean data={fieldData} name="projector"/>
                <PrintBoolean data={fieldData} name="soundSystem"/>
                <PrintBoolean data={fieldData} name="microphone"/>
                <PrintBoolean data={fieldData} name="parking"/>
                <PrintBoolean data={fieldData} name="orderApproved"/>
                <PrintBoolean data={fieldData} name="sameAudience"/>
            </PrintSection>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.orderPage.sections.lectureDetails,
        selectedOrder: getSelectedOrder(state),
    };
}

export default connect(mapStateToProps)(LectureDetailsPrintSection);