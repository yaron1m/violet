import {connect} from "react-redux";
import {getOrderSectionsLabels} from "../../../../Store/Labels/Selectors";
import ContactsSection from "./ContactSection";
import {IState} from "../../../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        sectionName: getOrderSectionsLabels(state).contacts.sectionName,
    };
}

export default connect(mapStateToProps)(ContactsSection);
