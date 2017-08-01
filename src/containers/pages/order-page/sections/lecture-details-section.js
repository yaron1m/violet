import React from 'react';
import CustomCard from "../../../../components/custom-components/custom-card";
import CustomText from "../../../../components/custom-components/custom-text-field";
import CustomToggle, {CustomToggleBox} from "../../../../components/custom-components/custom-toggle";
import {connect} from 'react-redux';
import Paper from "material-ui/Paper";
import CustomTable from "../../../../components/custom-components/custom-table";
import {getUpdateSelectedLectureTimeAction, updateSelectedOrder} from "../../../../store/selected/actions";
import {getLabels} from "../../../../store/labels/reducer";
import {getSelectedOrder} from "../../../../store/selected/reducer";
import CustomDialog from "../../../../components/custom-components/custom-dialog";
import CustomDatePicker from "../../../../components/custom-components/custom-date-picker";

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
            this.setState(Object.assign({}, this.state,{
                dialogOpen: true,
                selectedLectureTimeIndex: index.id //TODO get index instead of object form table
            }));
        }

        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selectedOrder,
            updateAction: updateSelectedOrder,
            dispatch: this.props.dispatch,
        };

        function dialogFieldData() {
            const index = this.state.selectedLectureTimeIndex;
            if (index === null)
                return {};

            return {
                titles: this.props.labels.lectureTimesSection.editDialog.titles,
                values: this.props.selectedOrder.lectureTimes[index],
                updateAction: getUpdateSelectedLectureTimeAction(index),
                dispatch: this.props.dispatch,
            };
        }

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
                        title="hi"
                        onRequestClose={() => this.setState(Object.assign({}, this.state,{
                            dialogOpen: false,
                            selectedLectureTimeIndex: null,
                        }))}
                    >
                        <CustomDatePicker data={dialogFieldData.bind(this)()} name="date"/>
                        <CustomText data={dialogFieldData.bind(this)()} name="startTime"/>
                        <CustomText data={dialogFieldData.bind(this)()} name="endTime"/>
                        <CustomText data={dialogFieldData.bind(this)()} name="topic"/>
                        <CustomText data={dialogFieldData.bind(this)()} name="audienceSize"/>
                        <CustomText data={dialogFieldData.bind(this)()} name="shirtColor"/>
                        <CustomText data={dialogFieldData.bind(this)()} name="tie"/>
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
