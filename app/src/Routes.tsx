import React from "react";
import {Route, Router} from 'react-router';
import App from './App';
import LectureForm from './Pages/OrderPage/';
import PublicCourse from './Pages/PublicCoursePage/';
import OrganizationPage from './Pages/OrganizationPage/';
import FollowUpPageTitle from './Pages/FollowUpPage/';
import WaitingPaymentPage from "./Pages/WaitingPaymentPage";
import ExpectedIncomePage from "./Pages/ExpectedIncomePage";
import FutureLecturesPage from "./Pages/FutureLecturesPage";
import AllOrdersPage from "./Pages/AllOrdersPage";
import AllPublicCoursesPage from "./Pages/AllPublicCoursesPage";
import ActionRequiredPage from "./Pages/ActionRequiredPage";
import PrintOrderPage from "./Pages/PrintOrderPage/PrintOrderPageContainer";
import history from './Util/History';
import DashboardContainer from "./Pages/Dashboard/DashboardContainer";
import {Path} from './Pages/Path';

export default function Routes(props: RoutesProps) {
    return (
        <Router history={history}>
            <App isLoggedIn={props.isLoggedIn} rtl={props.rtl}>
                <Route exact path={Path.root} component={DashboardContainer}/>
                <Route path={Path.order} component={LectureForm}/>
                <Route path={Path.publicCourse} component={PublicCourse}/>
                <Route path={Path.organization} component={OrganizationPage}/>
                <Route path={Path.followUp} component={FollowUpPageTitle}/>
                <Route path={Path.actionRequired} component={ActionRequiredPage}/>
                <Route path={Path.waitingPayment} component={WaitingPaymentPage}/>
                <Route path={Path.expectedIncome} component={ExpectedIncomePage}/>
                <Route path={Path.futureLectures} component={FutureLecturesPage}/>
                <Route path={Path.allOrders} component={AllOrdersPage}/>
                <Route path={Path.allPublicCourses} component={AllPublicCoursesPage}/>
                <Route path={Path.print} component={PrintOrderPage}/>
            </App>
        </Router>
    );
}

interface RoutesProps {
    isLoggedIn?: boolean,
    rtl?: boolean,
}
