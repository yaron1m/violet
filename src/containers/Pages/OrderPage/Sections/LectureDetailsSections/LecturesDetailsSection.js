import React from 'react';
import InternalLectureDetails from "./InternalCourse/InternalLectureDetailsContainer";
import PublicCourseLectureDetails from "./PublicCourse/PublicCourseLectureDetailsContainer";
import {Tab, Tabs} from "material-ui";
import Colors from "../../../../../util/consts/colors";

const internalTab = "internalTab";
const publicCourseTab = "publicCourseTab";

export default class LectureDetailsSection extends React.Component {
    constructor() {
        super();
        this.state = {
            tab: internalTab,
        };
    }

    handleChange = (value) => {
        this.setState({
            tab: value,
        });
    };

    render() {
        return (
            <Tabs
                value={this.state.tab}
                onChange={this.handleChange}
                inkBarStyle={{
                    backgroundColor: Colors.white,
                }}
                tabItemContainerStyle={{
                    backgroundColor: Colors.veryLightPurple,
                }}
            >
                <Tab label={this.props.internalLabel} value={internalTab} style={{fontWeight: "bold"}}>
                    <InternalLectureDetails/>
                </Tab>

                <Tab label={this.props.publicCourseLabel} value={publicCourseTab} style={{fontWeight: "bold"}}>
                    <PublicCourseLectureDetails/>
                </Tab>
            </Tabs>
        );
    }
}
