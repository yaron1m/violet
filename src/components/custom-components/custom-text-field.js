import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';

class AbstractCustomField extends React.Component {
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

    getStyle = () => {
        const style = {
            field: {
                marginRight: 20,
            },
            datePickerTextFieldStyle: {
                width: 100
            },
            maxRows: 4,
        };

        switch (this.props.size) {
            case "S":
                style.field.width = 50;
                break;
            case "M":
                style.field.width = 100;
                break;

            default:
                break;
        }

        return style;
    };
}

AbstractCustomField.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    data: PropTypes.object,
    dataSource: PropTypes.array,
    fullWidth: PropTypes.bool,

};

AbstractCustomField.defaultProps = {
    disabled: false,
    fullWidth: false,
};

export const Types = {
    Text: "TEXT",
    DatePicker: "DATE_PICKER",
    AutoComplete: "AUTOCOMPLETE"
};

export class CustomText extends AbstractCustomField {
    handleChange = (event) => {
        this.setState({
            value: event.target.value,
        });
    };


    render() {
        const style = this.getStyle();

        return (
            <TextField
                style={style.field}
                floatingLabelText={this.state.title}
                floatingLabelFixed={true}
                fullWidth={this.props.fullWidth}
                disabled={this.props.disabled}
                value={this.state.value}
                onChange={this.handleChange}

                multiLine={true}
                rowsMax={style.maxRows}
            />
        );
    }
}

export class CustomDatePicker extends AbstractCustomField {

    handleChange = (nothing, date) => {
        this.setState({
            value: date,
        });

        console.log(date);
    };

    render() {
        const style = this.getStyle();

        return (
            <DatePicker
                style={style.field}
                floatingLabelText={this.state.title}
                floatingLabelFixed={true}
                fullWidth={this.props.fullWidth}
                disabled={this.props.disabled}
                value={this.state.value}
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

export class CustomAutoComplete extends AbstractCustomField {
    handleChange = (searchText, dataSource, params) => {
        this.setState({
            value: searchText,
        });
    };


    render() {
        const style = this.getStyle();

        return (
            <AutoComplete
                style={style.field}
                floatingLabelText={this.state.title}
                floatingLabelFixed={true}
                fullWidth={this.props.fullWidth}
                disabled={this.props.disabled}

                searchText={this.state.value}
                onUpdateInput={this.handleChange}

                multiLine={true}
                rowsMax={style.maxRows}


                filter={AutoComplete.fuzzyFilter}
                dataSource={this.props.dataSource}
            />
        );
    }
}

