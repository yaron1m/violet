import React from 'react';
import _ from 'lodash';
import CustomPaper, {flexStyle} from "../../../../../../components/CustomComponents/CustomPaper";
import AddParticipantButtonContainer from "./AddParticipantButtonContainer";
import PublicCourseParticipantContainer from "./PublicCourseParticipantContainer";
import CourseSelectorContainer from "./CourseSelectorContainer";
import {OrderCustomToggle} from "../../ConnectedCustomComponents/OrderCustomFields";
import PropTypes from "prop-types";

export default class PublicCourseLectureDetails extends React.Component {

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

PublicCourseLectureDetails.propTypes = {
    sectionName: PropTypes.string.isRequired,
    numberOfParticipants: PropTypes.number,
};
