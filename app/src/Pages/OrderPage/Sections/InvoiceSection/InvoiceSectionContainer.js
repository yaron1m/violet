import {connect} from 'react-redux';
import {getOrderSectionsLabels} from "../../../../Store/Labels/Selectors";
import InvoiceSection from "./InvoiceSection";

function mapStateToProps(state) {
    return {
        sectionName: getOrderSectionsLabels(state).invoice.sectionName,
    };
}

export default connect(mapStateToProps)(InvoiceSection);

