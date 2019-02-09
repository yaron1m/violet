import React from 'react';
import PropTypes from 'prop-types';
import AbstractCustomField from "./AbstractCustomField";
import AutoSuggest, {ISuggestion} from "../AutoSuggest";

export default class CustomAutoComplete extends AbstractCustomField<CustomAutoCompleteProps> {

    render() {
        return (
            <AutoSuggest
                suggestions={this.props.suggestions ? this.props.suggestions : []}
                helperText={this.title}
                value={this.state.value ? this.state.value : ""} // A controlled element should not have null or undefined as value
                onInputChange={(newValue) => this.handleChange(newValue)}
                onSuggestionSelected={this.props.onSuggestionSelected ? this.props.onSuggestionSelected : function () {
                }}
                disabled={this.props.disabled}
                fullWidth={this.props.fullWidth}
                error={super.shouldShowError()}
                width={this.width}
            />
        );

    }
}

interface CustomAutoCompleteProps {
    suggestions?: ISuggestion[];
    fullWidth?: boolean;
    disabled?: boolean;
    onSuggestionSelected?: (suggestion: ISuggestion) => void;
}
