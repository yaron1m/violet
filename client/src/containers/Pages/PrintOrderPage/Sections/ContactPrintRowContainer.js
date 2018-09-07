import PropTypes from 'prop-types';
import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../../store/Labels/Selectors";
import ContactsPrintRow from "./ContactPrintRow";

function mapStateToProps(state, ownProps) {
    return {
        financialContactTitle: getLabels(state).pages.orderPage.sections.payment.financialContactTitle,
        isFinancial: ownProps.isFinancial
    };
}

const Container = connect(mapStateToProps)(ContactsPrintRow);

Container.propTypes = {
    isFinancial: PropTypes.bool.isRequired
};

export default Container;