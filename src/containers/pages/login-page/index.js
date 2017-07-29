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
                        })))}
                    />

                    <TextField
                        style={style.field}
                        floatingLabelText={this.props.labels.password}
                        type="password"
                        onChange={(event) => (this.setState(Object.assign({}, this.state, {
                            password: event.target.value,
                        })))}
                    />

                    <RaisedButton
                        label={this.props.labels.signIn}
                        primary={true}
                        style={style.button}
                        onClick={() =>
                            this.props.dispatch(signInRequest(this.state.email, this.state.password))}
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
