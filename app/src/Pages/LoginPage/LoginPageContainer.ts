import {connect} from "react-redux";
import {signInRequest} from "../../Store/Firebase/Actions";
import LoginPage from "./LoginPage";
import {getLabels} from "../../Store/Labels/Selectors";
import {IDispatch, IState} from "../../Interfaces/ReduxInterfaces";

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        signInRequest: (email: string, password: string, errorCallback: (message: string) => void) =>
            dispatch(signInRequest(email, password, errorCallback)),
    };
}

export default connect(undefined, mapDispatchToProps)(LoginPage);
