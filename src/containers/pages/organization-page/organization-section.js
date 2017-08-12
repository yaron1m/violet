import React from 'react';
import CustomPaper from "../../../components/custom-components/custom-paper";
import CustomText from "../../../components/custom-components/custom-text-field";
import {connect} from 'react-redux';
import {updateSelectedOrganization} from "../../../store/selected/actions";
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrganization} from "../../../store/selected/reducer";
import CustomAutoComplete from "../../../components/custom-components/custom-autocomplete";
import {getRequiredFields} from "../../../store/required-fields/reducer";

class OrganizationSection extends React.Component {

    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selectedOrganization,
            requiredFields: this.props.requiredFields.organization,
            updateAction: function (key, value) {
                    this.props.dispatch(updateSelectedOrganization(key, value));
            }.bind(this)
        };

        const paymentConditions = ["aa", "bb", "cc"];

        return (
            <CustomPaper title={this.props.labels.sectionName}>
                <CustomText data={fieldData} name="organizationName"/>
                <CustomText data={fieldData} name="organizationAddress"/>
                <CustomText data={fieldData} name="companyId" size="M"/>
                <CustomAutoComplete data={fieldData} name="paymentConditions" dataSource={paymentConditions}/>
                <CustomText data={fieldData} name="howReachedUs"/>
            </CustomPaper>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        labels: getLabels(state).OrganizationPage.organizationSection,
        selectedOrganization: getSelectedOrganization(state),
        requiredFields: getRequiredFields(state),
        allowEdit: ownProps.allowEdit
    };
}

export default connect(mapStateToProps)(OrganizationSection);
