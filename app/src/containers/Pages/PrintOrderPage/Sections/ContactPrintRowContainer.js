import PropTypes from 'prop-types';
import connect from "react-redux/es/connect/connect";
import {getOrderSectionsLabels} from "../../../../store/Labels/Selectors";
import ContactsPrintRow from "./ContactPrintRow";

function mapStateToProps(state, ownProps) {
    return {
        financialContactTitle: getOrderSectionsLabels(state).payment.financialContactTitle,
        isFinancial: ownProps.isFinancial
    };
}

const Container = connect(mapStateToProps)(ContactsPrintRow);

Container.propTypes = {
    isFinancial: PropTypes.bool.isRequired
};

export default Container;