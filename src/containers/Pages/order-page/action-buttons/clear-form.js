import React from 'react';
import {connect} from 'react-redux';
import IconButton from "material-ui/IconButton";
import CleanIcon from 'material-ui-icons/Replay';
import {clearSelected} from "../../../../store/selected/actions";
import {getLabels} from "../../../../store/labels/reducer";
import {hideRequiredFields} from "../../../../store/required-fields/actions";
import {FlatButton} from "material-ui";
import {closeDialog, openDialog} from "../../../../store/appearance/actions";

class ClearFormButton extends React.Component {

    render() {
        const dialogText = this.props.labels.clearDialog;

        const actions = [
            <FlatButton
                label={dialogText.clear}
                primary={true}
                onTouchTap={() => {
                    this.props.dispatch(clearSelected());
                    this.props.dispatch(hideRequiredFields());
                    this.props.dispatch(closeDialog());
                }}
            />,
            <FlatButton
                label={dialogText.cancel}
                primary={true}
                onTouchTap={() => {
                    this.props.dispatch(closeDialog());
                }}
            />];

        return (
            <IconButton
                tooltip={this.props.labels.clear}
                onClick={() => this.props.dispatch(
                    openDialog(dialogText.title,dialogText.content, actions )
                )}
            >
                <CleanIcon/>
            </IconButton>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.orderPage.actionButtons,
    };
}

export default connect(mapStateToProps)(ClearFormButton);
