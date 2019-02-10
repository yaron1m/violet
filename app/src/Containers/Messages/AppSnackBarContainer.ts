import {connect} from "react-redux";
import {getSnackbarMessage} from "../../Store/Appearance/Selectors";
import {closeSnackbar} from "../../Store/Appearance/Actions";
import CustomSnackbar from "../../Components/CustomComponents/CustomSnackbar";
import {isSnackbarOpen} from "../../Store/Appearance/Selectors";
import {IDispatch, IState} from '../../Interfaces/ReduxInterfaces';

function mapStateToProps(state: IState) {
    return {
        open: isSnackbarOpen(state),
        message: getSnackbarMessage(state),
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onRequestClose: () => dispatch(closeSnackbar()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomSnackbar);