import {connect} from 'react-redux';
import {getOrderSectionsLabels} from '../../../Store/Labels/Selectors';
import {getSelectedOrderStatusLabel} from '../../../Store/Labels/Selectors';
import LectureDetailsPrintSection from './LectureDetails';
import {IState} from '../../../Interfaces/ReduxInterfaces';

function mapStateToProps(state: IState) {
    return {
        sectionName: getOrderSectionsLabels(state).lectureDetails.sectionName,
        statusLabel: getSelectedOrderStatusLabel(state),
    };
}

export default connect(mapStateToProps)(LectureDetailsPrintSection);