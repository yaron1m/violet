import React from 'react';
import {Router, Route} from 'react-router';
import {createHashHistory} from 'history';

import App from './App'
import LectureForm from './containers/pages/order-page/';
import OrganizationPage from './containers/pages/organization-page/';
import FollowUpPageTitle from './containers/pages/follow-up-page/';
import {isLoggedIn} from "./store/firebase/reducer";
import connect from "react-redux/es/connect/connect";
import {isRTL} from "./store/appearance/reducer";
import HomePage from "./containers/pages/home-page/index";
import PaymentPage from "./containers/pages/payment-page/index";
import FutureLecturesPage from "./containers/pages/future-lectures-page/index";

const history = createHashHistory();

class Root extends React.Component {

    render() {
        return (
            <Router history={history}>
                <App isLoggedIn={this.props.isLoggedIn} rtl={this.props.rtl}>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/form" component={LectureForm}/>
                    <Route path="/org" component={OrganizationPage}/>
                    <Route path="/followup" component={FollowUpPageTitle}/>
                    <Route path="/payment" component={PaymentPage}/>
                    <Route path="/futureLectures" component={FutureLecturesPage}/>
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

export default connect(mapStateToProps)(Root);