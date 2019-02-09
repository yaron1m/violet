import {connect} from 'react-redux';
import _ from 'lodash';
import {selectOrganization} from "../../../../../Store/SelectedOrganization/Actions";
import {getOrderSectionsLabels} from "../../../../../Store/Labels/Selectors";
import {getOrganizations} from "../../../../../Store/Organizations/Selectors";
import PropTypes from 'prop-types';
import OrganizationSection from "./OrganizationSection";
import {toSuggestions} from "../../../../../Components/AutoSuggest";
import {updateSelectedOrder} from "../../../../../Store/SelectedOrder/Actions";

function mapStateToProps(state, ownProps) {
    return {
        sectionName: getOrderSectionsLabels(state).organization.sectionName,
        paymentConditions: toSuggestions(_.values(getOrderSectionsLabels(state).organization.paymentConditions)),
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



