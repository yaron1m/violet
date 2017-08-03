import React from 'react';
import CustomCard from "../../../../components/custom-components/custom-card";
import CustomText from "../../../../components/custom-components/custom-text-field";
import CustomToggle, {CustomToggleBox} from "../../../../components/custom-components/custom-toggle";
import {connect} from 'react-redux';
import Paper from "material-ui/Paper";
import CustomTable from "../../../../components/custom-components/custom-table";
import {updateSelectedOrder} from "../../../../store/selected/actions";
import {getLabels} from "../../../../store/labels/reducer";
import {getSelectedOrder} from "../../../../store/selected/reducer";
import CustomDialog from "../../../../components/custom-components/custom-dialog";
import CustomDatePicker from "../../../../components/custom-components/custom-date-picker";
import * as Immutable from "seamless-immutable";

class LectureDetailsSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            selectedLectureTimeIndex: null,
        };
    }

    render() {

        function editLectureTime(index) {
            this.setState(Object.assign({}, this.state, {
                dialogOpen: true,
                selectedLectureTimeIndex: index.id //TODO get index instead of object form table
            }));
        }

        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selectedOrder,
            updateAction: function (key, value) {
                this.props.dispatch(updateSelectedOrder(key, value));
            }.bind(this)
        };

        const tableFieldData = {
            titles: this.props.labels.lectureTimesSection.editDialog.titles,
            values: this.state.selectedLectureTimeIndex ?
                this.props.selectedOrder.lectureTimes[this.state.selectedLectureTimeIndex] :
                null,
            updateAction: function (key, value) {
                let lectureTimes = Immutable.asMutable(this.props.selectedOrder.lectureTimes, {deep: true});
                ;
                lectureTimes[this.state.selectedLectureTimeIndex][key] = value;

                this.props.dispatch(updateSelectedOrder("lectureTimes", lectureTimes));
            }.bind(this)
        };

        return (
            <CustomCard
                title={this.props.labels.sectionName}
                isOpen={true}
            >

                {/*lecture times table*/}
                <Paper>
                    <CustomTable
                        headers={this.props.labels.lectureTimesSection.tableHeaders}
                        data={this.props.selectedOrder.lectureTimes}
                        onEditButton={editLectureTime.bind(this)}
                    />

                    <CustomDialog
                        open={this.state.dialogOpen}
                        title={this.props.labels.lectureTimesSection.editDialog.dialogTitle}
                        onRequestClose={() =>
                            this.setState(Object.assign({}, this.state, {
                                dialogOpen: false,
                                selectedLectureTimeIndex: null,
                            }))
                        }
                    >
                        <CustomDatePicker data={tableFieldData} name="date"/>
                        <CustomText data={tableFieldData} name="startTime"/>
                        <CustomText data={tableFieldData} name="endTime"/>
                        <CustomText data={tableFieldData} name="topic"/>
                        <CustomText data={tableFieldData} name="audienceSize"/>
                        <CustomText data={tableFieldData} name="shirtColor"/>
                        <CustomText data={tableFieldData} name="tie"/>
                    </CustomDialog>

                </Paper>

                <div>
                    <CustomText data={fieldData} name="location"/>
                    <CustomText data={fieldData} name="floor" size="S"/>
                    <CustomText data={fieldData} name="room" size="M"/>
                    <CustomText data={fieldData} name="audienceType"/>
                    <CustomText data={fieldData} name="daySchedule"/>
                </div>

                <CustomToggleBox>
                    <CustomToggle data={fieldData} name="projector"/>
                    <CustomToggle data={fieldData} name="soundSystem"/>
                    <CustomToggle data={fieldData} name="microphone"/>
                    <CustomToggle data={fieldData} name="parking"/>
                    <CustomToggle data={fieldData} name="orderApproved"/>
                    <CustomToggle data={fieldData} name="sameAudience"/>
                </CustomToggleBox>

            </CustomCard>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).orderPage.lectureDetailsSection,
        selectedOrder: getSelectedOrder(state),
    };
}

export default connect(mapStateToProps)(LectureDetailsSection);
