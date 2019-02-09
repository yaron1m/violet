import connect from "react-redux/es/connect/connect";
import {getOrderSectionsLabels} from "../../../Store/Labels/Selectors";
import InvoicePrintSection from "./InvoicePrint";

function mapStateToProps(state) {
    return {
        sectionName: getOrderSectionsLabels(state).invoice.sectionName,
    };
}

export default connect(mapStateToProps)(InvoicePrintSection);