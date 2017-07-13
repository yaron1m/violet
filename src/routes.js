import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router';
import {createHashHistory} from 'history';

import App from './App'
import LectureForm from './containers/pages/order-page';
import OrganizationPage from './containers/pages/organization-page';


const history = createHashHistory();

const Root = ({store}) => (
    <Provider store={store}>
        <Router history={history}>
            <App>
                <Route path="/form" component={LectureForm}/>
                <Route path="/org" component={OrganizationPage}/>
            </App>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root