import {connect} from "react-redux";
import {getOrderSectionsLabels} from "../../../Store/Labels/Selectors";
import NotesPrintSection from "./NotesPrint";
import {IState} from "../../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        sectionName: getOrderSectionsLabels(state).notes.sectionName,
    };
}

export default connect(mapStateToProps)(NotesPrintSection);