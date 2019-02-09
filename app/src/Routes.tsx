import React from 'react';
import {Route, Router} from 'react-router';
import App from './App'
import LectureForm from './Pages/OrderPage/';
import PublicCourse from './Pages/PublicCoursePage/';
import OrganizationPage from './Pages/OrganizationPage/';
import FollowUpPageTitle from './Pages/FollowUpPage/';
import PaymentPage from "./Pages/WaitingPaymentPage";
import ExpectedIncomePage from "./Pages/ExpectedIncomePage";
import FutureLecturesPage from "./Pages/FutureLecturesPage";
import AllOrdersPage from "./Pages/AllOrdersPage";
import AllPublicCoursesPage from "./Pages/AllPublicCoursesPage";
import ActionRequiredPage from "./Pages/ActionRequiredPage";
import PrintOrderPage from "./Pages/PrintOrderPage/PrintOrderPageContainer";
import history from './Util/History'
import DashboardContainer from "./Pages/Dashboard/DashboardContainer";

export default function Routes(props: RoutesProps) {
    return (
        <Router history={history}>
            <App isLoggedIn={props.isLoggedIn} rtl={props.rtl}>
                <Route exact path="/" component={DashboardContainer}/>
                <Route path="/form" component={LectureForm}/>
                <Route path="/publicCourse" component={PublicCourse}/>
                <Route path="/org" component={OrganizationPage}/>
                <Route path="/followup" component={FollowUpPageTitle}/>
                <Route path="/actionRequired" component={ActionRequiredPage}/>
                <Route path="/payment" component={PaymentPage}/>
                <Route path="/expectedIncome" component={ExpectedIncomePage}/>
                <Route path="/futureLectures" component={FutureLecturesPage}/>
                <Route path="/allOrders" component={AllOrdersPage}/>
                <Route path="/allPublicCourses" component={AllPublicCoursesPage}/>
                <Route path="/print" component={PrintOrderPage}/>
            </App>
        </Router>
    )
}

interface RoutesProps {
    isLoggedIn?: boolean,
    rtl?: boolean,
}
