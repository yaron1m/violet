import React from 'react';
import CustomPaper from "../../../../../../components/custom-components/custom-paper";
import {PublicCourseParticipantsCustomText} from "../../ConnectedCustomComponents/PublicCourseParticipantsCustomFields";

export default class LectureDetailsSection extends React.Component {

    render() {
        return (
            <CustomPaper
                title={this.props.sectionName}
            >
                <PublicCourseParticipantsCustomText participantIndex={this.props.participantId} name="participantName"/>

            </CustomPaper>
        );
    }
}
