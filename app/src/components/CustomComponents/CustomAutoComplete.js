import React from 'react';
import PropTypes from 'prop-types';
import AbstractCustomField from "./AbstractCustomField";
import AutoSuggest from "../AutoSuggest";

export default class CustomAutoComplete extends AbstractCustomField {

    render() {
        return (
            <AutoSuggest
                suggestions={this.props.suggestions}
                helperText={this.title}
                value={this.state.value ? this.state.value : ""} // A controlled element should not have null or undefined as value
                onInputChange={(newValue) => this.handleChange(newValue)}
                onSuggestionSelected={this.props.onSuggestionSelected ? this.props.onSuggestionSelected : function(){}}
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
    onSuggestionSelected: PropTypes.func,
};

CustomAutoComplete.defaultProps = {
    disabled: false,
    fullWidth: false,
};
