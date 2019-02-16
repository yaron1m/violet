import React from 'react';
import signInWithGoogleNormal from '../../images/google-sign-in/GoogleSigninWeb.png';
import signInWithGooglePressed from '../../images/google-sign-in/GoogleSigninWebPressed.png';
import signInWithGoogleFocused from '../../images/google-sign-in/GoogleSigninFocus.png';
import {signInWithGoogle} from '../../Store/Firebase/Actions';

export default class SignInWithGoogleButton extends React.Component<SignInWithGoogleButtonProps> {

    state = {
        signInWithGoogleImage: signInWithGoogleNormal,
    };

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
                 onMouseOver={() => this.setState({
                     signInWithGoogleImage: signInWithGoogleFocused,
                 })}
                 onMouseOut={() => this.setState({
                     signInWithGoogleImage: signInWithGoogleNormal,
                 })}
                 onClick={()=> {
                     this.setState({
                         signInWithGoogleImage: signInWithGooglePressed,
                     });
                     signInWithGoogle(this.props.errorCallback);
                 }}
            />
        );
    }
}

interface SignInWithGoogleButtonProps {
    errorCallback: (message: string) => void;
}