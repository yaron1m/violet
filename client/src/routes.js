import React from 'react';
import {Router, Route} from 'react-router';
import App from './App'
import LectureForm from './containers/Pages/OrderPage/';
import PublicCourse from './containers/Pages/PublicCoursePage/';
import OrganizationPage from './containers/Pages/OrganizationPage/';
import FollowUpPageTitle from './containers/Pages/FollowUpPage/';
import {isLoggedIn} from "./store/Firebase/Reducer";
import connect from "react-redux/es/connect/connect";
import {isRTL} from "./store/Appearance/Reducer";
import PaymentPage from "./containers/Pages/WaitingPaymentPage";
import ExpectedIncomePage from "./containers/Pages/ExpectedIncomePage";
import FutureLecturesPage from "./containers/Pages/FutureLecturesPage";
import AllOrdersPage from "./containers/Pages/AllOrdersPage";
import AllPublicCoursesPage from "./containers/Pages/AllPublicCoursesPage";
import ActionRequiredPage from "./containers/Pages/ActionRequiredPage";
import PrintOrderPage from "./containers/Pages/PrintOrderPage/PrintOrderPageContainer";
import history from './util/History'
import PropTypes from "prop-types";
import DashboardContainer from "./containers/Pages/Dashboard/DashboardContainer";

class Root extends React.Component {

    render() {
        return (
            <Router history={history}>
                <App isLoggedIn={this.props.isLoggedIn} rtl={this.props.rtl}>
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
}

function mapStateToProps(state) {
    return {
        isLoggedIn: isLoggedIn(state),
        rtl: isRTL(state),
    };
}

Root.propTypes = {
    isLoggedIn: PropTypes.bool,
    rtl: PropTypes.bool,
};

export default connect(mapStateToProps)(Root);