import React from 'react';
import TextField from 'material-ui/TextField';
import {black} from 'material-ui/styles/colors';

class CustomTextField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.value !== this.state.value) {
            if(nextProps.value)
            this.setState({ value: nextProps.value });
            else
                this.setState({ value: "" });

        }
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value,
        });
    };

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
                floatingLabelFixed={true}
                multiLine={true}
                rowsMax={4}
                value={this.state.value}
                onChange={this.handleChange}
            />
        );
    }
}

export default CustomTextField;
