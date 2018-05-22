import React from 'react';
import PropTypes from 'prop-types';
import ReactAutoSuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';

function renderInput(inputProps) {
    const {classes, ref, helperText, hintText, fullWidth, disabled, ...other} = inputProps;

    return (
        <TextField
            fullWidth={fullWidth}
            disabled={disabled}
            helperText={helperText}
            className={classes.textField}
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

function renderSuggestion(suggestion, {query, isHighlighted}) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={String(index)} style={{fontWeight: 300}}>
              {part.text}
            </span>
                    ) : (
                        <strong key={String(index)} style={{fontWeight: 500}}>
                            {part.text}
                        </strong>
                    );
                })}
            </div>
        </MenuItem>
    );
}

function renderSuggestionsContainer(options) {
    const {containerProps, children} = options;

    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    );
}

function getSuggestionValue(suggestion) {
    return suggestion.label;
}

function getSuggestions(value, suggestions, maxSearchResults) {
    const inputValue = value.trim().toLowerCase();
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
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    textField: {
        marginRight: 20,
        marginBottom: 10,
        verticalAlign: "bottom",
    },
});

class AutoSuggest extends React.Component {
    state = {
        value: '',
        suggestions: [],
    };

    handleSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: getSuggestions(value, this.props.suggestions, this.props.maxSearchResults),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChangeInTextField = (event, {newValue}) => {
        this.setState({
            value: newValue,
        });

        this.props.onInputChange(newValue);
    };

    render() {
        const {classes} = this.props;

        const containerClass = classes.container + (this.props.fullWidth ?
            " " + classes.fullWidth : "");

        return (
            <ReactAutoSuggest
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
                renderSuggestion={renderSuggestion}
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
                        width: this.props.width
                    }
                }}
            />
        );
    }
}

AutoSuggest.propTypes = {
    // Style
    classes: PropTypes.object.isRequired,

    /*
     * suggestion format:
     * {
     *    label,
     *    otherInfo
     * }
     */
    suggestions: PropTypes.array.isRequired,


    // Text field
    value: PropTypes.string,
    onInputChange: PropTypes.func.isRequired, // Returns the label (string)
    onSuggestionSelected: PropTypes.func.isRequired, // Returns the suggestion selected (object)
    helperText: PropTypes.string,
    hintText: PropTypes.string,
    error: PropTypes.bool,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    maxSearchResults: PropTypes.number,
    width: PropTypes.number,
};

AutoSuggest.defaultProps = {
    maxSearchResults: 10,
};

export default withStyles(styles)(AutoSuggest);

export function toSuggestions(suggestions) {
    return suggestions.map(label => {
        return {label};
    });
}