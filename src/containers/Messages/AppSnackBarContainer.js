import connect from "react-redux/es/connect/connect";
import {getSnackbarMessage, isSnackbarOpen} from "../../store/appearance/reducer";
import {closeSnackbar} from "../../store/appearance/actions";
import CustomSnackbar from "../../components/custom-components/CustomSnackbar";

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