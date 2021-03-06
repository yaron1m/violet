import {connect} from "react-redux";
import CustomPaperTable from "../../../../Components/Table/CustomPaperTable";
import {getLecturesDetails} from "../../../../Store/SelectedPublicCourse/Selectors";
import {IState} from "../../../../Interfaces/ReduxInterfaces";
import {IStringObject} from "@violet/common";

function mapStateToProps(state: IState) {
    return {
        title: "פרטי ההרצאות",
        elements: getLecturesDetails(state),
        onEditButton: () => {},
        tableHeaders: [
            {date: "תאריך"},
            {topic: "נושא"},
            {participantsCount: "מספר משתתפים"},
            {price: "מחיר ללקוח"},
            {income: "הכנסות"},
        ] as IStringObject[],
    };
}

export default connect(mapStateToProps)(CustomPaperTable);
