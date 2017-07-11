import React from 'react';
import TextField from 'material-ui/TextField';

class CustomTextField extends React.Component {
    constructor(props) {
        super(props);
        let name = this.props.name;
        this.state = {
            name: name,
            title: this.props.data.titles[name],
            value: this.props.data.values[name]
        };
    }

    componentWillReceiveProps(nextProps) {
        let name = nextProps.name;
        if (nextProps.data.values[name] !== this.state.value) {
            this.setState({
                title: nextProps.data.titles[name],
                value: nextProps.data.values[name] ? nextProps.data.values[name] : ""
            });
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
                marginRight: 20,
            },
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
                floatingLabelText={this.state.title}
                floatingLabelFixed={true}
                multiLine={true}
                rowsMax={4}
                value={this.state.value}
                onChange={this.handleChange}
                fullWidth={this.props.fullWidth}
                disabled={this.props.disabled}
            />
        );
    }
}

export default CustomTextField;
