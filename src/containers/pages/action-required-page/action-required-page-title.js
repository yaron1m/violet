import React from 'react';
import PageTitle from '../../../components/page-title';
import {connect} from 'react-redux';
import {getLabels} from "../../../store/labels/reducer";

class ActionRequiredPageTitle extends React.Component {

    render() {
        return (
            <PageTitle title={this.props.labels.title}/>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).actionRequiredPage,
    };
}

export default connect(mapStateToProps)(ActionRequiredPageTitle);