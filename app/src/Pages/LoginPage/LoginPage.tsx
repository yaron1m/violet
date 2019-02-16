import React from 'react';
import PageTitle from '../../Components/PageTitle';
import LoginField from "./LoginField";
import SignInWithGoogleButton from "./SignInWithGoogleButton";
import CustomPaper from "../../Components/CustomComponents/CustomPaper";
import LoginButton from "./LoginButton";
import Colors from "../../Util/Constants/Colors";

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
                textAlign: "center" as 'center',
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
                        onChange={(key: string, newValue: string) => (this.setState({
                            email: newValue,
                            errorMessage: "",
                        }))}
                    />

                    <LoginField
                        type="password"
                        value={this.state.password}
                        onChange={(key: string, newValue: string) => (this.setState({
                            password: newValue,
                            errorMessage: "",
                        }))}
                    />

                    <div style={{color: Colors.red}}>
                        {this.state.errorMessage}
                    </div>

                    <LoginButton
                        onClick={this.signInRequest(this.errorCallback)}
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
    title: string;
    signInRequest: (email: string, password: string, errorCallback: (message: string) => void) => void;
}
