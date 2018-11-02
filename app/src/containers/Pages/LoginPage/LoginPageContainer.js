import {connect} from 'react-redux';
import {signInRequest} from "../../../store/Firebase/Actions";
import LoginPage from "./LoginPage";
import {getLabels} from "../../../store/Labels/Selectors";

function mapStateToProps(state) {
    return {
        title: getLabels(state).pages.loginPage.title,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signInRequest: (email, password, errorCallback) =>
            dispatch(signInRequest(email, password, errorCallback)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);