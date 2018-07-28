import React from "react";
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';

class CustomSnackbar extends React.Component {
    render() {
        return (
            <Snackbar
                open={this.props.open}
                message={this.props.message}
                autoHideDuration={4000}
                onClose={this.props.onRequestClose}
            />
        );
    }
}

CustomSnackbar.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string,
    onRequestClose: PropTypes.func,
};

export default CustomSnackbar;