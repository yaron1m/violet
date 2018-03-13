import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/labels/reducer";
import NotesSection from "./NotesSection";

function mapStateToProps(state) {
    return {
        sectionName: getLabels(state).pages.orderPage.sections.notes.sectionName,
    };
}

export default connect(mapStateToProps)(NotesSection);