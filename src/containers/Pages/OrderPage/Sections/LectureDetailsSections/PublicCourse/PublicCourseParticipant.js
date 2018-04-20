import React from 'react';
import CustomPaper, {flexStyle} from "../../../../../../components/custom-components/custom-paper";
import {
    PublicCourseParticipantsCustomCheckBox,
    PublicCourseParticipantsCustomText
} from "../../ConnectedCustomComponents/PublicCourseParticipantsCustomFields";
import Sizes from "../../../../../../util/consts/sizes";

export default class LectureDetailsSection extends React.Component {

    render() {
        return (
            <CustomPaper
                title={this.props.sectionName}
            >
                <div style={flexStyle}>
                    <PublicCourseParticipantsCustomText participantIndex={this.props.participantId}
                                                        name="participantFirstName"/>
                    <PublicCourseParticipantsCustomText participantIndex={this.props.participantId}
                                                        name="participantLastName"/>
                    <PublicCourseParticipantsCustomText participantIndex={this.props.participantId}
                                                        name="participantEnglishFirstName"/>
                    <PublicCourseParticipantsCustomText participantIndex={this.props.participantId}
                                                        name="participantEnglishLastName"/>
                    <PublicCourseParticipantsCustomText participantIndex={this.props.participantId} name="idNumber"/>
                    <PublicCourseParticipantsCustomText participantIndex={this.props.participantId} name="phone"/>
                    <PublicCourseParticipantsCustomText participantIndex={this.props.participantId} name="job"/>
                    <PublicCourseParticipantsCustomText participantIndex={this.props.participantId} name="email"
                                                        size={Sizes.XL}/>
                    <PublicCourseParticipantsCustomCheckBox participantIndex={this.props.participantId}
                                                            name="isqMember"/>
                </div>
            </CustomPaper>
        );
    }
}
