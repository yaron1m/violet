import React from 'react';
import PageTitle from '../../../components/page-title';
import {connect} from 'react-redux';
import {getLabels} from "../../../store/labels/reducer";

class ExpectedIncomePageTitle extends React.Component {

    render() {
        return (
            <PageTitle title={this.props.labels.title}/>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.expectedIncome,
    };
}

export default connect(mapStateToProps)(ExpectedIncomePageTitle);
