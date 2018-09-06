import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../../store/Labels/Reducer";
import InvoicePrintSection from "./InvoicePrint";

function mapStateToProps(state) {
    return {
        sectionName: getLabels(state).pages.orderPage.sections.invoice.sectionName,
    };
}

export default connect(mapStateToProps)(InvoicePrintSection);