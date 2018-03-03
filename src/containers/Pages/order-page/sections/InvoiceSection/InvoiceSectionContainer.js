import {connect} from 'react-redux';
import {getSelectedOrder} from "../../../../../store/selected/reducer";
import {getRequiredFields} from "../../../../../store/required-fields/reducer";
import {updateSelectedOrder} from "../../../../../store/selected/actions";
import {getLabels} from "../../../../../store/labels/reducer";
import InvoiceSection from "./InvoiceSection";

function mapStateToProps(state) {
    return {
        sectionName: getLabels(state).pages.orderPage.sections.invoice.sectionName,
        titles: getLabels(state).pages.orderPage.sections.invoice.titles,
        values: getSelectedOrder(state),
        requiredFields: getRequiredFields(state).order,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateAction: (key, value) => dispatch(updateSelectedOrder(key, value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceSection);

