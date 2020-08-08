import {connect} from "react-redux";
import {selectOrder} from "../../Store/SelectedOrder/Actions";
import {getOrders, getOrdersSummary, IOrderSummary} from "../../Store/Orders/Selectors";
import * as _ from "lodash";
import {redirect} from "../../Util/HistoryUtil";
import {IDispatch, IState} from "../../Interfaces/ReduxInterfaces";
import {Status} from "@violet/common";
import {Path} from "../Path";
import BiPageContent from "./BiPageContent";
import {isEmpty} from "../../Util/StringUtil";

export function getData(state: IState, ownProps: BiPageContentContainerProps): [IOrderSummary[], IReferralWayCounters] {
    const status = isEmpty(ownProps.filterStatus) ? undefined : ownProps.filterStatus;
    const orders = getOrdersSummary(state, (state: IState) => getOrders(state, status));

    const startDate = new Date(ownProps.startDate);
    const endDate = new Date(ownProps.endDate);

    const referralWayCounters: IReferralWayCounters = {}

    const filteredOffers = _.filter(orders, order => {
        if (isEmpty(order.date)) {
            return false;
        }

        const orderDate = new Date(order.date);
        const shouldShow = startDate <= orderDate && orderDate <= endDate;
        if (shouldShow) {
            if (!(order.orgReferralWay in referralWayCounters)) {
                referralWayCounters[order.orgReferralWay] = 0;
            }
            referralWayCounters[order.orgReferralWay]++;
        }

        return shouldShow;
    })

    const ordersMatchingFilters = _.reverse(filteredOffers);
    return [ordersMatchingFilters, referralWayCounters];
}

function mapStateToProps(state: IState, ownProps: BiPageContentContainerProps) {
    const [ordersMatchingFilters, referralWayCounters] = getData(state, ownProps);

    return {
        ...ownProps,
        ordersMatchingFilters,
        referralWayCounters
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onTableRowEdit: (summary: IOrderSummary) => {
            dispatch(selectOrder(summary.id));
            redirect(Path.order);
        },
    };
}

export interface BiPageContentContainerProps {
    startDate: string;
    setStartDate: (date: string) => void;
    endDate: string;
    setEndDate: (date: string) => void;
    filterStatus?: Status;
    setFilterStatus: (status: Status) => void;
}

export type IReferralWayCounters = { [referralWay: string]: number };

export default connect(mapStateToProps, mapDispatchToProps)(BiPageContent);