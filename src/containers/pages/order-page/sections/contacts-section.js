import React from 'react';
import CustomCard from "../../../../components/custom-components/custom-card";
import {connect} from 'react-redux';
import {getLabels} from "../../../../store/labels/reducer";
import CustomText from "../../../../components/custom-components/custom-text-field";
import {updateSelectedOrder} from "../../../../store/selected/actions";
import {getSelectedOrder} from "../../../../store/selected/reducer";
import Divider from "material-ui/Divider";
import {getRequiredFields} from "../../../../store/required-fields/reducer";


class ContactsSection extends React.Component {


    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selectedOrder,
            requiredFields: this.props.requiredFields,
            updateAction: function (key, value) {
                this.props.dispatch(updateSelectedOrder(key, value));
            }.bind(this)
        };

        return (
            <CustomCard title={this.props.labels.sectionName}>
                <CustomText data={fieldData} name="contactFirstName" size="M"/>
                <CustomText data={fieldData} name="contactLastName" size="M"/>
                <CustomText data={fieldData} name="contactPhone1" size="M"/>
                <CustomText data={fieldData} name="contactPhoneExtension" size="M"/>
                <CustomText data={fieldData} name="contactEmail" size="XL"/>
                <CustomText data={fieldData} name="contactPhone2" size="M"/>
                <CustomText data={fieldData} name="contactFax" size="M"/>
                <CustomText data={fieldData} name="contactJob" size="M"/>

                <Divider style={{marginTop: 10, marginBottom: 10}}/>

                <div>איש קשר לתשלום</div>

                <CustomText data={fieldData} name="financialContactFirstName" size="M"/>
                <CustomText data={fieldData} name="financialContactLastName" size="M"/>
                <CustomText data={fieldData} name="financialContactPhone1" size="M"/>
                <CustomText data={fieldData} name="financialContactPhoneExtension" size="M"/>
                <CustomText data={fieldData} name="financialContactEmail" size="XL"/>
                <CustomText data={fieldData} name="financialContactPhone2" size="M"/>
                <CustomText data={fieldData} name="financialContactFax" size="M"/>
                <CustomText data={fieldData} name="financialContactJob" size="M"/>
            </CustomCard>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).orderPage.contactsSection,
        selectedOrder: getSelectedOrder(state),
        requiredFields: getRequiredFields(state),
    };
}

export default connect(mapStateToProps)(ContactsSection);


