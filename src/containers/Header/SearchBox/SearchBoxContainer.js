import SearchBox from './SearchBox';
import {connect} from 'react-redux';
import {getLabels} from "../../../store/labels/reducer";
import {getOrganizations} from "../../../store/organizations/reducer";
import {selectOrder, selectOrganization} from "../../../store/selected/actions";
import {getOrders} from "../../../store/orders/selectors";

function mapStateToProps(state) {
    return {
        hintText: getLabels(state).header.searchLineHint,
        organizations: getOrganizations(state),
        orders: getOrders(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        selectOrganization: (organizationId) => dispatch(selectOrganization(organizationId)),
        selectOrder: (orderId) => dispatch(selectOrder(orderId)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
