import React from 'react';
import {flexStyle} from "../../../../../../components/CustomComponents/CustomPaper";
import PropTypes from "prop-types";
import {
    PublicCourseLectureConnectedAutoComplete, PublicCourseLectureConnectedCheckBox,
    PublicCourseLectureConnectedDatePicker,
    PublicCourseLectureConnectedText
} from "../../ConnectedCustomComponents/PublicCourseLectureConnectedFields";
import Sizes from "../../../../../../util/consts/sizes";
import {Avatar, Divider} from "material-ui";
import GuestLecturerFieldsContainer from "./GuestLecturerFieldsContainer";

export default class CourseLecturesInstance extends React.Component {

    render() {
        const index = this.props.lectureId;
        return (
            <div>
                <div style={flexStyle}>
                    <Avatar
                        disabled={false}
                        style={{
                            marginBottom: 15,
                            marginRight: 15,
                        }}
                    >
                        {this.props.index}
                    </Avatar>

                    <PublicCourseLectureConnectedDatePicker lectureId={index} name="date" size={Sizes.M}/>
                    <PublicCourseLectureConnectedAutoComplete lectureId={index} name="topic"
                                                              dataSource={this.props.offeredLectures} size={Sizes.XXL}/>
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
                <Divider style={{marginTop: 10, marginBottom: 10}}/>
            </div>
        );
    }
}

CourseLecturesInstance.propTypes = {
    lectureId: PropTypes.string.isRequired,
    offeredLectures: PropTypes.array,
    index: PropTypes.number.isRequired,
};
