import React from 'react';
import PageTitle from '../../../components/page-title';
import {connect} from 'react-redux';
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import {getLabels} from "../../../store/labels/reducer";
import {signInRequest, signInWithGoogle} from "../../../store/firebase/actions";

import signInWithGoogleNormal from '../../../images/google-sign-in/btn_google_signin_light_normal_web@2x.png';
import signInWithGooglePressed from '../../../images/google-sign-in/btn_google_signin_light_pressed_web@2x.png';
import signInWithGoogleFocused from '../../../images/google-sign-in/btn_google_signin_light_focus_web@2x.png';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMessage: "",
            signInWithGoogleImage: signInWithGoogleNormal,
        }
    }

    signInRequest() {
        function errorCallback(message) {
            this.setState(Object.assign({}, this.state, {
                errorMessage: message,
            }));
        }

        this.props.dispatch(signInRequest(this.state.email, this.state.password, errorCallback.bind(this)));
    }

    signInWithGoogleRequest() {
        function errorCallback(message) {
            this.setState(Object.assign({}, this.state, {
                errorMessage: message,
            }));
        }

        this.props.dispatch(signInWithGoogle(errorCallback.bind(this)));
    }


    render() {
        const style = {
            div: {
                textAlign: "center",
                margin: "auto",
            },
            field: {
                marginRight: 20,
            },
            paper: {
                width: 300,
                margin: "10px auto 0 auto",
                padding: 10,
            },
            button: {
                marginTop: 10,
            },
            signInWithGoogle: {
                height: 60,
                marginTop: 10,
                marginBottom: 10,
            }
        };


        function onEnter(event) {
            if (event.key === "Enter")
                this.signInRequest();
        }

        return (
            <div style={style.div}>
                <PageTitle title={this.props.labels.title}/>

                <Paper style={style.paper}>
                    <TextField
                        style={style.field}
                        floatingLabelText={this.props.labels.email}
                        type="email"
                        onChange={(event) => (this.setState(Object.assign({}, this.state, {
                            email: event.target.value,
                            errorMessage: "",
                        })))}
                        onKeyDown={onEnter.bind(this)}
                    />

                    <TextField
                        style={style.field}
                        floatingLabelText={this.props.labels.password}
                        type="password"
                        onChange={((event) => {
                            this.setState(Object.assign({}, this.state, {
                                password: event.target.value,
                                errorMessage: "",
                            }))
                        })}
                        errorText={this.state.errorMessage}

                        onKeyDown={onEnter.bind(this)}
                    />

                    <RaisedButton
                        label={this.props.labels.signIn}
                        primary={true}
                        style={style.button}
                        onClick={this.signInRequest.bind(this)}
                    />

                    <img src={this.state.signInWithGoogleImage }
                         alt="Sign in with Google"
                         style={style.signInWithGoogle}
                         onMouseOver={() => this.setState(Object.assign({}, this.state, {
                             signInWithGoogleImage: signInWithGoogleFocused,
                         }))}
                         onMouseOut={() => this.setState(Object.assign({}, this.state, {
                             signInWithGoogleImage: signInWithGoogleNormal,
                         }))}
                         onClick={function(){
                             this.setState(Object.assign({}, this.state, {
                             signInWithGoogleImage: signInWithGooglePressed,
                         }));
                             this.signInWithGoogleRequest()
                         }.bind(this)}
                    />
                </Paper>

            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).loginPage,
    };
}

export default connect(mapStateToProps)(LoginPage);
