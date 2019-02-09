import connect from "react-redux/es/connect/connect";
import {getOrderSectionsLabels} from "../../../../Store/Labels/Selectors";
import OrganizationPrintSection from "./OrganizationPrint";

function mapStateToProps(state) {
    return {
        sectionName: getOrderSectionsLabels(state).organization.sectionName,
    };
}

export default connect(mapStateToProps)(OrganizationPrintSection);