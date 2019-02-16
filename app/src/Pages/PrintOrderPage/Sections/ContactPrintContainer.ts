import {connect} from 'react-redux';
import {getOrderSectionsLabels} from '../../../Store/Labels/Selectors';
import ContactsPrintSection from './ContactPrint';
import {IState} from '../../../Interfaces/ReduxInterfaces';

function mapStateToProps(state: IState) {
    return {
        sectionName: getOrderSectionsLabels(state).contacts.sectionName,
    };
}

export default connect(mapStateToProps)(ContactsPrintSection);
