import React from 'react';
import CustomPaper from "../../../../../components/custom-components/CustomPaper";
import * as _ from "lodash";
import PropTypes from 'prop-types';
import Sizes from "../../../../../util/consts/sizes";
import {
    OrganizationCustomAutoComplete,
    OrganizationCustomText, OrganizationCustomToggle
} from "../ConnectedCustomComponents/OrganizationCustomFields";


export default class OrganizationSection extends React.Component {

    render() {
        const organizationNamesObjects = _.values(this.props.organizations).map(
            (org) => ({
                text: org.organizationName,
                value: org.id
            }));

        return (
            <CustomPaper title={this.props.sectionName}>
                <OrganizationCustomAutoComplete
                    name="organizationName"
                    dataSource={organizationNamesObjects}
                    onNewRequest={chosenRequest => {
                        this.props.selectOrganization(chosenRequest.value);
                        this.props.updateSelectedOrder("organizationId", chosenRequest.value);
                    }}
                    size={Sizes.XXL}
                />
                <OrganizationCustomText name="organizationAddress"/>
                <OrganizationCustomText name="organizationCity" size={Sizes.M}/>
                <OrganizationCustomText name="organizationPostalCode" size={Sizes.M}/>
                <OrganizationCustomText name="companyId" size={Sizes.M}/>
                <OrganizationCustomAutoComplete name="paymentConditions"
                                                dataSource={_.values(this.props.paymentConditions)}/>
                <OrganizationCustomText name="howReachedUs"/>

                {this.props.fullDetails ?
                    <OrganizationCustomToggle name="internalOrderIdRequired"/>
                    : null
                }
            </CustomPaper>
        );
    }
}


OrganizationSection.propTypes = {
    fullDetails: PropTypes.bool,
    sectionName: PropTypes.string,
    paymentConditions: PropTypes.object,
    organizations: PropTypes.object,

    selectOrganization: PropTypes.func,
    updateSelectedOrder: PropTypes.func,
};