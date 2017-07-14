import React from 'react';
import CustomCard from "../../../components/custom-components/custom-card";
import {CustomText} from "../../../components/custom-components/custom-text-field";
import {CustomToggle, CustomToggleBox} from "../../../components/custom-components/custom-toggle";
import {connect} from 'react-redux';
import {Paper} from "material-ui";
import CustomTable from "../../../components/custom-components/custom-table";
import {updateValueInSelectedOrder} from "../../../actions/action-selected";

class LectureDetailsSection extends React.Component {

    render() {

        // //Filter offered lectures
        // const lecturesObj = this.props.offeredLectures;
        // const allLectures = Object.keys(lecturesObj);
        // const filteredLectures = allLectures.filter((lecture) => (lecturesObj[lecture]));

        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selected.order,
            updateAction: updateValueInSelectedOrder,
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
                        data={this.props.selected.order.lectureTimes}
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
                    <CustomToggle title={this.props.labels.titles.projector}/>
                    <CustomToggle title={this.props.labels.titles.soundSystem}/>
                    <CustomToggle title={this.props.labels.titles.microphone}/>
                    <CustomToggle title={this.props.labels.titles.parking}/>
                    <CustomToggle title={this.props.labels.titles.orderApproved}/>
                    <CustomToggle title={this.props.labels.titles.sameAudience}/>
                </CustomToggleBox>

            </CustomCard>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.orderPage.lectureDetailsSection,
        lectureTimes: state.lectureTimes,
        selected: state.selected,
    };
}
export default connect(mapStateToProps)(LectureDetailsSection);
