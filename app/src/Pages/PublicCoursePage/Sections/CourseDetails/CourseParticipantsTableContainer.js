import {connect} from 'react-redux';
import {getLabels} from "../../../../Store/Labels/Selectors";
import CustomPaperTable from "../../../../Components/Table/CustomPaperTable";
import {getSelectedPublicCourseParticipants} from "../../../../Store/SelectedPublicCourse/Selectors";
import {redirect} from "../../../../Util/HistoryUtil";
import {selectOrder} from "../../../../Store/SelectedOrder/Actions";
import {Path} from "../../../Path";

function mapStateToProps(state) {
    return {
        title: getLabels(state).pages.publicCoursePage.sections.courseParticipantsSectionName,
        elements: getSelectedPublicCourseParticipants(state),
        tableHeaders: getLabels(state).pages.publicCoursePage.participantsTableHeaders,
        rowIndexKey: "orderId",
    };
}

function mapDispatchToProps(dispatch){
    return {
        onEditButton: (orderId) => {
            dispatch(selectOrder(orderId));
            redirect(Path.order);
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);

