import React from 'react';
import CustomPaper, {flexStyle} from "../../../../../../components/custom-components/custom-paper";
import {
    PublicCourseParticipantsCustomCheckBox,
    PublicCourseParticipantsCustomText
} from "../../ConnectedCustomComponents/PublicCourseParticipantsCustomFields";
import Sizes from "../../../../../../util/consts/sizes";
import _ from 'lodash';

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
                    <PublicCourseParticipantsCustomText participantIndex={this.props.participantId} name="participantCost"/>
                </div>
                <div>
                    {_.map(_.orderBy(this.props.selectedPublicCourseLectures, x => x.date),
                        lecture => {
                        const key = "attendingLecture" + lecture.id;
                        return (
                            <PublicCourseParticipantsCustomCheckBox
                                key={key}
                                participantIndex={this.props.participantId}
                                name={"attendingLecture" + lecture.id}
                                titles={{[key]:  new Date(lecture.date).toLocaleDateString() + " - " + lecture.topic}}
                            />
                        )
                    })}
                </div>
            </CustomPaper>
        );
    }
}
