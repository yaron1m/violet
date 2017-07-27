import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router';
import {createHashHistory} from 'history';

import App from './App'
import LectureForm from './containers/pages/order-page/';
import OrganizationPage from './containers/pages/organization-page/';
import Store from './store'


const history = createHashHistory();

const Root = () => (
    <Provider store={Store}>
        <Router history={history}>
            <App>
                <Route path="/form" component={LectureForm}/>
                <Route path="/org" component={OrganizationPage}/>
            </App>
        </Router>
    </Provider>
);

export default Root;