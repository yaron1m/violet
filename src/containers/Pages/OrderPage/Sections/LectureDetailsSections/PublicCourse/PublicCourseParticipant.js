import React from 'react';
import CustomPaper, {flexStyle} from "../../../../../../components/CustomComponents/CustomPaper";
import {
    PublicCourseParticipantsCustomCheckBox,
    PublicCourseParticipantsCustomText
} from "../../ConnectedCustomComponents/PublicCourseParticipantsCustomFields";
import Sizes from "../../../../../../util/consts/sizes";
import _ from 'lodash';
import PropTypes from "prop-types";
import {IconButton} from "material-ui";
import DeleteIcon from 'material-ui-icons/Delete';

export default class PublicCourseParticipant extends React.Component {

    render() {
        const participantId = this.props.participantId;

        return (
            <CustomPaper>
                <div style={flexStyle}>
                    <PublicCourseParticipantsCustomText participantIndex={participantId}
                                                        name="participantFirstName"/>
                    <PublicCourseParticipantsCustomText participantIndex={participantId}
                                                        name="participantLastName"/>
                    <PublicCourseParticipantsCustomText participantIndex={participantId}
                                                        name="participantEnglishFirstName"/>
                    <PublicCourseParticipantsCustomText participantIndex={participantId}
                                                        name="participantEnglishLastName"/>
                    <PublicCourseParticipantsCustomText participantIndex={participantId} name="idNumber"/>
                    <PublicCourseParticipantsCustomText participantIndex={participantId} name="phone"/>
                    <PublicCourseParticipantsCustomText participantIndex={participantId} name="job"/>
                    <PublicCourseParticipantsCustomText participantIndex={participantId} name="email"
                                                        size={Sizes.XL}/>
                    <PublicCourseParticipantsCustomCheckBox participantIndex={participantId}
                                                            name="isqMember"/>
                    <PublicCourseParticipantsCustomText participantIndex={participantId} name="participantCost"/>
                    <IconButton onClick={this.props.onDelete}>
                        <DeleteIcon/>
                    </IconButton>
                </div>
                <div>
                    {_.map(_.orderBy(this.props.selectedPublicCourseLectures, x => x.date),
                        lecture => {
                            const key = "attendingLecture" + lecture.id;
                            return (
                                <PublicCourseParticipantsCustomCheckBox
                                    key={key}
                                    participantIndex={participantId}
                                    name={"attendingLecture" + lecture.id}
                                    titles={{[key]: new Date(lecture.date).toLocaleDateString() + " - " + lecture.topic}}
                                />
                            )
                        })}
                </div>
            </CustomPaper>
        );
    }
}

PublicCourseParticipant.propTypes = {
    participantId: PropTypes.number.isRequired,
    selectedPublicCourseLectures: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
};
