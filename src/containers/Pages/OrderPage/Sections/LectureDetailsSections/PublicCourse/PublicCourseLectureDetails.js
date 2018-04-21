import React from 'react';
import _ from 'lodash';
import CustomPaper, {flexStyle} from "../../../../../../components/custom-components/custom-paper";
import AddParticipantButtonContainer from "./AddParticipantButtonContainer";
import PublicCourseParticipantContainer from "./PublicCourseParticipantContainer";
import CourseSelectorContainer from "./CourseSelectorContainer";
import {OrderCustomToggle} from "../../ConnectedCustomComponents/OrderCustomFields";

export default class LectureDetailsSection extends React.Component {

    render() {
        return (
            <CustomPaper
                title={this.props.sectionName}
            >
                <div style={flexStyle}>
                    <CourseSelectorContainer/>

                    <AddParticipantButtonContainer/>

                    <OrderCustomToggle name="orderApproved"/>
                </div>

                {_.map(_.range(this.props.numberOfParticipants), (participantId) =>
                    <PublicCourseParticipantContainer key={participantId} participantId={participantId}/>)}
            </CustomPaper>
        );
    }
}
