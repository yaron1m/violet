import React from 'react';
import CustomPage from "../../../components/formFields/custom-page";
import CustomTextField from "../../../components/formFields/custom-text-field";
import {connect} from 'react-redux';

class OrganizationSection extends React.Component {

    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.organizations.selected
        };

        return (
            <CustomPage title={this.props.labels.sectionName}>
                <CustomTextField data={fieldData} name="name"/>
                <CustomTextField data={fieldData} name="address"/>
                <CustomTextField data={fieldData} name="companyId" size="M"/>
                <CustomTextField data={fieldData} name="howReachedUs"/>
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
