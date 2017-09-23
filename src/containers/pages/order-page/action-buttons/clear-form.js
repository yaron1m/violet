import React from 'react';
import {connect} from 'react-redux';
import IconButton from "material-ui/IconButton";
import CleanIcon from 'material-ui-icons/Replay';
import {clearSelected} from "../../../../store/selected/actions";
import {getLabels} from "../../../../store/labels/reducer";
import {hideRequiredFields} from "../../../../store/required-fields/actions";

class ClearFormButton extends React.Component {
    render() {

        return (
            <IconButton
                onClick={() =>{
                    this.props.dispatch(clearSelected())
                    this.props.dispatch(hideRequiredFields())
                }}
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
