import {connect} from 'react-redux';
import _ from 'lodash';
import {selectOrganization, updateSelectedOrder} from "../../../../../store/selected/actions";
import {getLabels} from "../../../../../store/labels/reducer";
import {getOrganizations} from "../../../../../store/organizations/reducer";
import PropTypes from 'prop-types';
import OrganizationSection from "./OrganizationSection";
import {toSuggestion} from "../../../../../components/AutoSuggest";

function mapStateToProps(state, ownProps) {
    return {
        sectionName: getLabels(state).pages.orderPage.sections.organization.sectionName,
        paymentConditions: _.map(getLabels(state).pages.orderPage.sections.organization.paymentConditions, toSuggestion),
        fullDetails: ownProps.fullDetails,
        organizationSuggestions: _.values(getOrganizations(state)).map(
            (org) => ({
                label: org.organizationName,
                value: org.id
            })),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        selectOrganization: (organizationId) => dispatch(selectOrganization(organizationId)),
        updateSelectedOrder: (key, value) => dispatch(updateSelectedOrder(key, value)),
    };
}

const Container = connect(mapStateToProps, mapDispatchToProps)(OrganizationSection);

Container.propTypes = {
    fullDetails: PropTypes.bool,
};

Container.defaultProps = {
    fullDetails: false,
};

export default Container;



