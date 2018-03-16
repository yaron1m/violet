import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../../store/labels/reducer";
import OrganizationPrintSection from "./OrganizationPrint";

function mapStateToProps(state) {
    return {
        sectionName: getLabels(state).pages.orderPage.sections.organization.sectionName,
    };
}

export default connect(mapStateToProps)(OrganizationPrintSection);