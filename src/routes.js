import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router';
import {createHashHistory} from 'history';

import App from './App'
import LectureForm from './containers/LectureForm/order-form';
import OrganizationSection from './containers/LectureForm/Sections/organization-section';


const history = createHashHistory();

const Root = ({store}) => (
    <Provider store={store}>
        <Router history={history}>
            <App>
                <Route path="/form" component={LectureForm}/>
                <Route path="/org" component={OrganizationSection}/>
            </App>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root