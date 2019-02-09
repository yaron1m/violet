import {connect} from "react-redux";
import {getOrderSectionsLabels} from "../../../Store/Labels/Selectors";
import InvoicePrintSection from "./InvoicePrint";
import {IState} from "../../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        sectionName: getOrderSectionsLabels(state).invoice.sectionName,
    };
}

export default connect(mapStateToProps)(InvoicePrintSection);