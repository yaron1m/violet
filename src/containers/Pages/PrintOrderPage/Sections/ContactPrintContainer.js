import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../../store/labels/reducer";
import ContactsPrintSection from "./ContactPrint";

function mapStateToProps(state) {
    return {
        sectionName: getLabels(state).pages.orderPage.sections.contacts.sectionName,
    };
}

export default connect(mapStateToProps)(ContactsPrintSection);
