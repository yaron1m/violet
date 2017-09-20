import React from 'react';
import FutureLecturesPageTitle from './future-lectures-page-title';
import FutureLecturesSummary from './future-lectures-summary';

export default class FutureLecturesPage extends React.Component {
    render() {
        return (
            <div>
                <FutureLecturesPageTitle/>

                <FutureLecturesSummary/>
            </div>
        );
    }
}
