import React from 'react';
import PageTitle from '../../../components/page-title';
import {connect} from 'react-redux';
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import {getLabels} from "../../../store/labels/reducer";
import {signInRequest} from "../../../store/firebase/actions";

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMessage:"",
        }
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
        };


        function onEnter(event) {
            if (event.key === "Enter")
                startSignInRequest().bind(this);
        }

        function startSignInRequest(){
            function errorCallback(message){
                this.setState(Object.assign({}, this.state, {
                    errorMessage:  message,
                }));
            }
            this.props.dispatch(signInRequest(this.state.email, this.state.password, errorCallback.bind(this)));
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
                            errorMessage:"",
                        })))}
                        onKeyDown={onEnter}
                    />

                    <TextField
                        style={style.field}
                        floatingLabelText={this.props.labels.password}
                        type="password"
                        onChange={((event) => {
                            this.setState(Object.assign({}, this.state, {
                                password: event.target.value,
                                errorMessage:"",
                            }))
                        })}
                        errorText={this.state.errorMessage}

                        onKeyDown={onEnter}
                    />

                    <RaisedButton
                        label={this.props.labels.signIn}
                        primary={true}
                        style={style.button}
                        onClick={startSignInRequest.bind(this)}
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
