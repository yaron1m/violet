import React from 'react';
import PageTitle from '../../../Components/PageTitle';
import PropTypes from "prop-types";
import LoginField from "./LoginField";
import SignInWithGoogleButtonContainer from "./SignInWithGoogleButtonContainer";
import CustomPaper from "../../../Components/CustomComponents/CustomPaper";
import LoginButton from "./LoginButton";
import Colors from "../../../Util/Constants/Colors";

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

                <CustomPaper style={style.paper}>
                    <LoginField
                        type="email"
                        value={this.state.email}
                        onChange={(key, newValue) => (this.setState(Object.assign({}, this.state, {
                            email: newValue,
                            errorMessage: "",
                        })))}

                        onKeyDown={this.signInRequest.bind(this)}
                    />

                    <LoginField
                        type="password"
                        value={this.state.password}
                        onChange={(key, newValue) => (this.setState(Object.assign({}, this.state, {
                            password: newValue,
                            errorMessage: "",
                        })))}

                        onKeyDown={this.signInRequest.bind(this)}
                    />

                    <div style={{color: Colors.red}}>
                        {this.state.errorMessage}
                    </div>

                    <LoginButton
                        onClick={this.signInRequest.bind(this)}
                    />

                    <SignInWithGoogleButtonContainer
                        errorCallback={this.errorCallback.bind(this)}
                    />
                </CustomPaper>

            </div>
        );
    }
}


LoginPage.propTypes = {
    title: PropTypes.string.isRequired,
    signInRequest: PropTypes.func.isRequired,
};
