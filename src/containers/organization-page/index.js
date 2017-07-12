import React from 'react';
import {typography} from 'material-ui/styles';
import OrganizationSection from "../LectureForm/Sections/organization-section";
import OrdersTable from './orders-table'
import {connect} from 'react-redux';

class OrganizationPage extends React.Component {

    render() {

        const style = {
            pageTitle: {
                fontSize: 24,
                marginBottom: 20
            }
        };

        return (
            <div>
                <span style={style.pageTitle}>{this.props.labels.title}</span>

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
