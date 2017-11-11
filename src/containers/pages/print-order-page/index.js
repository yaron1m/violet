import React from 'react';
import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrder} from "../../../store/selected/reducer";
import PrintField from "../../../components/custom-components/order-print/print-field";
import PrintSection from "../../../components/custom-components/order-print/print-section";

class PrintOrderPage extends React.Component {

    render() {
        const lectureDetailsData = {
            titles: this.props.labels.titles,
            values: this.props.selectedOrder,
        };

        return (
            <PrintSection title={this.props.labels.sectionName}>
                <PrintField data={lectureDetailsData} name="street"/>
                <PrintField data={lectureDetailsData} name="streetNumber"/>
                <PrintField data={lectureDetailsData} name="city"/>
                <PrintField data={lectureDetailsData} name="location"/>
                <PrintField data={lectureDetailsData} name="audienceType"/>
                <PrintField data={lectureDetailsData} name="daySchedule"/>
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

export default connect(mapStateToProps)(PrintOrderPage);