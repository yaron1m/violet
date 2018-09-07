import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/Labels/Selectors";
import InvoiceSection from "./InvoiceSection";

function mapStateToProps(state) {
    return {
        sectionName: getLabels(state).pages.orderPage.sections.invoice.sectionName,
    };
}

export default connect(mapStateToProps)(InvoiceSection);

