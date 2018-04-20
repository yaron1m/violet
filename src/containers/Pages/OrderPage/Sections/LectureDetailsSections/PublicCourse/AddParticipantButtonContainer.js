import {connect} from 'react-redux';
import {getLabels} from "../../../../../../store/labels/reducer";
import {updateSelectedOrder} from "../../../../../../store/selected/actions";
import {RaisedButton} from "material-ui";
import * as _ from "lodash";
import * as Immutable from "seamless-immutable";
import {getSelectedOrder} from "../../../../../../store/selected/reducer";

function addNewParticipant(selectedOrder, updateSelectedOrder) {
    let thisSelectedOrder = Immutable.asMutable(selectedOrder, {deep: true});
    let publicCourseParticipants = _.hasIn(thisSelectedOrder, 'publicCourseParticipants') ? thisSelectedOrder.publicCourseParticipants : [];
    publicCourseParticipants.push({});

    updateSelectedOrder("publicCourseParticipants", publicCourseParticipants);
}

function mapStateToProps(state) {
    return {
        label: getLabels(state).pages.orderPage.sections.publicCourse.addParticipant,
        selectedOrder: getSelectedOrder(state),
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
        style: {
            marginTop: 10,
            marginBottom: 15,
        },
        onClick: () => addNewParticipant(stateProps.selectedOrder, dispatchProps.updateSelectedOrder)
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(RaisedButton);

