import React from 'react';
import CustomText from "../../../../../components/custom-components/custom-text-field";
import {connect} from 'react-redux';
import {updateSelectedOrder} from "../../../../../store/selected/actions";
import {getLabels} from "../../../../../store/labels/reducer";
import {getSelectedOrder} from "../../../../../store/selected/reducer";
import CustomDialog from "../../../../../components/custom-components/custom-dialog";
import CustomDatePicker from "../../../../../components/custom-components/custom-date-picker";
import * as Immutable from "seamless-immutable";
import {calculateDuration} from "../../../../../util/time-util";
import PropTypes from 'prop-types';
import CustomAutoComplete from "../../../../../components/custom-components/custom-autocomplete";
import {getOfferedLectures} from "../../../../../store/offered-lectures/reducer";

class LectureTimeEditDialog extends React.Component {

    updateLectureTime(key, value) {
        let lectureTimes = Immutable.asMutable(this.props.selectedOrder.lectureTimes, {deep: true});
        lectureTimes[this.props.selectedLectureTimeIndex][key] = value;
        this.props.dispatch(updateSelectedOrder("lectureTimes", lectureTimes));
    }


    render() {
        const tableFieldData = {
            titles: this.props.labels.titles,
            values: this.props.selectedLectureTimeIndex === null ? null :
                this.props.selectedOrder.lectureTimes[this.props.selectedLectureTimeIndex],
            updateAction: this.updateLectureTime.bind(this)
        };

        const style = {
            flex: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-end"
            }
        };


        return (
            <CustomDialog
                open={this.props.dialogOpen}
                title={this.props.labels.dialogTitle}
                onRequestClose={function () {
                    let duration = calculateDuration(this.props.selectedOrder.lectureTimes[this.props.selectedLectureTimeIndex]);
                    if (!duration)
                        duration = "";

                    this.updateLectureTime.bind(this)("duration", duration);

                    this.props.onRequestClose();
                }.bind(this)}
            >
                <div style={style.flex}>
                    <CustomDatePicker data={tableFieldData} name="date"/>
                    <CustomAutoComplete data={tableFieldData} name="topic" dataSource={this.props.offeredLectures} size="XL"/>
                    <CustomText data={tableFieldData} name="startTime"/>
                    <CustomText data={tableFieldData} name="endTime"/>
                    <CustomText data={tableFieldData} name="audienceSize"/>
                    <CustomText data={tableFieldData} name="shirtColor"/>
                    <CustomText data={tableFieldData} name="tie"/>
                </div>

            </CustomDialog>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).orderPage.lectureDetailsSection.lectureTimesSection.editDialog,
        selectedOrder: getSelectedOrder(state),
        offeredLectures: getOfferedLectures(state),
    };
}

LectureTimeEditDialog.propTypes = {
    dialogOpen: PropTypes.bool.isRequired,
    selectedLectureTimeIndex: PropTypes.number,
    onRequestClose: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(LectureTimeEditDialog);
