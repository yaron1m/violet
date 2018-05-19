import React from 'react';
import PublicCoursePageTitle from './PublicCoursePageTitleContainer';
import PublicCoursePageSections from './Sections';
import PublicCourseActionButtons from "./ActionButtons";

export default class OrderForm extends React.Component {

    render() {

        return (
            <div>
                <PublicCoursePageTitle/>
                {/*<OrderEditTimes/>*/}

                <PublicCourseActionButtons/>

                <PublicCoursePageSections/>
            </div>
        );
    }
}
