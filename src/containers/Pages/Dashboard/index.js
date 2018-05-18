import React from 'react';
import NewOrderNavigationButton from "./NavigationButtons/NewOrderNavigationButton";
import AllOrdersNavigationButton from "./NavigationButtons/AllOrdersNavigationButton";
import FutureLecturesInfoBox from "./InfoBoxes/FutureLecturesInfoBox";
import FollowUpInfoBox from "./InfoBoxes/FollowUpInfoBox";
import ExpectedIncomeInfoBox from "./InfoBoxes/ExpectedIncomeInfoBox";
import WaitingPaymentInfoBox from "./InfoBoxes/WaitingPaymentInfoBox";
import NewPublicCourseNavigationButton from "./NavigationButtons/NewPublicCourseNavigationButton";
import AllPublicCoursesNavigationButton from "./NavigationButtons/AllPublicCoursesNavigationButton";
import {allowPublicCourses} from "../../../App";

export default class HomePage extends React.Component {
    render() {
        return (
            <div>
                <div style={{display: "flex"}}>
                    <NewOrderNavigationButton/>
                    <AllOrdersNavigationButton/>
                    {allowPublicCourses ? <React.Fragment>
                        <NewPublicCourseNavigationButton/>
                        <AllPublicCoursesNavigationButton/>
                    </React.Fragment> : null}
                </div>

                <div style={{display: "flex"}}>
                    <FutureLecturesInfoBox/>
                    <FollowUpInfoBox/>
                    <ExpectedIncomeInfoBox/>
                    <WaitingPaymentInfoBox/>
                </div>
            </div>
        );
    }
}
