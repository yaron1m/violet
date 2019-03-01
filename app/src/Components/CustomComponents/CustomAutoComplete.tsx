import React from "react";
import {AbstractCustomFieldProps} from "./AbstractCustomFieldProps";
import AutoSuggest, {ISuggestion} from "../AutoSuggest";
import {getFieldWidth} from "../../Util/Constants/Size";

export default function CustomAutoComplete(props: CustomAutoCompleteProps) {
    return (
        <AutoSuggest
            suggestions={props.suggestions || []}
            helperText={props.title}
            value={props.value || ""} // A controlled element should not have null or undefined as value
            onInputChange={props.onChange}
            onSuggestionSelected={props.onSuggestionSelected || function () {
            }}
            disabled={props.disabled}
            fullWidth={props.fullWidth}
            error={props.isRequired && !props.value}
            width={getFieldWidth(props.fullWidth, props.size)}
        />
    );
}

interface CustomAutoCompleteProps extends AbstractCustomFieldProps<string> {
    suggestions?: ISuggestion[];
    fullWidth?: boolean;
    disabled?: boolean;
    onSuggestionSelected?: (suggestion: ISuggestion) => void;
}
