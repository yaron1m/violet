import React from "react";
import PageTitle from "../../Components/PageTitle";
import SignInWithGoogleButton from "./SignInWithGoogleButton";
import CustomPaper from "../../Components/CustomComponents/CustomPaper";
import Colors from "../../Util/Constants/Colors";
import CustomTextField from "../../Components/CustomComponents/CustomTextField";
import {Size} from "../../Util/Constants/Size";
import {CustomRaisedButton} from "../../Components/CustomComponents/CustomButtons";

export default class LoginPage extends React.Component<LoginPageProps> {

    state = {
        email: "",
        password: "",
        errorMessage: "",
    };

    errorCallback(message: string) {
        this.setState({
            errorMessage: message,
        });
    }

    signInRequest = (errorCallback: (message: string) => void) => () => {
        this.props.signInRequest(this.state.email, this.state.password, errorCallback);
    };

    render() {
        const style = {
            div: {
                textAlign: "center" as "center",
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
                <PageTitle title="כניסת משתמשים"/>

                <CustomPaper style={style.paper}>
                    <CustomTextField
                        type="email"
                        title="דואר אלקטרוני"
                        value={this.state.email}
                        size={Size.XL}
                        onChange={(newValue: string) => (this.setState({
                            email: newValue,
                            errorMessage: "",
                        }))}
                    />

                    <CustomTextField
                        type="password"
                        title="סיסמה"
                        value={this.state.password}
                        size={Size.XL}
                        onChange={(newValue: string) => (this.setState({
                            password: newValue,
                            errorMessage: "",
                        }))}
                    />

                    <div style={{color: Colors.red}}>
                        {this.state.errorMessage}
                    </div>

                    <CustomRaisedButton
                        label="כניסה"
                        onClick={this.signInRequest(this.errorCallback)}
                        style={{marginTop: 10}}
                    />

                    <SignInWithGoogleButton
                        errorCallback={this.errorCallback.bind(this)}
                    />
                </CustomPaper>

            </div>
        );
    }
}

interface LoginPageProps {
    signInRequest: (email: string, password: string, errorCallback: (message: string) => void) => void;
}
