import React from 'react';
import {connect} from 'react-redux';
import IconButton from "material-ui/IconButton";
import {updateSelectedOrder} from "../../../../../store/selected/actions";
import {getSelectedOrder} from "../../../../../store/selected/reducer";
import * as Immutable from "seamless-immutable";
import AddIcon from 'material-ui/svg-icons/content/add';
import * as _ from "lodash";

class AddLectureTimeButton extends React.Component {
    render() {
        return (
            <IconButton
                onClick={() => {
                    let selectedOrder = Immutable.asMutable(this.props.selectedOrder, {deep: true});
                    let newLectureTimeIndex = 0;
                    let lectureTimes;
                    if (_.hasIn(selectedOrder, 'lectureTimes')) {
                        lectureTimes = selectedOrder.lectureTimes;
                        if (selectedOrder.lectureTimes !== null && !_.isEmpty(lectureTimes))
                            newLectureTimeIndex = _.maxBy(lectureTimes, time => time.id).id + 1;
                    } else {
                        lectureTimes = [];
                    }
                    lectureTimes[newLectureTimeIndex] = {id: newLectureTimeIndex};
                    this.props.dispatch(updateSelectedOrder("lectureTimes", lectureTimes));
                }}
            >
                <AddIcon/>
            </IconButton>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedOrder: getSelectedOrder(state),
    };
}

export default connect(mapStateToProps)(AddLectureTimeButton);
