import connect from "react-redux/es/connect/connect";
import {getOrderSectionsLabels} from "../../../../store/Labels/Selectors";
import NotesPrintSection from "./NotesPrint";


function mapStateToProps(state) {
    return {
        sectionName: getOrderSectionsLabels(state).notes.sectionName,
    };
}

export default connect(mapStateToProps)(NotesPrintSection);