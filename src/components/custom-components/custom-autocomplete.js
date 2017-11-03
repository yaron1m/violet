import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import * as _ from "lodash";
import Sizes from "../../util/consts/sizes";

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
            case Sizes.S:
                style.autoComplete.width = 50;
                break;
            case Sizes.M:
                style.autoComplete.width = 100;
                break;
            case Sizes.L:
            default:
                if (this.props.fullWidth)
                    break;
                style.autoComplete.width = 150;
                break;
            case Sizes.XL:
                style.autoComplete.width = 250;
                break;
        }
        style.textField.width = style.autoComplete.width;

        let showError = false;
        if (!this.state.value && !_.isEmpty(this.props.data.requiredFields) && _.includes(this.props.data.requiredFields, this.state.name))
            showError = true;

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
                onNewRequest={this.props.onNewRequest}
                multiLine={true}
                rowsMax={4}
                dataSource={this.props.dataSource}
                errorText={showError ? "שדה חובה" : ""}
            />//TODO extract string to labels


        );
    }
}

CustomAutoComplete.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    dataSource: PropTypes.array.isRequired,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    onNewRequest: PropTypes.func,
};

CustomAutoComplete.defaultProps = {
    disabled: false,
    fullWidth: false,
};
