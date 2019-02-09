import React from 'react';
import InternalLectureDetails from "./InternalCourse/InternalLectureDetailsContainer";
import PropTypes from 'prop-types';
import PublicCourseLectureDetails from "./PublicCourse/PublicCourseLectureDetailsContainer";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function LectureDetailsSection(props:LectureDetailsSectionProps){
        return (
            <React.Fragment>
                <Tabs
                    value={props.selectedTabKey}
                    onChange={props.onTabClick}
                    indicatorColor="primary"
                    fullWidth
                >
                    <Tab label={props.internalLabel} value={props.internalTabKey}/>

                    <Tab label={props.publicCourseLabel} value={props.publicCourseTabKey}/>
                </Tabs>
                {props.selectedTabKey === props.internalTabKey && <InternalLectureDetails/>}
                {props.selectedTabKey === props.publicCourseTabKey && <PublicCourseLectureDetails/>}
            </React.Fragment>
        );
}

interface LectureDetailsSectionProps {
    selectedTabKey: string;
    internalTabKey:  string;
    publicCourseTabKey:  string;
    internalLabel:  string;
    publicCourseLabel:  string;
    onTabClick: (event: React.ChangeEvent<{}>, value: any) => void,
};
