import React from 'react';
import CustomCard from "../../../components/custom-components/custom-card";
import {CustomText} from "../../../components/custom-components/custom-text-field";
import {CustomToggle, CustomToggleBox} from "../../../components/custom-components/custom-toggle";
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Paper} from "material-ui";
import CustomTable from "../../../components/custom-components/custom-table";
import {sendSelectedOrder} from "../../../actions/action-selected";
import {sendInformation} from "../../../actions/action-database";

class LectureDetailsSection extends React.Component {
    addButtonClick() {
        this.props.dispatch(sendInformation("/orders/" + this.props.selected.order.id, this.props.selected.order));
        //TODO
    }

    render() {
        const styles = {
            addButton: {
                verticalAlign: "bottom",
                minWidth: 40,
                marginRight: 5,
                marginBottom: 5,
            },
            addIcon: {
                verticalAlign: "middle",
            },
        };

        // //Filter offered lectures
        // const lecturesObj = this.props.offeredLectures;
        // const allLectures = Object.keys(lecturesObj);
        // const filteredLectures = allLectures.filter((lecture) => (lecturesObj[lecture]));

        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selected.order,
            updateAction: sendSelectedOrder,
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
                    <RaisedButton
                        onTouchTap={this.addButtonClick.bind(this)}
                        style={styles.addButton}
                    >
                        <ContentAdd
                            style={styles.addIcon}
                        />
                    </RaisedButton>

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
