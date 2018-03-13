import {connect} from 'react-redux';
import {selectOrganization, updateSelectedOrder} from "../../../../../store/selected/actions";
import {getLabels} from "../../../../../store/labels/reducer";
import {getOrganizations} from "../../../../../store/organizations/reducer";
import PropTypes from 'prop-types';
import OrganizationSection from "./OrganizationSection";

function mapStateToProps(state, ownProps) {
    return {
        sectionName: getLabels(state).pages.orderPage.sections.organization.sectionName,
        paymentConditions: getLabels(state).pages.orderPage.sections.organization.paymentConditions,
        organizations: getOrganizations(state),
        fullDetails: ownProps.fullDetails,
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


