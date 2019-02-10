import {connect} from 'react-redux';
import {getOrderSectionsLabels} from "../../../../Store/Labels/Selectors";
import InvoiceSection from "./InvoiceSection";
import {IState} from '../../../../Interfaces/ReduxInterfaces';

function mapStateToProps(state: IState) {
    return {
        sectionName: getOrderSectionsLabels(state).invoice.sectionName,
    };
}

export default connect(mapStateToProps)(InvoiceSection);
