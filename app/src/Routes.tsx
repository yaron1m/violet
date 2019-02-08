import React from 'react';
import {Route, Router} from 'react-router';
import App from './App'
import LectureForm from './containers/Pages/OrderPage/';
import PublicCourse from './containers/Pages/PublicCoursePage/';
import OrganizationPage from './containers/Pages/OrganizationPage/';
import FollowUpPageTitle from './containers/Pages/FollowUpPage/';
import PaymentPage from "./containers/Pages/WaitingPaymentPage";
import ExpectedIncomePage from "./containers/Pages/ExpectedIncomePage";
import FutureLecturesPage from "./containers/Pages/FutureLecturesPage";
import AllOrdersPage from "./containers/Pages/AllOrdersPage";
import AllPublicCoursesPage from "./containers/Pages/AllPublicCoursesPage";
import ActionRequiredPage from "./containers/Pages/ActionRequiredPage";
import PrintOrderPage from "./containers/Pages/PrintOrderPage/PrintOrderPageContainer";
import history from './util/History'
import DashboardContainer from "./containers/Pages/Dashboard/DashboardContainer";

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
