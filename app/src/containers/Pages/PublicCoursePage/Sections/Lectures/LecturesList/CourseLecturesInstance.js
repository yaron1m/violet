import React from 'react';
import {flexStyle} from "../../../../../../components/CustomComponents/CustomPaper";
import PropTypes from "prop-types";
import {
    PublicCourseLectureConnectedAutoComplete, PublicCourseLectureConnectedCheckBox,
    PublicCourseLectureConnectedDatePicker,
    PublicCourseLectureConnectedText
} from "../../ConnectedCustomComponents/PublicCourseLectureConnectedFields";
import {Sizes} from "../../../../../../util/Constants/Sizes";
import GuestLecturerFieldsContainer from "./GuestLecturerFieldsContainer";
import CustomDivider from "../../../../../../components/CustomComponents/CustomDivider";
import IndexAvatar from "../../../../../../components/IndexAvatar";

export default class CourseLecturesInstance extends React.Component {

    render() {
        const index = this.props.lectureId;
        return (
            <div>
                <div style={flexStyle}>
                    <IndexAvatar
                        index={this.props.index}
                    />

                    <PublicCourseLectureConnectedDatePicker lectureId={index} name="date"/>
                    <PublicCourseLectureConnectedAutoComplete lectureId={index} name="topic"
                                                              suggestions={this.props.offeredLectures} size={Sizes.XXL}/>
                    <PublicCourseLectureConnectedText lectureId={index} name="startTime" size={Sizes.M}/>
                    <PublicCourseLectureConnectedText lectureId={index} name="endTime" size={Sizes.M}/>
                    <PublicCourseLectureConnectedText lectureId={index} name="duration" size={Sizes.S}/>
                    <PublicCourseLectureConnectedText lectureId={index} name="tie" size={Sizes.M}/>
                </div>
                <div style={{...flexStyle, marginRight: 55}}>
                    <PublicCourseLectureConnectedText lectureId={index} name="price" size={Sizes.M}/>
                    <PublicCourseLectureConnectedText lectureId={index} name="roomCost" size={Sizes.M}/>
                    <PublicCourseLectureConnectedText lectureId={index} name="pages" size={Sizes.M}/>
                    <PublicCourseLectureConnectedCheckBox lectureId={index} name="active"/>

                    <GuestLecturerFieldsContainer lectureId={index}/>
                </div>
                <CustomDivider/>
            </div>
        );
    }
}

CourseLecturesInstance.propTypes = {
    lectureId: PropTypes.string.isRequired,
    offeredLectures: PropTypes.array,
    index: PropTypes.number.isRequired,
};
