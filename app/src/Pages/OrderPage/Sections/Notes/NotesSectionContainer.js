import {connect} from 'react-redux';
import {getOrderSectionsLabels} from "../../../../Store/Labels/Selectors";
import NotesSection from "./NotesSection";

function mapStateToProps(state: IState) {
    return {
        sectionName: getOrderSectionsLabels(state).notes.sectionName,
    };
}

export default connect(mapStateToProps)(NotesSection);