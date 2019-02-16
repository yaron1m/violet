import {connect} from 'react-redux';
import {getOrderSectionsLabels} from '../../../Store/Labels/Selectors';
import ContactsPrintRow from './ContactPrintRow';
import {IState} from '../../../Interfaces/ReduxInterfaces';

function mapStateToProps(state: IState, ownProps: { isFinancial: boolean }) {
    return {
        financialContactTitle: getOrderSectionsLabels(state).payment.financialContactTitle,
        isFinancial: ownProps.isFinancial
    };
}

export default connect(mapStateToProps)(ContactsPrintRow);