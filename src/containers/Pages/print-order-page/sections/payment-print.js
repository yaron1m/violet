import React from 'react';
import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../../store/labels/reducer";
import PrintSection from "../../../../components/custom-components/order-print/print-section";
import ContactsPrintRow from './contacts-row'
import Divider from 'material-ui/Divider';
import PrintField from "../../../../components/custom-components/order-print/print-field";
import {getSelectedOrder} from "../../../../store/selected/reducer";

class ContactsPrintSection extends React.Component {
    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selectedOrder,
        };

        return (
            <PrintSection
                title={this.props.labels.sectionName}
            >
                <ContactsPrintRow
                    isFinancial={true}
                />

                <Divider style={{marginTop: 10, marginBottom: 10}}/>

                <PrintField data={fieldData} name="cost"/>
                <PrintField data={fieldData} name="oneWayDistance"/>
                <PrintField data={fieldData} name="travelExpenses"/>
                <PrintField data={fieldData} name="extraCosts"/>
                <PrintField data={fieldData} name="sum"/>
                <PrintField data={fieldData} name="vat"/>
                <PrintField data={fieldData} name="totalSum"/>
            </PrintSection>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.orderPage.sections.payment,
        selectedOrder: getSelectedOrder(state),
    };
}

export default connect(mapStateToProps)(ContactsPrintSection);