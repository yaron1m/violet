import React from 'react';
import PropTypes from 'prop-types';
import AbstractCustomField from "./AbstractCustomField";
import AutoSuggest from "../AutoSuggest";

export default class CustomAutoComplete extends AbstractCustomField {

    render() {
        // const style = {
        //     autoComplete: {
        //         marginRight: 20,
        //         width: this.width,
        //     },
        //     textField: {
        //         verticalAlign: "bottom",
        //         marginBottom: 10,
        //         width: this.width,
        //     },
        // };

        return (
            <AutoSuggest
                suggestions={this.props.suggestions}
                helperText={this.title}
                value={this.state.value ? this.state.value : ""} // A controlled element should not have null or undefined as value
                onInputChange={(newValue) => this.handleChange(newValue)}
                onSuggestionSelected={this.props.onNewRequest}
                disabled={this.props.disabled}
                fullWidth={this.props.fullWidth}
                error={super.shouldShowError()}
                width={this.width}
            />
        );

    }
}

CustomAutoComplete.propTypes = {
    ...AbstractCustomField.propTypes,
    suggestions: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    onNewRequest: PropTypes.func,
};

CustomAutoComplete.defaultProps = {
    disabled: false,
    fullWidth: false,
    onNewRequest: function(){},
};
