import React from 'react';
import CustomPaper, {flexStyle} from "../../../../../Components/CustomComponents/CustomPaper";
import PropTypes from 'prop-types';
import {Sizes} from "../../../../../Util/Constants/Sizes";
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
                        size={Sizes.XXL}
                    />
                    <OrganizationCustomText name="organizationAddress"/>
                    <OrganizationCustomText name="organizationCity" size={Sizes.M}/>
                    <OrganizationCustomText name="organizationPostalCode" size={Sizes.M}/>
                    <OrganizationCustomText name="companyId" size={Sizes.M}/>
                    <OrganizationCustomAutoComplete name="paymentConditions"
                                                    suggestions={this.props.paymentConditions}/>

                    <OrganizationCustomText name="howReachedUs" size={Sizes.XL}/>

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