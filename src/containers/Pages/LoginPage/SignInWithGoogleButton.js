import React from 'react';
import PropTypes from "prop-types";
import signInWithGoogleNormal from '../../../images/google-sign-in/btn_google_signin_light_normal_web@2x.png';
import signInWithGooglePressed from '../../../images/google-sign-in/btn_google_signin_light_pressed_web@2x.png';
import signInWithGoogleFocused from '../../../images/google-sign-in/btn_google_signin_light_focus_web@2x.png';

class SignInWithGoogleButton extends React.Component {

    constructor() {
        super();
        this.state = {
            signInWithGoogleImage: signInWithGoogleNormal,
        }
    }

    render() {
        const style = {
            height: 60,
            marginTop: 10,
            marginBottom: 10,
        };

        return (
            <img src={this.state.signInWithGoogleImage}
                 alt="Sign in with Google"
                 style={style}
                 onMouseOver={() => this.setState(Object.assign({}, this.state, {
                     signInWithGoogleImage: signInWithGoogleFocused,
                 }))}
                 onMouseOut={() => this.setState(Object.assign({}, this.state, {
                     signInWithGoogleImage: signInWithGoogleNormal,
                 }))}
                 onClick={function () {
                     this.setState(Object.assign({}, this.state, {
                         signInWithGoogleImage: signInWithGooglePressed,
                     }));
                     this.props.signInWithGoogleRequest()
                 }.bind(this)}
            />
        );
    }
}

SignInWithGoogleButton.propTypes = {
    signInWithGoogleRequest: PropTypes.func.isRequired,
};

export default SignInWithGoogleButton;