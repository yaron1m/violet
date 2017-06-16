import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
