import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';

export default class CustomDatePicker extends React.Component {
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

    handleChange = (nothing, date) => {
        if (this.props.data.updateAction) {
            this.props.data.updateAction(this.state.name, date.toDateString());
        } else {
            console.error("No update callback in date - " + this.state.name);
        }
    };

    render() {
        const style = {
            field: {
                marginRight: 20,
            },
            datePickerTextFieldStyle: {
                width: 150
            },
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
            <DatePicker
                style={style}
                floatingLabelText={this.state.title}
                floatingLabelFixed={true}
                fullWidth={this.props.fullWidth}
                disabled={this.props.disabled}
                value={this.state.value ? new Date(this.state.value) : null}
                onChange={this.handleChange}

                textFieldStyle={style.datePickerTextFieldStyle}
                DateTimeFormat={window.Intl.DateTimeFormat}
                okLabel="אישור"
                cancelLabel="ביטול"
                locale='he-IL'
                firstDayOfWeek={0}
            />
        );
    }
}

CustomDatePicker.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
};

CustomDatePicker.defaultProps = {
    disabled: false,
    fullWidth: false,
};