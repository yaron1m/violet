import React from "react";
import InternalLectureDetails from "./InternalCourse/InternalLectureDetailsContainer";
import PublicCourseLectureDetails from "./PublicCourse/PublicCourseLectureDetailsContainer";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {TabKey} from "../../../../Util/Constants/Status";

export default function LectureDetailsSection(props: LectureDetailsSectionProps) {
    return (
        <React.Fragment>
            <Tabs
                value={props.selectedTabKey}
                onChange={props.onTabClick}
                indicatorColor="primary"
            >
                <Tab label="קורס פנים ארגוני" value={TabKey.internalTabKey}/>

                <Tab label="קורס ציבורי" value={TabKey.publicCourseTabKey}/>
            </Tabs>
            {props.selectedTabKey === TabKey.internalTabKey && <InternalLectureDetails/>}
            {props.selectedTabKey === TabKey.publicCourseTabKey && <PublicCourseLectureDetails/>}
        </React.Fragment>
    );
}

interface LectureDetailsSectionProps {
    selectedTabKey: string;
    onTabClick: (event: React.ChangeEvent<{}>, value: any) => void,
}
