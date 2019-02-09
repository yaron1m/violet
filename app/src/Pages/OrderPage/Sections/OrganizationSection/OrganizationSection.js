import React from 'react';
import CustomPaper, {flexStyle} from "../../../../Components/CustomComponents/CustomPaper";
import PropTypes from 'prop-types';
import {Size} from "../../../../util/Constants/Size";
import {
    OrganizationCustomAutoComplete,
    OrganizationCustomText, OrganizationCustomToggle
} from "../ConnectedCustomComponents/OrganizationCustomFields";


export default class OrganizationSection extends React.Component {

    render() {
        return (
            <CustomPaper title={this.props.sectionName}>
                <div style={flexStyle}>
                    <OrganizationCustomAutoComplete
                        name="organizationName"
                        suggestions={this.props.organizationSuggestions}
                        onSuggestionSelected={chosenRequest => {
                            this.props.selectOrganization(chosenRequest.value);
                            this.props.updateSelectedOrder("organizationId", chosenRequest.value);
                        }}
                        size={Size.XXL}
                    />
                    <OrganizationCustomText name="organizationAddress"/>
                    <OrganizationCustomText name="organizationCity" size={Size.M}/>
                    <OrganizationCustomText name="organizationPostalCode" size={Size.M}/>
                    <OrganizationCustomText name="companyId" size={Size.M}/>
                    <OrganizationCustomAutoComplete name="paymentConditions"
                                                    suggestions={this.props.paymentConditions}/>

                    <OrganizationCustomText name="howReachedUs" size={Size.XL}/>

                    {this.props.fullDetails ?
                        <OrganizationCustomToggle name="internalOrderIdRequired"/>
                        : null
                    }
                </div>
            </CustomPaper>
        );
    }
}


OrganizationSection.propTypes = {
    fullDetails: PropTypes.bool,
    sectionName: PropTypes.string,
    paymentConditions: PropTypes.array,
    organizationSuggestions: PropTypes.array,
    organizations: PropTypes.object,

    selectOrganization: PropTypes.func,
    updateSelectedOrder: PropTypes.func,
};