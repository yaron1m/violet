import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import AbstractCustomField from "./AbstractCustomField";

export default class CustomAutoComplete extends AbstractCustomField {

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
                onUpdateInput={(searchText) => super.handleChange(searchText)}
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
    ...AbstractCustomField.propTypes,
    dataSource: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    onNewRequest: PropTypes.func,
};

CustomAutoComplete.defaultProps = {
    disabled: false,
    fullWidth: false,
};
