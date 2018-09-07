import connect from "react-redux/es/connect/connect";
import {getOrderSectionsLabels} from "../../../../store/Labels/Selectors";
import ContactsPrintSection from "./PaymentPrint";

function mapStateToProps(state) {
    return {
        sectionName: getOrderSectionsLabels(state).payment.sectionName,
    };
}

export default connect(mapStateToProps)(ContactsPrintSection);