import {connect} from 'react-redux';
import {selectOrder} from "../../../store/SelectedOrder/Actions";
import {getLabels} from "../../../store/labels/reducer";
import {getOrdersSummary, getOrders} from "../../../store/orders/selectors";
import * as _ from "lodash";
import {redirect} from "../../../util/history-util";
import CustomPaperTable from "../../../components/tables/CustomPaperTable";
import PropTypes from "prop-types";

function mapStateToProps(state, ownProps) {
    return {
        title: getLabels(state).pages.allOrdersPage.title,
        tableHeaders: getLabels(state).pages.allOrdersPage.tableHeaders,
        elements: _.reverse(getOrdersSummary(state, (state) => getOrders(state, ownProps.filterStatus))),
        rowIndexKey: "id",
        beforeTable: ownProps.beforeTable,
        limit: 30,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onEditButton: (orderId) => {
            dispatch(selectOrder(orderId));
            redirect('/form');
        },
    };
}

const Container = connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);

Container.propTypes = {
    beforeTable: PropTypes.node,
    filterStatus: PropTypes.string,
};

export default Container;


