import React from 'react';
import _ from 'lodash';
import CustomPaper from "../../../../../../components/custom-components/custom-paper";
import AddParticipantButtonContainer from "./AddParticipantButtonContainer";
import PublicCourseParticipantContainer from "./PublicCourseParticipantContainer";
import CourseSelectorContainer from "./CourseSelectorContainer";

export default class LectureDetailsSection extends React.Component {

    render() {
        return (
            <CustomPaper
                title={this.props.sectionName}
            >
                <CourseSelectorContainer/>

                <AddParticipantButtonContainer/>

                {_.map(_.range(this.props.numberOfParticipants), (participantId) =>
                    <PublicCourseParticipantContainer key={participantId} participantId={participantId}/>)}
            </CustomPaper>
        );
    }
}
