import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import AbstractField from "./abstract-field";

export default class CustomAutoComplete extends AbstractField {

    render() {
        const style = {
            autoComplete: {
                marginRight: 20,
                width: this.width,
            },
            textField: {
                verticalAlign: "bottom",
                marginBottom: 10,
                width: this.width,
            },
        };

        return (
            <AutoComplete
                style={style.autoComplete}
                textFieldStyle={style.textField}
                floatingLabelText={this.title}
                floatingLabelFixed={true}
                fullWidth={this.props.fullWidth}
                disabled={this.props.disabled}
                searchText={this.state.value}
                onUpdateInput={(searchText, dataSource, params) => super.handleChange(searchText)}
                onNewRequest={this.props.onNewRequest}
                multiLine={true}
                rowsMax={4}
                dataSource={this.props.dataSource}
                errorText={this.getErrorText()}
            />
        );
    }
}

CustomAutoComplete.propTypes = {
    ...AbstractField.propTypes,
    dataSource: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    onNewRequest: PropTypes.func,
};

CustomAutoComplete.defaultProps = {
    disabled: false,
    fullWidth: false,
};
