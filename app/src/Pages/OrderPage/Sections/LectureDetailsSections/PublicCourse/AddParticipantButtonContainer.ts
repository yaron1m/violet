import {connect} from 'react-redux';
import {getOrderSectionsLabels} from '../../../../../Store/Labels/Selectors';
import {updateSelectedOrder} from '../../../../../Store/SelectedOrder/Actions';
import * as _ from 'lodash';
import {getSelectedOrder} from '../../../../../Store/SelectedOrder/Selectors';
import {CustomRaisedButton} from '../../../../../Components/CustomComponents/CustomButtons';
import {IDispatch, IState} from '../../../../../Interfaces/ReduxInterfaces';
import IOrder, {IPublicCourseParticipant} from '../../../../../Interfaces/IOrder';

export function addNewParticipant(selectedOrder: IOrder, updateSelectedOrder: (key: string, value: any) => void) {
    const publicCourseParticipants = _.hasIn(selectedOrder, 'publicCourseParticipants') ? selectedOrder.publicCourseParticipants : [];
    publicCourseParticipants.push({} as IPublicCourseParticipant);

    updateSelectedOrder('publicCourseParticipants', publicCourseParticipants);
}

function mapStateToProps(state: IState) {
    return {
        label: getOrderSectionsLabels(state).publicCourse.addParticipant as string,
        selectedOrder: getSelectedOrder(state),
        disabled: !getSelectedOrder(state).publicCourseId,
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        updateSelectedOrder: (key: string, value: any) => dispatch(updateSelectedOrder(key, value)),
    };
}

function mergeProps(stateProps: {
    label: string; selectedOrder: IOrder; disabled: boolean;
}, dispatchProps: {
    updateSelectedOrder: (key: string, value: any) => void
}) {
    return {
        label: stateProps.label,
        disabled: stateProps.disabled,
        style: {
            marginTop: 10,
            marginBottom: 15,
            marginRight: 20,
        },
        onClick: () => addNewParticipant(stateProps.selectedOrder, dispatchProps.updateSelectedOrder)
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomRaisedButton);
