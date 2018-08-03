import {connect} from 'react-redux';
import {selectOrder} from "../../../store/SelectedOrder/Actions";
import {getLabels} from "../../../store/Labels/Reducer";
import {getOrdersSummary, getOrders} from "../../../store/orders/selectors";
import * as _ from "lodash";
import {redirect} from "../../../util/HistoryUtil";
import CustomPaperTable from "../../../components/tables/CustomPaperTable";
import PropTypes from "prop-types";

export function getElements(state, ownProps) {
    return _.reverse(getOrdersSummary(state, (state) => getOrders(state, ownProps.filterStatus)));
}

export function onEditButton(dispatch, orderId){
    dispatch(selectOrder(orderId));
    redirect('/form');
}

function mapStateToProps(state, ownProps) {
    return {
        title: getLabels(state).pages.allOrdersPage.title,
        tableHeaders: getLabels(state).pages.allOrdersPage.tableHeaders,
        elements: getElements(state, getElements),
        rowIndexKey: "id",
        beforeTable: ownProps.beforeTable,
        limit: ownProps.limit,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onEditButton: (orderId) => onEditButton(dispatch, orderId),
    };
}

const Container = connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);

Container.propTypes = {
    beforeTable: PropTypes.node,
    filterStatus: PropTypes.string,
    limit: PropTypes.number.isRequired,
};

export default Container;


