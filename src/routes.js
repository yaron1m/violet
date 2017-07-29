import React from 'react';
import {Router, Route} from 'react-router';
import {createHashHistory} from 'history';

import App from './App'
import LectureForm from './containers/pages/order-page/';
import OrganizationPage from './containers/pages/organization-page/';
import {isLoggedIn} from "./store/firebase/reducer";
import connect from "react-redux/es/connect/connect";


const history = createHashHistory();

class Root extends React.Component {

    render() {
        return (
            <Router history={history}>
                <App isLoggedIn={this.props.isLoggedIn}>
                    <Route path="/form" component={LectureForm}/>
                    <Route path="/org" component={OrganizationPage}/>
                </App>
            </Router>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: isLoggedIn(state),
    };
}

export default connect(mapStateToProps)(Root);