import React from 'react';
import {connect} from 'react-redux';
import IconButton from "material-ui/IconButton";
import CleanIcon from 'material-ui/svg-icons/av/replay';
import {clearSelected} from "../../../../store/selected/actions";
import {getLabels} from "../../../../store/labels/reducer";

class ClearFormButton extends React.Component {
    render() {

        return (
            <IconButton
                onClick={() => this.props.dispatch(clearSelected())}
                tooltip={this.props.labels.clear}
            >
                <CleanIcon/>
            </IconButton>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).orderPage.actionButtons,
    };
}

export default connect(mapStateToProps)(ClearFormButton);
