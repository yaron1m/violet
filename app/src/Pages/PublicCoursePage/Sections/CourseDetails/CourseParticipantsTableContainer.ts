import {connect} from "react-redux";
import CustomPaperTable from "../../../../Components/Table/CustomPaperTable";
import {
    getSelectedPublicCourseParticipants,
    ISelectedPublicCourseParticipantsSummary
} from "../../../../Store/SelectedPublicCourse/Selectors";
import {redirect} from "../../../../Util/HistoryUtil";
import {selectOrder} from "../../../../Store/SelectedOrder/Actions";
import {Path} from "../../../Path";
import {IDispatch, IState} from "../../../../Interfaces/ReduxInterfaces";
import {IStringObject} from "@violet/common";

function mapStateToProps(state: IState) {
    return {
        title: "משתתפים",
        elements: getSelectedPublicCourseParticipants(state),
        tableHeaders: [
            {orderId: "מספר הזמנה"},
            {participantFirstName: "שם פרטי"},
            {participantLastName: "שם משפחה"},
            {organizationName: "ארגון"},
            {status: "סטאטוס"},
            {proformaInvoiceNumber: "חשבונית עסקה"},
            {numberOfLecturesAttending: "ימים"},
            {participantCost: "מחיר השתתפות"},
        ] as IStringObject[],
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onEditButton: (summary: ISelectedPublicCourseParticipantsSummary) => {
            dispatch(selectOrder(summary.orderId));
            redirect(Path.order);
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);
