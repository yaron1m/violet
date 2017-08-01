import React from 'react';
import CustomCard from "../../../../components/custom-components/custom-card";
import {CustomText} from "../../../../components/custom-components/custom-text-field";
import CustomToggle, {CustomToggleBox} from "../../../../components/custom-components/custom-toggle";
import {connect} from 'react-redux';
import Paper from "material-ui/Paper";
import CustomTable from "../../../../components/custom-components/custom-table";
import {updateSelectedOrder} from "../../../../store/selected/actions";
import {getLabels} from "../../../../store/labels/reducer";
import {getSelectedOrder} from "../../../../store/selected/reducer";

class LectureDetailsSection extends React.Component {

    render() {

        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selectedOrder,
            updateAction: updateSelectedOrder,
            dispatch: this.props.dispatch,
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
                    />
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
