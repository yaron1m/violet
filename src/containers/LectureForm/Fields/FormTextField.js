import React from 'react';
import TextField from 'material-ui/TextField';
import {black} from 'material-ui/styles/colors';

class FormTextField extends React.Component {



    render() {
        const {title, size} = this.props;

        var style = {
            textField: {
                marginLeft: 20,
            },
            floatingLabelText: {
                color: black
            }
        };

        switch (size) {
            case "S":
                style.textField.width = 50;
                break;
            case "M":
                style.textField.width = 100;
                break;
        }

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
