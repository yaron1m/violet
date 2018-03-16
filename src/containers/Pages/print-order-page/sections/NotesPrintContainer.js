import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../../store/labels/reducer";
import NotesPrintSection from "./NotesPrint";


function mapStateToProps(state) {
    return {
        sectionName: getLabels(state).pages.orderPage.sections.notes.sectionName,
    };
}

export default connect(mapStateToProps)(NotesPrintSection);