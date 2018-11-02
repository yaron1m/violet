import {connect} from 'react-redux';
import {getOrderSectionsLabels} from "../../../../../store/Labels/Selectors";
import NotesSection from "./NotesSection";

function mapStateToProps(state) {
    return {
        sectionName: getOrderSectionsLabels(state).notes.sectionName,
    };
}

export default connect(mapStateToProps)(NotesSection);