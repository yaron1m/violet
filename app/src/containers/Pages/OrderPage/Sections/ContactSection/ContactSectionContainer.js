import {connect} from 'react-redux';
import {getOrderSectionsLabels} from "../../../../../store/Labels/Selectors";
import ContactsSection from "./ContactSection";

function mapStateToProps(state) {
    return {
        sectionName: getOrderSectionsLabels(state).contacts.sectionName,
    };
}

export default connect(mapStateToProps)(ContactsSection);