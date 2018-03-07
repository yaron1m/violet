import React from 'react';
import CustomPaper from "../../../../../components/custom-components/custom-paper";
import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/labels/reducer";
import {getSelectedOrder, isSelectedOrganization} from "../../../../../store/selected/reducer";
import ContactRowContainer from './ContactRowContainer';
import {getRequiredFields} from "../../../../../store/required-fields/reducer";

class ContactsSection extends React.Component {

    render() {
       return (
            <CustomPaper title={this.props.labels.sectionName}>
                <ContactRowContainer isFinancialContacts={false}/>
            </CustomPaper>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.orderPage.sections.contacts,
        selectedOrder: getSelectedOrder(state),
        isSelectedOrganization: isSelectedOrganization(state),
        requiredFields: getRequiredFields(state).order,
    };
}

export default connect(mapStateToProps)(ContactsSection);


