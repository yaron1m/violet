import React from 'react';
import NewOrderNavigationButton from "./NavigationButtons/NewOrderNavigationButton";
import AllOrdersNavigationButton from "./NavigationButtons/AllOrdersNavigationButton";
import FutureLecturesInfoBox from "./InfoBoxes/FutureLecturesInfoBox";
import FollowUpInfoBox from "./InfoBoxes/FollowUpInfoBox";
import ExpectedIncomeInfoBox from "./InfoBoxes/ExpectedIncomeInfoBox";
import WaitingPaymentInfoBox from "./InfoBoxes/WaitingPaymentInfoBox";
import NewPublicCourseNavigationButton from "./NavigationButtons/NewPublicCourseNavigationButton";
import AllPublicCoursesNavigationButton from "./NavigationButtons/AllPublicCoursesNavigationButton";
import PropTypes from "prop-types";

export default function Dashboard(props) {
    return (
        <div>
            <div style={{display: "flex"}}>
                <NewOrderNavigationButton/>
                <AllOrdersNavigationButton/>
                <NewPublicCourseNavigationButton/>
                <AllPublicCoursesNavigationButton/>
            </div>

            {props.isSuperUser ?
                <div style={{display: "flex"}}>
                    <FutureLecturesInfoBox/>
                    <FollowUpInfoBox/>
                    <ExpectedIncomeInfoBox/>
                    <WaitingPaymentInfoBox/>
                </div>

                : null
            }

        </div>
    );
}

Dashboard.propTypes = {
    isSuperUser: PropTypes.bool.isRequired,
};