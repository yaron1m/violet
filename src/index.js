import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
import './index.css';
import Routes from "./routes";

injectTapEventPlugin();

ReactDOM.render(
    <Routes/>,
    document.getElementById('root')
);