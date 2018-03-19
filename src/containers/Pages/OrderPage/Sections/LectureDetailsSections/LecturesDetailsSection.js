import React from 'react';
import InternalLectureDetails from "./InternalLectureDetailsContainer";
import {Tab, Tabs} from "material-ui";
import CustomPaper from "../../../../../components/custom-components/custom-paper";
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
                <Tab label={this.props.internalLabel} value={internalTab}>
                    <InternalLectureDetails/>
                </Tab>

                <Tab label={this.props.publicCourseLabel} value={publicCourseTab}>
                    <CustomPaper title="קורס ציבורי">
                        משהו עבור קורס ציבורי
                    </CustomPaper>
                </Tab>
            </Tabs>
        );
    }
}
