import {connect} from "react-redux";
import {selectOrder} from "../../Store/SelectedOrder/Actions";
import {redirect} from "../../Util/HistoryUtil";
import CustomPaperTable from "../../Components/Table/CustomPaperTable";
import * as _ from "lodash";
import {getFollowUpOrdersSummary, IFollowUpOrderSummary} from "../../Store/Orders/Selectors";
import {Path} from "../Path";
import {IDispatch, IState} from "../../Interfaces/ReduxInterfaces";
import {IStringObject} from "@violet/common";

function mapStateToProps(state: IState) {
    return {
        title: "המשך טיפול - טבלת מעקב",
        elements: _.sortBy(getFollowUpOrdersSummary(state), x => x.followUpDate),
        tableHeaders: [
            {orderId: "מספר הזמנה"},
            {organizationName: "שם הארגון"},
            {createdDate: "תאריך יצירה"},
            {topic: "נושא"},
            {status: "סטאטוס הזמנה"},
            {followUpDate: "תאריך המשך טיפול"},
            {followUpDetails: "פרטי המשך טיפול"}
        ] as IStringObject[]
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onEditButton: (summary: IFollowUpOrderSummary) => {
            dispatch(selectOrder(summary.orderId));
            redirect(Path.order);
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);