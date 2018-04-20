import React from 'react';
import CustomPaper, {flexStyle} from "../../../../../../components/custom-components/custom-paper";
import {
    PublicCourseParticipantsCustomCheckBox,
    PublicCourseParticipantsCustomText
} from "../../ConnectedCustomComponents/PublicCourseParticipantsCustomFields";

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
                    <PublicCourseParticipantsCustomText participantIndex={this.props.participantId}
                                                        name="participantEnglishLastName"/>
                    <PublicCourseParticipantsCustomText participantIndex={this.props.participantId} name="idNumber"/>
                    <PublicCourseParticipantsCustomText participantIndex={this.props.participantId} name="phone"/>
                    <PublicCourseParticipantsCustomText participantIndex={this.props.participantId} name="email"/>
                    <PublicCourseParticipantsCustomText participantIndex={this.props.participantId} name="job"/>
                    <PublicCourseParticipantsCustomCheckBox participantIndex={this.props.participantId}
                                                            name="isqMember"/>
                </div>
            </CustomPaper>
        );
    }
}
