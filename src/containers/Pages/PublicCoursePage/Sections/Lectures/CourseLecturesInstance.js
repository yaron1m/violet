import React from 'react';
import {flexStyle} from "../../../../../components/custom-components/custom-paper";
import PropTypes from "prop-types";
import {
    PublicCourseLectureConnectedAutoComplete, PublicCourseLectureConnectedCheckBox,
    PublicCourseLectureConnectedDatePicker,
    PublicCourseLectureConnectedText
} from "../ConnectedCustomComponents/PublicCourseLectureConnectedFields";
import Sizes from "../../../../../util/consts/sizes";
import {Divider} from "material-ui";

export default class CourseLecturesInstance extends React.Component {

    render() {
        const index = this.props.lectureId;
        return (
            <div>
                <div style={flexStyle}>
                    <PublicCourseLectureConnectedDatePicker lectureId={index} name="date"/>
                    <PublicCourseLectureConnectedText lectureId={index} name="startTime" size={Sizes.M}/>
                    <PublicCourseLectureConnectedText lectureId={index} name="endTime" size={Sizes.M}/>
                    <PublicCourseLectureConnectedText lectureId={index} name="duration" size={Sizes.S}/>
                    <PublicCourseLectureConnectedAutoComplete lectureId={index} name="topic"
                                                              dataSource={this.props.offeredLectures} size={Sizes.XXL}/>
                    <PublicCourseLectureConnectedText lectureId={index} name="tie" size={Sizes.M}/>
                    <PublicCourseLectureConnectedText lectureId={index} name="price" size={Sizes.M}/>
                    <PublicCourseLectureConnectedText lectureId={index} name="roomCost" size={Sizes.M}/>
                    <PublicCourseLectureConnectedText lectureId={index} name="pages" size={Sizes.M}/>
                    <PublicCourseLectureConnectedCheckBox lectureId={index} name="active"/>


                    <PublicCourseLectureConnectedCheckBox lectureId={index} name="guestLecturer"/>
                    {
                        this.props.showGuestLecturerDetails ?
                            <span>
                                 <PublicCourseLectureConnectedText lectureId={index} name="guestLecturerName"
                                                                   size={Sizes.M}/>
                                 <PublicCourseLectureConnectedText lectureId={index} name="guestLecturerCost"
                                                                   size={Sizes.L}/>

                             </span>
                            : null

                    }

                </div>
                <Divider style={{marginTop: 10, marginBottom: 10}}/>
            </div>
        );
    }
}

CourseLecturesInstance.propTypes = {
    lectureId: PropTypes.number.isRequired,
    offeredLectures: PropTypes.array,
    showGuestLecturerDetails: PropTypes.bool,
};
