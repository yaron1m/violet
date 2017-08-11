import React from 'react';
import CustomPaper from "../../../../components/custom-components/custom-paper";
import CustomText from "../../../../../components/custom-components/custom-text-field";
import LectureTimesTable from './lecture-times-table';
import CustomToggle, {CustomCheckbox, CustomToggleBox} from "../../../../../components/custom-components/custom-toggle";
import {connect} from 'react-redux';
import {updateSelectedOrder} from "../../../../../store/selected/actions";
import {getLabels} from "../../../../../store/labels/reducer";
import {getSelectedOrder} from "../../../../../store/selected/reducer";
import {getRequiredFields} from "../../../../../store/required-fields/reducer";

class LectureDetailsSection extends React.Component {

    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selectedOrder,
            requiredFields: this.props.requiredFields,
            updateAction: function (key, value) {
                this.props.dispatch(updateSelectedOrder(key, value));
            }.bind(this)
        };

        return (
            <CustomPaper
                title={this.props.labels.sectionName}
                isOpen={true}
            >

                <div>
                    <CustomText data={fieldData} name="location"/>
                    <CustomText data={fieldData} name="floor" size="M"/>
                    <CustomText data={fieldData} name="room"/>
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
                    <CustomCheckbox data={fieldData} name="cancelled"/>
                </CustomToggleBox>

                {this.props.selectedOrder.cancelled ? (
                    <CustomText data={fieldData} name="cancellationReason" fullWidth={true}/> ) : null}

                <LectureTimesTable/>

            </CustomPaper>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).orderPage.lectureDetailsSection,
        selectedOrder: getSelectedOrder(state),
        requiredFields: getRequiredFields(state),
    };
}

export default connect(mapStateToProps)(LectureDetailsSection);
