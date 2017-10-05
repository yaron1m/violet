import React from 'react';
import CustomPaper from "../../../../../components/custom-components/custom-paper";
import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/labels/reducer";
import {getSelectedOrder, isSelectedOrganization} from "../../../../../store/selected/reducer";
import ContactRow from './contact-row';
import {getRequiredFields} from "../../../../../store/required-fields/reducer";

class ContactsSection extends React.Component {

    render() {
       return (
            <CustomPaper title={this.props.labels.sectionName}>
                <ContactRow isFinancialContacts={false}/>
            </CustomPaper>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).orderPage.contactsSection,
        selectedOrder: getSelectedOrder(state),
        isSelectedOrganization: isSelectedOrganization(state),
        requiredFields: getRequiredFields(state).order,
    };
}

export default connect(mapStateToProps)(ContactsSection);


