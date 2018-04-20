import React from 'react';
import CustomPaper from "../../../../../../components/custom-components/custom-paper";
import AddParticipantButtonContainer from "./AddParticipantButtonContainer";

export default class LectureDetailsSection extends React.Component {

    render() {
        return (
            <CustomPaper
                title={this.props.sectionName}
            >
                <AddParticipantButtonContainer/>
            </CustomPaper>
        );
    }
}
