import React from 'react';
import PageTitle from '../../../components/page-title';
import PropTypes from "prop-types";
import Paper from "material-ui/Paper";
import LoginButton from "./LoginButton";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import SignInWithGoogleButtonContainer from "./SignInWithGoogleButtonContainer";

export default class LoginPage extends React.Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errorMessage: "",
        }
    }

    errorCallback(message) {
        this.setState(Object.assign({}, this.state, {
            errorMessage: message,
        }));
    }

    signInRequest() {
        function errorCallback(message) {
            this.setState(Object.assign({}, this.state, {
                errorMessage: message,
            }));
        }

        this.props.signInRequest(this.state.email, this.state.password, errorCallback.bind(this));
    }

    render() {
        const style = {
            div: {
                textAlign: "center",
                margin: "auto",
            },
            paper: {
                width: 300,
                margin: "10px auto 0 auto",
                padding: 10,
            },
        };

        return (
            <div style={style.div}>
                <PageTitle title={this.props.title}/>

                <Paper style={style.paper}>
                    <EmailField
                        onChange={(event) => (this.setState(Object.assign({}, this.state, {
                            email: event.target.value,
                            errorMessage: "",
                        })))}

                        onKeyDown={this.signInRequest.bind(this)}
                    />

                    <PasswordField
                        onChange={((event) => {
                            this.setState(Object.assign({}, this.state, {
                                password: event.target.value,
                                errorMessage: "",
                            }))
                        })}
                        errorText={this.state.errorMessage}

                        onKeyDown={this.signInRequest.bind(this)}
                    />

                    <LoginButton
                        onClick={this.signInRequest.bind(this)}
                    />

                    <SignInWithGoogleButtonContainer
                        errorCallback={this.errorCallback.bind(this)}
                    />
                </Paper>

            </div>
        );
    }
}


LoginPage.propTypes = {
    title: PropTypes.string.isRequired,
    signInRequest: PropTypes.func.isRequired,
};
