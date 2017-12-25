import React from 'react';
import CustomPaper from "../../../components/custom-components/custom-paper";
import CustomText from "../../../components/custom-components/custom-text-field";
import {connect} from 'react-redux';
import {selectOrganization, updateSelectedOrder, updateSelectedOrganization} from "../../../store/selected/actions";
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrganization} from "../../../store/selected/reducer";
import CustomAutoComplete from "../../../components/custom-components/custom-autocomplete";
import {getRequiredFields} from "../../../store/required-fields/reducer";
import * as _ from "lodash";
import {getOrganizations} from "../../../store/organizations/reducer";
import CustomToggle from "../../../components/custom-components/custom-toggle";
import PropTypes from 'prop-types';
import Sizes from "../../../util/consts/sizes";


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
                    onNewRequest={chosenRequest => {
                        this.props.dispatch(selectOrganization(chosenRequest.value));
                        this.props.dispatch(updateSelectedOrder("organizationId", chosenRequest.value));
                    }}
                    size={Sizes.XXL}
                />
                <CustomText data={fieldData} name="organizationAddress"/>
                <CustomText data={fieldData} name="organizationCity" size={Sizes.M}/>
                <CustomText data={fieldData} name="organizationPostalCode" size={Sizes.M}/>
                <CustomText data={fieldData} name="companyId" size={Sizes.M}/>
                <CustomAutoComplete data={fieldData} name="paymentConditions"
                                    dataSource={_.values(this.props.labels.paymentConditions)}/>
                <CustomText data={fieldData} name="howReachedUs"/>
                {this.props.fullDetails ?
                    <CustomToggle data={fieldData} name="internalOrderIdRequired"/>
                    : null
                }
            </CustomPaper>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        labels: getLabels(state).pages.orderPage.sections.organization,
        organizations: getOrganizations(state),
        selectedOrganization: getSelectedOrganization(state),
        requiredFields: getRequiredFields(state).organization,
        fullDetails: ownProps.fullDetails,
    };
}

OrganizationSection.propTypes = {
    fullDetails: PropTypes.bool,
};

OrganizationSection.defaultProps = {
    fullDetails: false,
};


export default connect(mapStateToProps)(OrganizationSection);
