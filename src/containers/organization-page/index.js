import React from 'react';
import PageTitle from '../../components/page-title';
import OrganizationSection from "../LectureForm/Sections/organization-section";
import OrdersTable from './orders-table'
import {connect} from 'react-redux';

class OrganizationPage extends React.Component {

    render() {
        return (
            <div>
                <PageTitle>{this.props.labels.title}</PageTitle>

                <OrganizationSection/>

                <OrdersTable/>


            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.OrganizationPage,
    };
}

export default connect(mapStateToProps)(OrganizationPage);
