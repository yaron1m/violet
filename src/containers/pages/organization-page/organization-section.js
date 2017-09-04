import React from 'react';
import CustomPaper from "../../../components/custom-components/custom-paper";
import CustomText from "../../../components/custom-components/custom-text-field";
import {connect} from 'react-redux';
import {selectOrganization, updateSelectedOrganization} from "../../../store/selected/actions";
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrganization} from "../../../store/selected/reducer";
import CustomAutoComplete from "../../../components/custom-components/custom-autocomplete";
import {getRequiredFields} from "../../../store/required-fields/reducer";
import * as _ from "lodash";
import {getOrganizations} from "../../../store/organizations/reducer";

class OrganizationSection extends React.Component {

    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selectedOrganization,
            requiredFields: this.props.requiredFields,
            updateAction: function (key, value) {
                this.props.dispatch(updateSelectedOrganization(key, value));
            }.bind(this)
        };

        const organizationNamesObjects = _.values(this.props.organizations).map(
            (org) => ({text: org.organizationName, value: org.id}));

        return (
            <CustomPaper title={this.props.labels.sectionName}>
                <CustomAutoComplete
                    data={fieldData}
                    name="organizationName"
                    dataSource={organizationNamesObjects}
                    onNewRequest={chosenRequest => this.props.dispatch(selectOrganization(chosenRequest.value))}
                    size="XL"
                />
                <CustomText data={fieldData} name="organizationAddress"/>
                <CustomText data={fieldData} name="organizationCity" size="M"/>
                <CustomText data={fieldData} name="organizationPostalCode" size="M"/>
                <CustomText data={fieldData} name="companyId" size="M"/>
                <CustomAutoComplete data={fieldData} name="paymentConditions"
                                    dataSource={_.values(this.props.labels.paymentConditions)}/>
                <CustomText data={fieldData} name="howReachedUs"/>
            </CustomPaper>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        labels: getLabels(state).OrganizationPage.organizationSection,
        organizations: getOrganizations(state),
        selectedOrganization: getSelectedOrganization(state),
        requiredFields: getRequiredFields(state).organization,
        allowEdit: ownProps.allowEdit
    };
}

export default connect(mapStateToProps)(OrganizationSection);
