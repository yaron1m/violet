import React from 'react';
import PageTitle from '../../../components/page-title';
import {connect} from 'react-redux';
import {getLabels} from "../../../store/labels/reducer";

class FutureLecturesPageTitle extends React.Component {

    render() {
        return (
            <PageTitle title={this.props.labels.title}/>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).futureLectures,
    };
}

export default connect(mapStateToProps)(FutureLecturesPageTitle);
