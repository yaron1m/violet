import {connect} from "react-redux";
import {getOrderSectionsLabels} from "../../../Store/Labels/Selectors";
import ContactsPrintSection from "./PaymentPrint";
import {IState} from "../../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        sectionName: getOrderSectionsLabels(state).payment.sectionName,
    };
}

export default connect(mapStateToProps)(ContactsPrintSection);