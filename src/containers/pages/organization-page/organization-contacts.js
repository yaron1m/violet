import React from 'react';
import {connect} from 'react-redux';
import CustomPage from "../../../components/custom-components/custom-page";
import CustomTable from "../../../components/custom-components/custom-table";
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrganization} from "../../../store/selected/reducer";

class OrganizationContacts extends React.Component {
    render() {
        return (
                <CustomPage title={this.props.labels.title}>
                    <CustomTable
                        headers={this.props.labels.tableHeaders}
                        data={this.props.selectedOrganization.contacts}
                    />
                </CustomPage>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).OrganizationPage.contactsTable,
        selectedOrganization: getSelectedOrganization(state),
    };
}

export default connect(mapStateToProps)(OrganizationContacts);
