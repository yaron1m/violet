import connect from "react-redux/es/connect/connect";
import {getSnackbarMessage} from "../../store/Appearance/Selectors";
import {closeSnackbar} from "../../store/Appearance/Actions";
import CustomSnackbar from "../../Components/CustomComponents/CustomSnackbar";
import {isSnackbarOpen} from "../../store/Appearance/Selectors";

function mapStateToProps(state) {
    return {
        open: isSnackbarOpen(state),
        message: getSnackbarMessage(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onRequestClose: () => dispatch(closeSnackbar()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomSnackbar);