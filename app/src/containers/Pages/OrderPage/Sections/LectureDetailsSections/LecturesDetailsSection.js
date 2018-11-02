import React from 'react';
import InternalLectureDetails from "./InternalCourse/InternalLectureDetailsContainer";
import PropTypes from 'prop-types';
import PublicCourseLectureDetails from "./PublicCourse/PublicCourseLectureDetailsContainer";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default class LectureDetailsSection extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Tabs
                    value={this.props.selectedTabKey}
                    onChange={this.props.onTabClick}
                    indicatorColor="primary"
                    fullWidth
                >
                    <Tab label={this.props.internalLabel} value={this.props.internalTabKey}/>

                    <Tab label={this.props.publicCourseLabel} value={this.props.publicCourseTabKey}/>
                </Tabs>
                {this.props.selectedTabKey === this.props.internalTabKey && <InternalLectureDetails/>}
                {this.props.selectedTabKey === this.props.publicCourseTabKey && <PublicCourseLectureDetails/>}
            </React.Fragment>
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
