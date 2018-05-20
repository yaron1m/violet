import React from 'react';
import PropTypes from 'prop-types';
import AutoSuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';

function renderInput(inputProps) {
    const {classes, ref, ...other} = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: ref,
                classes: {
                    input: classes.input,
                },
                ...other,
            }}
        />
    );
}

function renderSuggestion(suggestion, {query, isHighlighted}) {
    const matches = match(suggestion.text, query);
    const parts = parse(suggestion.text, matches);

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
    return suggestion.text;
}

function getSuggestions(value, suggestions, maxSearchResults) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep = count < maxSearchResults && suggestion.text.toLowerCase().includes(inputValue);

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

const styles = theme => ({
    container: {
        flexGrow: 1,
        position: 'relative',
        height: 35,
        top: -14,

    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
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
});

class CustomAutoSuggest extends React.Component {
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

    handleChange = (event, {newValue}) => {
        this.setState({
            value: newValue,
        });
        //console.log(newValue);
        //this.props.handleRequest(chosenRequest);
    };

    onSuggestionSelected(event, {suggestion}) {
        this.props.handleRequest(suggestion);
    }

    render() {
        const {classes} = this.props;
        //console.log(this.props.suggestions[0]);
        return (
            <AutoSuggest
                theme={{
                    container: classes.container,
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
                inputProps={{
                    classes,
                    placeholder: this.props.hintText,
                    value: this.state.value,
                    onChange: this.handleChange,
                }}


                onSuggestionSelected={this.onSuggestionSelected.bind(this)}
            />
        );
    }
}

CustomAutoSuggest.propTypes = {
    suggestions: PropTypes.array.isRequired,
    handleRequest: PropTypes.func,
    hintText: PropTypes.string,
    maxSearchResults: PropTypes.number,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomAutoSuggest);
