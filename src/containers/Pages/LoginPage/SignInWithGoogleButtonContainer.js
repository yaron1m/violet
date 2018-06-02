import {connect} from 'react-redux';
import PropTypes from "prop-types";
import SignInWithGoogleButton from "./SignInWithGoogleButton";
import {signInWithGoogle} from "../../../store/Firebase/Actions";

function mapDispatchToProps(dispatch, ownProps) {
    return {
        signInWithGoogleRequest: () => {
            dispatch(signInWithGoogle(ownProps.errorCallback));
        },
    };
}

const Container = connect(null, mapDispatchToProps)(SignInWithGoogleButton);

Container.propTypes = {
    errorCallback: PropTypes.func.isRequired,
};

export default Container;
