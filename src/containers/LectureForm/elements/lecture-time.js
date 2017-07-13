import React from 'react';
import {CustomText, CustomDatePicker, CustomAutoComplete} from "../../../components/custom-components/custom-text-field";
import FlatButton from 'material-ui/FlatButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {connect} from 'react-redux';
import {removeLectureTime} from "../../../actions/action-lecture-times";
import {grey100} from "material-ui/styles/colors";

class LectureTime extends React.Component {

    removeThisLecture() {
        this.props.dispatch(removeLectureTime(this.props.index));
    }

    render() {
        const styles = {
            flex: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-end",
            },
            removeButton: {
                verticalAlign: "bottom",
                minWidth: 40,
                marginRight: 5,
                marginBottom: 5,
            },
            removeIcon: {
                verticalAlign: "middle",
            }
        };

        const lecturesOffered = this.props.offeredLectures.map((lecture) => {
            //if(lecture.isActive) {
            return lecture.name;
            //}
        });

        const fieldData = {
            titles: this.props.labels.titles,
            values: {}
        };

        return (
            <div style={styles.flex} key={this.props.index}>
                <FlatButton
                    onTouchTap={this.removeThisLecture.bind(this)}
                    style={styles.removeButton}
                    backgroundColor={grey100}
                >
                    <ContentRemove
                        style={styles.removeIcon}
                    />
                </FlatButton>

                <CustomDatePicker data={fieldData} name="date"/>
                <CustomText data={fieldData} name="startTime" size="M"/>
                <CustomText data={fieldData} name="endTime" size="M"/>
                <CustomText data={fieldData} name="length" size="M"/>

                <CustomAutoComplete data={fieldData} name="topic" dataSource={lecturesOffered}/>

                <CustomText data={fieldData} name="audienceSize" size="M"/>
                <CustomText data={fieldData} name="shirtColor" size="M"/>
                <CustomText data={fieldData} name="tie" size="M"/>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        labels: state.softwareLabels.orderPage.lectureDetailsSection.lectureTimesSection,
        offeredLectures: state.offeredLectures,
        index: ownProps.index,
    };
}

export default connect(mapStateToProps)(LectureTime);
