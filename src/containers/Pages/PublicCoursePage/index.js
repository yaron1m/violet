import React from 'react';
import OrderPageTitle from './PublicCoursePageTitleContainer';
import PublicCoursePageSections from './Sections';
// import OrderPageSections from './Sections';
// import OrderActionButtons from './ActionButtons';
// import OrderEditTimes from './OrderEditTimesContainer'

export default class OrderForm extends React.Component {

    render() {

        return (
            <div>
                <OrderPageTitle/>
                {/*<OrderEditTimes/>*/}

                {/*<OrderActionButtons/>*/}

                <PublicCoursePageSections/>
            </div>
        );
    }
}
