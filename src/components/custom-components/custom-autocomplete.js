import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';

export default class CustomAutoComplete extends React.Component {
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

    handleChange = (searchText, dataSource, params) => {
        if (this.props.data.updateAction) {
            this.props.data.updateAction(this.state.name, searchText);
        } else {
            console.error("No update action to text field - " + this.state.name);
        }
    };

    render() {
        const style = {
            autoComplete: {
                marginRight: 20,
            },
            textField: {
                verticalAlign: "bottom",
                marginBottom: 10,
            },
        };

        switch (this.props.size) {
            case "S":
                style.autoComplete.width = 50;
                break;
            case "M":
                style.autoComplete.width = 100;
                break;
            case "L":
            default:
                if (this.props.fullWidth)
                    break;
                style.autoComplete.width = 150;
                break;
            case "XL":
                style.autoComplete.width = 250;
                break;
        }
        style.textField.width = style.autoComplete.width;

        return (
            <AutoComplete
                style={style.autoComplete}
                textFieldStyle={style.textField}
                floatingLabelText={this.state.title}
                floatingLabelFixed={true}
                fullWidth={this.props.fullWidth}
                disabled={this.props.disabled}
                searchText={this.state.value}
                onUpdateInput={this.handleChange}
                multiLine={true}
                rowsMax={4}
                filter={AutoComplete.fuzzyFilter}
                dataSource={this.props.dataSource}
            />


        );
    }
}

CustomAutoComplete.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    dataSource: PropTypes.array.isRequired,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
};

CustomAutoComplete.defaultProps = {
    disabled: false,
    fullWidth: false,
};
