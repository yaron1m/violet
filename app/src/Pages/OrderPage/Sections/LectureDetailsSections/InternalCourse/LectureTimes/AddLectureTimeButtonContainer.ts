import {connect} from 'react-redux';
import {addNewLectureTime} from '../../../../../../Store/SelectedOrder/Actions';
import {getOrderSectionsLabels} from '../../../../../../Store/Labels/Selectors';
import {CustomRaisedButton} from '../../../../../../Components/CustomComponents/CustomButtons';
import {IDispatch, IState} from '../../../../../../Interfaces/ReduxInterfaces';

function mapStateToProps(state: IState) {
    return {
        label: getOrderSectionsLabels(state).lectureTimes.addRow,
        style: {
            marginBottom: 10
        }
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onClick: () => dispatch(addNewLectureTime())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomRaisedButton);
