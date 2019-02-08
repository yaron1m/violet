import {connect} from 'react-redux';
import {getOrderSectionsLabels} from "../../../../../../store/Labels/Selectors";
import {updateSelectedOrder} from "../../../../../../store/SelectedOrder/Actions";
import * as _ from "lodash";
import * as Immutable from "seamless-immutable";
import {getSelectedOrder} from "../../../../../../store/SelectedOrder/Selectors";
import {CustomRaisedButton} from "../../../../../../Components/CustomComponents/CustomButtons";

export function addNewParticipant(selectedOrder, updateSelectedOrder) {
    const thisSelectedOrder = Immutable.asMutable(selectedOrder, {deep: true});
    const publicCourseParticipants = _.hasIn(thisSelectedOrder, 'publicCourseParticipants') ? thisSelectedOrder.publicCourseParticipants : [];
    publicCourseParticipants.push({});

    updateSelectedOrder("publicCourseParticipants", publicCourseParticipants);
}

function mapStateToProps(state) {
    return {
        label: getOrderSectionsLabels(state).publicCourse.addParticipant,
        selectedOrder: getSelectedOrder(state),
        disabled: !getSelectedOrder(state).publicCourseId,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateSelectedOrder: (key, value) => dispatch(updateSelectedOrder(key, value)),
    };
}

function mergeProps(stateProps, dispatchProps) {
    return {
        label: stateProps.label,
        disabled: stateProps.disabled,
        style: {
            marginTop: 10,
            marginBottom: 15,
            marginRight: 20,
        },
        onClick: () => addNewParticipant(stateProps.selectedOrder, dispatchProps.updateSelectedOrder)
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomRaisedButton);

