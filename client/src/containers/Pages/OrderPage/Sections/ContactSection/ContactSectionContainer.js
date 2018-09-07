import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/Labels/Selectors";
import ContactsSection from "./ContactSection";

function mapStateToProps(state) {
    return {
        sectionName: getLabels(state).pages.orderPage.sections.contacts.sectionName,
    };
}

export default connect(mapStateToProps)(ContactsSection);
