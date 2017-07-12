import React from 'react';
import CustomCard from "../../../components/formFields/custom-card";
import {CustomText} from "../../../components/custom-components/custom-text-field";
import {CustomToggle, CustomToggleBox} from "../../../components/formFields/custom-toggle";
import LectureTimes from "../elements/lecture-times-container";
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {addLectureTime} from "../../../actions/action-lecture-times";

class LectureDetailsSection extends React.Component {
    addButtonClick() {
        this.props.dispatch(addLectureTime(this.props.lectureTimes.array.length));
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
            }
        };

        const fieldData = {
            titles: this.props.labels.titles,
            values: {}
        };

        return (
            <CustomCard
                title={this.props.labels.sectionName}
                isOpen={true}
            >

                <LectureTimes/>

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
        labels: state.softwareLabels.orderForm.lectureDetailsSection,
        lectureTimes: state.lectureTimes
    };
}
export default connect(mapStateToProps)(LectureDetailsSection);
