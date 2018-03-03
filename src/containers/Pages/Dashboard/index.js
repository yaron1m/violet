import React from 'react';
import NewOrderNavigationButton from "./NavigationButtons/NewOrderNavigationButton";
import AllOrdersNavigationButton from "./NavigationButtons/AllOrdersNavigationButton";
import FutureLecturesInfoBox from "./InfoBoxes/FutureLecturesInfoBox";
import FollowUpInfoBox from "./InfoBoxes/FollowUpInfoBox";
import ExpectedIncomeInfoBox from "./InfoBoxes/ExpectedIncomeInfoBox";
import WaitingPaymentInfoBox from "./InfoBoxes/WaitingPaymentInfoBox";

export default class HomePage extends React.Component {
    render() {
        return (
            <div>
                <div style={{display: "flex"}}>
                    <NewOrderNavigationButton/>
                    <AllOrdersNavigationButton/>
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
