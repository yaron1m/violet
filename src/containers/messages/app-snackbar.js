import React from 'react';
import Snackbar from "material-ui/Snackbar";
import connect from "react-redux/es/connect/connect";
import {getSnackbarMessage, isSnackbarOpen} from "../../store/appearance/reducer";
import {closeSnackbar} from "../../store/appearance/actions";

class AppSnackbar extends React.Component {

    render() {
        return (
            <Snackbar
                open={this.props.isSnackbarOpen}
                message={this.props.snackbarMessage}
                autoHideDuration={4000}
                onRequestClose={() => this.props.dispatch(closeSnackbar())}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        isSnackbarOpen: isSnackbarOpen(state),
        snackbarMessage: getSnackbarMessage(state),
    };
}

export default connect(mapStateToProps)(AppSnackbar);