import React from 'react';
import CustomCard from "../../../components/formFields/custom-card";
import CustomTextField from "../../../components/formFields/custom-text-field";
import {CustomToggle, CustomToggleBox} from "../../../components/formFields/custom-toggle";
import LectureTimes from "../elements/lecture-times-container";
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {addLectureTime} from "../../../actions";

class LectureDetailsSection extends React.Component {
    addButtonClick() {
        this.props.dispatch(addLectureTime(this.props.lectureTimes.array.length));
    }

    render() {
        const styles = {
            addButton: {
                verticalAlign: "bottom",
                minWidth: 40,
                marginLeft: 5,
                marginBottom: 5,
            },
            addIcon: {
                verticalAlign: "middle",
            }
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

                    <CustomTextField title={this.props.labels.fields.location}/>
                    <CustomTextField title={this.props.labels.fields.floor} size="S"/>
                    <CustomTextField title={this.props.labels.fields.room}/>
                    <CustomTextField title={this.props.labels.fields.audienceType}/>
                    <CustomTextField title={this.props.labels.fields.daySchedule}/>
                </div>

                <CustomToggleBox>
                    <CustomToggle title={this.props.labels.fields.projector}/>
                    <CustomToggle title={this.props.labels.fields.soundSystem}/>
                    <CustomToggle title={this.props.labels.fields.microphone}/>
                    <CustomToggle title={this.props.labels.fields.parking}/>
                    <CustomToggle title={this.props.labels.fields.orderApproved}/>
                    <CustomToggle title={this.props.labels.fields.sameAudience}/>
                </CustomToggleBox>

            </CustomCard>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.lectureForm.lectureDetailsSection,
        lectureTimes: state.lectureTimes
    };
}
export default connect(mapStateToProps)(LectureDetailsSection);
