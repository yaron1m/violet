import React from 'react';
import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../../store/labels/reducer";
import {getSelectedOrder} from "../../../../store/selected/reducer";
import PrintField from "../../../../components/custom-components/order-print/print-field";
import PrintSection from "../../../../components/custom-components/order-print/print-section";
import {getKey} from "../../order-page/sections/contacts-section/contact-row";
import Divider from 'material-ui/Divider';

class ContactsPrintSection extends React.Component {
    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selectedOrder,
        };

        return (
            <PrintSection title={this.props.labels.sectionName}>
                <PrintField data={fieldData} name={getKey("contactFirstName", false)}/>
                <PrintField data={fieldData} name={getKey("contactLastName", false)}/>
                <PrintField data={fieldData} name={getKey("contactJob", false)}/>
                <PrintField data={fieldData} name={getKey("contactPhone1", false)}/>
                <PrintField data={fieldData} name={getKey("contactEmail", false)}/>
                <PrintField data={fieldData} name={getKey("contactPhone2", false)}/>
                <PrintField data={fieldData} name={getKey("contactPhoneExtension", false)}/>
                <PrintField data={fieldData} name={getKey("contactFax", false)}/>

                <Divider style={{marginTop: 10, marginBottom: 10}}/>

                <PrintField data={fieldData} name={getKey("contactFirstName", true)}/>
                <PrintField data={fieldData} name={getKey("contactLastName", true)}/>
                <PrintField data={fieldData} name={getKey("contactJob", true)}/>
                <PrintField data={fieldData} name={getKey("contactPhone1", true)}/>
                <PrintField data={fieldData} name={getKey("contactEmail", true)}/>
                <PrintField data={fieldData} name={getKey("contactPhone2", true)}/>
                <PrintField data={fieldData} name={getKey("contactPhoneExtension", true)}/>
                <PrintField data={fieldData} name={getKey("contactFax", true)}/>

            </PrintSection>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.orderPage.sections.contacts,
        selectedOrder: getSelectedOrder(state),
    };
}

export default connect(mapStateToProps)(ContactsPrintSection);