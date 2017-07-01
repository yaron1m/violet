import React from 'react';
import TextField from 'material-ui/TextField';
import {black} from 'material-ui/styles/colors';

class CustomTextField extends React.Component {

    render() {
        const style = {
            textField: {
                marginLeft: 20,
            },
            floatingLabelText: {
                color: black
            }
        };

        switch (this.props.size) {
            case "S":
                style.textField.width = 50;
                break;
            case "M":
                style.textField.width = 100;
                break;

            default:
                break;
        }

        return (
            <TextField
                style={style.textField}
                floatingLabelText={this.props.title}
                floatingLabelStyle={style.floatingLabelText}
                multiLine={true}
                rowsMax={4}
            />
        );
    }
}

export default CustomTextField;
