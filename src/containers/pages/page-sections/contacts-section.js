import React from 'react';
import CustomCard from "../../../components/custom-components/custom-card";
import {connect} from 'react-redux';
import CustomTable from "../../../components/custom-components/custom-table";
import {getLabels} from "../../../store/labels/reducer";


class ContactsSection extends React.Component {

    render() {
        return (
            <CustomCard title={this.props.labels.sectionName}>
                <CustomTable
                    headers={this.props.labels.tableHeaders}
                    data={this.props.selected.organization.contacts}
                />
            </CustomCard>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).orderPage.contactsSection,
        organizations: state.organizations,
        selected: state.selected,
    };
}
export default connect(mapStateToProps)(ContactsSection);


