import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

export default class CustomText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            title: this.props.data.titles[this.props.name],
            value: this.props.data.values[this.props.name]
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.values[this.state.name] === this.state.value)
            return;

        this.setState(Object.assign({}, this.state, {
            value: nextProps.data.values[this.state.name] ? nextProps.data.values[this.state.name] : ""
        }));

    }

    handleChange = (event, newValue) => {
        if (this.props.data.updateAction) {
            this.props.data.updateAction(this.state.name, newValue);
        }else{
            console.error("No update action to text field - " + this.state.name);
        }
    };


    render() {
        const style = {
            marginRight: 20,
        };

        switch (this.props.size) {
            case "S":
                style.width = 50;
                break;
            case "M":
                style.width = 100;
                break;

            default:
                break;
        }

        return (
            <TextField
                style={style}
                floatingLabelText={this.state.title}
                floatingLabelFixed={true}
                fullWidth={this.props.fullWidth}
                disabled={this.props.disabled}
                value={this.state.value}
                onChange={this.handleChange}
                multiLine={true}
                rowsMax={4}
            />
        );
    }
}

CustomText.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
};

CustomText.defaultProps = {
    disabled: false,
    fullWidth: false,
};
