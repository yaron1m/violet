import React from "react";
import NewOrderNavigationButton from './NavigationButtons/NewOrderNavigationButton';
import AllOrdersNavigationButton from './NavigationButtons/AllOrdersNavigationButton';
import FutureLecturesInfoBox from './InfoBoxes/FutureLecturesInfoBox';
import FollowUpInfoBox from './InfoBoxes/FollowUpInfoBox';
import ExpectedIncomeInfoBox from './InfoBoxes/ExpectedIncomeInfoBox';
import WaitingPaymentInfoBox from './InfoBoxes/WaitingPaymentInfoBox';
import NewPublicCourseNavigationButton from './NavigationButtons/NewPublicCourseNavigationButton';
import AllPublicCoursesNavigationButton from './NavigationButtons/AllPublicCoursesNavigationButton';

export default function Dashboard(props: { isSuperUser: boolean }) {
    const styles = {
        rowDiv: {
            display: 'flex',
            flexDirection: 'row' as 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap' as 'wrap',
        }
    };

    return (
        <div>
            <div style={styles.rowDiv}>
                <NewOrderNavigationButton/>
                <AllOrdersNavigationButton/>
                <NewPublicCourseNavigationButton/>
                <AllPublicCoursesNavigationButton/>
            </div>

            {props.isSuperUser ?
                <div style={styles.rowDiv}>
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