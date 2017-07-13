import React from 'react';
import CustomCard from "../../../../components/custom-components/custom-card";
import ContactsTable from "../contacts-table"
import {connect} from 'react-redux';


class ContactsSection extends React.Component {

    render() {

        return (
            <CustomCard title={this.props.labels.sectionName}>

                <ContactsTable/>
            </CustomCard>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.orderPage.contactsSection,
        organizations: state.organizations,
    };
}
export default connect(mapStateToProps)(ContactsSection);


