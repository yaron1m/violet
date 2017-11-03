import React from 'react';
import {connect} from 'react-redux';
import IconButton from "material-ui/IconButton";
import CleanIcon from 'material-ui-icons/Replay';
import {clearSelected} from "../../../../store/selected/actions";
import {getLabels} from "../../../../store/labels/reducer";
import {hideRequiredFields} from "../../../../store/required-fields/actions";
import CustomDialog from "../../../../components/custom-components/custom-dialog";
import {FlatButton} from "material-ui";

class ClearFormButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
        }
    };

    render() {
        const dialogText = this.props.labels.clearDialog;

        const actions = [
            <FlatButton
                label={dialogText.clear}
                primary={true}
                onTouchTap={() => {
                    this.props.dispatch(clearSelected());
                    this.props.dispatch(hideRequiredFields());
                    this.setState({
                        dialogOpen: false,
                    })
                }}
            />,
            <FlatButton
                label={dialogText.cancel}
                primary={true}
                onTouchTap={() => {
                    this.setState({dialogOpen: false});
                }}
            />];

        return (
            <IconButton
                tooltip={this.props.labels.clear}
                onClick={() => this.setState({
                    dialogOpen: true,
                })}
            >
                <CleanIcon/>

                <CustomDialog
                    open={this.state.dialogOpen}
                    title={dialogText.title}
                    onRequestClose={() => this.setState({dialogOpen: false})}
                    actions={actions}
                >
                    {dialogText.content}
                </CustomDialog>
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
