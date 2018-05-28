import {connect} from 'react-redux';
import _ from 'lodash';
import {selectOrganization} from "../../../../../store/selected/actions";
import {getLabels} from "../../../../../store/labels/reducer";
import {getOrganizations} from "../../../../../store/organizations/reducer";
import PropTypes from 'prop-types';
import OrganizationSection from "./OrganizationSection";
import {toSuggestions} from "../../../../../components/AutoSuggest";
import {updateSelectedOrder} from "../../../../../store/SelectedOrder/Actions";

function mapStateToProps(state, ownProps) {
    return {
        sectionName: getLabels(state).pages.orderPage.sections.organization.sectionName,
        paymentConditions: toSuggestions(_.values(getLabels(state).pages.orderPage.sections.organization.paymentConditions)),
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



