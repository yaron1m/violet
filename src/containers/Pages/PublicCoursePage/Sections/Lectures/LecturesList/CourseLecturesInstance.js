import React from 'react';
import {flexStyle} from "../../../../../../components/custom-components/custom-paper";
import PropTypes from "prop-types";
import {
    PublicCourseLectureConnectedAutoComplete, PublicCourseLectureConnectedCheckBox,
    PublicCourseLectureConnectedDatePicker,
    PublicCourseLectureConnectedText
} from "../../ConnectedCustomComponents/PublicCourseLectureConnectedFields";
import Sizes from "../../../../../../util/consts/sizes";
import {Avatar, Divider, IconButton} from "material-ui";
import GuestLecturerFieldsContainer from "./GuestLecturerFieldsContainer";
import DeleteIcon from 'material-ui-icons/Delete';

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
                <div style={flexStyle}>
                    <IconButton
                        onClick={this.props.onDelete}
                        style={{marginRight: 10}}
                        tooltip={this.props.deleteTooltip}
                    >
                        <DeleteIcon/>
                    </IconButton>

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
    deleteTooltip: PropTypes.string,
    offeredLectures: PropTypes.array,
    onDelete: PropTypes.func.isRequired,
};
