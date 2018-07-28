import connect from "react-redux/es/connect/connect";
import {getSnackbarMessage, isSnackbarOpen} from "../../store/Appearance/Reducer";
import {closeSnackbar} from "../../store/Appearance/Actions";
import CustomSnackbar from "../../components/CustomComponents/CustomSnackbar";

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