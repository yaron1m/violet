import React from "react";
import ClearFormDialog from "./ClearFormDialogContainer";
import CleanIcon from "@material-ui/icons/Replay";
import {CustomIconButton} from "../../../Components/CustomComponents/CustomButtons";

export default class ClearFormButton extends React.Component {
    state = {
        dialogOpen: false,
    };

    render() {
        return (
            <React.Fragment>
                <CustomIconButton
                    tooltip="נקה טופס"
                    onClick={() => this.setState({dialogOpen: true})}
                >
                    <CleanIcon/>
                </CustomIconButton>

                <ClearFormDialog
                    open={this.state.dialogOpen}
                    onRequestClose={() => this.setState({dialogOpen: false})}
                />
            </React.Fragment>
        );
    }
}