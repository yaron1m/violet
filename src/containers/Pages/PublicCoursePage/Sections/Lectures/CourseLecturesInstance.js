import React from 'react';
import CustomPaper, {flexStyle} from "../../../../../components/custom-components/custom-paper";
import PropTypes from "prop-types";
import {
    PublicCourseLectureConnectedAutoComplete,
    PublicCourseLectureConnectedDatePicker,
    PublicCourseLectureConnectedText
} from "../ConnectedCustomComponents/PublicCourseLectureConnectedFields";
import Sizes from "../../../../../util/consts/sizes";

export default class CourseLecturesInstance extends React.Component {

    render() {
        const index = this.props.lectureId;
        return (
            <CustomPaper>
                <div style={flexStyle}>
                    <PublicCourseLectureConnectedDatePicker lectureId={index} name="date"/>
                    <PublicCourseLectureConnectedAutoComplete lectureId={index} name="topic" dataSource={this.props.offeredLectures} size={Sizes.XXL}/>
                    <PublicCourseLectureConnectedText lectureId={index} name="startTime" size={Sizes.M}/>
                    <PublicCourseLectureConnectedText lectureId={index} name="endTime" size={Sizes.M}/>
                    <PublicCourseLectureConnectedText lectureId={index} name="duration" size={Sizes.M}/>
                    <PublicCourseLectureConnectedText lectureId={index} name="price" size={Sizes.M}/>
                    <PublicCourseLectureConnectedText lectureId={index} name="tie" size={Sizes.M}/>
                </div>
            </CustomPaper>
        );
    }
}

CourseLecturesInstance.propTypes = {
    lectureId: PropTypes.string.isRequired,
    offeredLectures: PropTypes.array,
};
