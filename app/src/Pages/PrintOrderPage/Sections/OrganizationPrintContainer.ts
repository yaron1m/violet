import {connect} from 'react-redux';
import {getOrderSectionsLabels} from '../../../Store/Labels/Selectors';
import OrganizationPrintSection from './OrganizationPrint';
import {IState} from '../../../Interfaces/ReduxInterfaces';

function mapStateToProps(state: IState) {
    return {
        sectionName: getOrderSectionsLabels(state).organization.sectionName,
    };
}

export default connect(mapStateToProps)(OrganizationPrintSection);