import React from 'react';
import InternalLectureDetails from './InternalCourse/InternalLectureDetailsContainer';
import PublicCourseLectureDetails from './PublicCourse/PublicCourseLectureDetailsContainer';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {TabKey} from '../../../../Util/Constants/Status';

export default function LectureDetailsSection(props: LectureDetailsSectionProps) {
    return (
        <React.Fragment>
            <Tabs
                value={props.selectedTabKey}
                onChange={props.onTabClick}
                indicatorColor='primary'
            >
                <Tab label={props.internalLabel} value={TabKey.internalTabKey}/>

                <Tab label={props.publicCourseLabel} value={TabKey.publicCourseTabKey}/>
            </Tabs>
            {props.selectedTabKey === TabKey.internalTabKey && <InternalLectureDetails/>}
            {props.selectedTabKey === TabKey.publicCourseTabKey && <PublicCourseLectureDetails/>}
        </React.Fragment>
    );
}

interface LectureDetailsSectionProps {
    selectedTabKey: string;
    internalLabel: string;
    publicCourseLabel: string;
    onTabClick: (event: React.ChangeEvent<{}>, value: any) => void,
}
