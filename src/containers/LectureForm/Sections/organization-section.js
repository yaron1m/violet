import React from 'react';
import CustomPage from "../../../components/formFields/custom-page";
import CustommTextField from "../../../components/formFields/custom-text-field";
import {connect} from 'react-redux';

class OrganizationSection extends React.Component {

    render() {
        const fields = this.props.labels.fields;
        const org = this.props.organizations.selected;

        return (
            <CustomPage title={this.props.labels.sectionName}>
                <CustommTextField title={fields.name} value={org.name}/>
                <CustommTextField title={fields.address} value={org.address}/>
                <CustommTextField title={fields.companyId} value={org.companyId} size="M"/>
                <CustommTextField title={fields.howReachedUs} value={org.howReachedUs}/>
            </CustomPage>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.lectureForm.organizationSection,
        organizations: state.organizations,
    };
}

export default connect(mapStateToProps)(OrganizationSection);
