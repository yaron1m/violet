import React from 'react';
import CustomPage from "../../../components/formFields/custom-page";
import {CustomText} from "../../../components/custom-components/custom-text-field";
import {connect} from 'react-redux';

class OrganizationSection extends React.Component {

    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.organizations.selected
        };

        return (
            <CustomPage title={this.props.labels.sectionName}>
                <CustomText data={fieldData} name="name"/>
                <CustomText data={fieldData} name="address"/>
                <CustomText data={fieldData} name="companyId" size="M"/>
                <CustomText data={fieldData} name="howReachedUs"/>
            </CustomPage>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.orderForm.organizationSection,
        organizations: state.organizations,
    };
}

export default connect(mapStateToProps)(OrganizationSection);
