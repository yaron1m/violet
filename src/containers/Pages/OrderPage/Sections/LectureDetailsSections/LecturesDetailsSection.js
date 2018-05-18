import React from 'react';
import InternalLectureDetails from "./InternalCourse/InternalLectureDetailsContainer";
import PublicCourseLectureDetails from "./PublicCourse/PublicCourseLectureDetailsContainer";
import {Tab, Tabs} from "material-ui";
import Colors from "../../../../../util/consts/colors";
import PropTypes from 'prop-types';

export default class LectureDetailsSection extends React.Component {

    handleChange = (newKey) => {
        this.props.onTabClick(newKey);
    };

    render() {
        const tabStyle = {
            fontWeight: "bold"
        };

        return (
            <Tabs
                value={this.props.selectedTabKey}
                onChange={this.handleChange.bind(this)}
                inkBarStyle={{
                    backgroundColor: Colors.white,
                }}
                tabItemContainerStyle={{
                    backgroundColor: Colors.veryLightPurple,
                }}
            >
                <Tab label={this.props.internalLabel} value={this.props.internalTabKey} style={tabStyle}>
                    <InternalLectureDetails/>
                </Tab>

                <Tab label={this.props.publicCourseLabel} value={this.props.publicCourseTabKey} style={tabStyle}>
                    <PublicCourseLectureDetails/>
                </Tab>
            </Tabs>
        );
    }
}

LectureDetailsSection.propTypes = {
    selectedTabKey: PropTypes.string.isRequired,
    internalTabKey: PropTypes.string.isRequired,
    publicCourseTabKey: PropTypes.string.isRequired,
    internalLabel: PropTypes.string,
    publicCourseLabel: PropTypes.string,
    onTabClick: PropTypes.func.isRequired,
};
