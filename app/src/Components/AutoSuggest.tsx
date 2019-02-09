import React from 'react';
import * as ReactAutoSuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';

function renderInput(inputProps: ReactAutoSuggest.InputProps<ISuggestion>) {
    const {classes, ref, helperText, hintText, fullWidth, disabled, ...other} = inputProps;

    return (
        <TextField
            fullWidth={fullWidth}
            disabled={disabled}
            helperText={helperText}
            className={classes.textField}
            // @ts-ignore
            InputProps={{
                inputRef: ref,
                classes: {
                    input: classes.input,
                },
                placeholder: hintText,
                ...other,
            }}
        />
    );
}

function renderSuggestionItem(suggestion: ISuggestion, renderSuggestion?: (suggestion: ISuggestion) => React.ReactNode) {
    return (
        <MenuItem component="div">
            <div>
                {renderSuggestion === undefined ? suggestion.label : renderSuggestion(suggestion)}
            </div>
        </MenuItem>
    );
}

function renderSuggestionsContainer(options: ReactAutoSuggest.RenderSuggestionsContainerParams) {
    const {containerProps, children} = options;

    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    );
}

function getSuggestionValue(suggestion: ISuggestion) {
    return suggestion.label;
}

function getSuggestions(value: string, suggestions: ISuggestion[], maxSearchResults: number) {
    const inputValue = value.toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    if (inputLength === 0)
        return [];

    return suggestions.filter(suggestion => {
        const keep = count < maxSearchResults && suggestion.label.toLowerCase().includes(inputValue);

        if (keep) {
            count += 1;
        }

        return keep;
    });
}

const styles = () => ({
    fullWidth: {
        width: "100%",
    },
    container: {
        position: 'relative' as 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute' as 'absolute',
        zIndex: 1,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block' as 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none' as 'none',
    },
    textField: {
        marginRight: 20,
        marginBottom: 10,
        verticalAlign: "bottom" as "bottom",
    },
});

class AutoSuggest extends React.Component<AutoSuggestProps> {
    state = {
        value: '',
        suggestions: [],
    };

    maxSearchResults = this.props.maxSearchResults ? this.props.maxSearchResults : 10;

    handleSuggestionsFetchRequested = ({value}: ReactAutoSuggest.SuggestionsFetchRequestedParams) => {
        this.setState({
            suggestions: getSuggestions(value, this.props.suggestions, this.maxSearchResults),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChangeInTextField = (event: React.FormEvent<any>, params: { newValue: string }) => {
        this.setState({
            value: params.newValue,
        });

        this.props.onInputChange(params.newValue);
    };

    render() {
        const {classes} = this.props;

        const containerClass = classes.container + (this.props.fullWidth ?
            " " + classes.fullWidth : "");

        return (
            <ReactAutoSuggest.default
                theme={{
                    container: containerClass,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderInputComponent={renderInput}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                renderSuggestionsContainer={renderSuggestionsContainer}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={suggestion => renderSuggestionItem(suggestion, this.props.renderSuggestion)}
                onSuggestionSelected={(event, {suggestion}) => this.props.onSuggestionSelected(suggestion)}
                inputProps={{
                    classes,
                    value: this.props.value,
                    onChange: this.handleChangeInTextField,
                    helperText: this.props.helperText,
                    hintText: this.props.hintText,
                    error: this.props.error,
                    fullWidth: this.props.fullWidth,
                    disabled: this.props.disabled,
                    style: {
                        width: this.props.width,
                        color: this.props.inputTextColor,
                    }
                }}
            />
        );
    }
}

export interface ISuggestion {
    label: string;
}

interface AutoSuggestProps {
    // Style
    classes?: any;

    suggestions: ISuggestion[];
    renderSuggestion?: (suggestion: ISuggestion) => React.ReactNode;

    // Text field
    value: string;
    onInputChange: (label: string) => void; // Returns the label (string)
    onSuggestionSelected: (suggestion: ISuggestion) => void; // Returns the suggestion selected (object)
    helperText?: string;
    hintText?: string;
    error?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
    maxSearchResults?: number;
    width?: number | string;
    inputTextColor?: string;
}

export default withStyles(styles)(AutoSuggest);

export function toSuggestions(suggestions: string[]): ISuggestion[] {
    return suggestions.map(label => ({
        label
    }));
}