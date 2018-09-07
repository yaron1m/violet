import connect from "react-redux/es/connect/connect";
import {getOrderSectionsLabels} from "../../../../store/Labels/Selectors";
import ContactsPrintSection from "./ContactPrint";

function mapStateToProps(state) {
    return {
        sectionName: getOrderSectionsLabels(state).contacts.sectionName,
    };
}

export default connect(mapStateToProps)(ContactsPrintSection);
