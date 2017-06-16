import React from 'react';
import TextField from 'material-ui/TextField';
import {black} from 'material-ui/styles/colors';

class FormTextField extends React.Component {

    render() {
        const {title} = this.props;

        const style = {
            textField:{
                marginLeft:20,
            },
            floatingLabelText: {
                color: black
            }
        };

        return (
            <TextField
                style={style.textField}
                floatingLabelText={title}
                floatingLabelStyle={style.floatingLabelText}
            />
        );
    }
}

export default FormTextField;
