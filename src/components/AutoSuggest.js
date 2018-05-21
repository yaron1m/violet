import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';
import CustomPaperTable from "./tables/CustomPaperTable";

function renderInput(inputProps) {
    const {classes, ref, helperText, hintText, ...other} = inputProps;

    return (
        <TextField
            fullWidth
            helperText={helperText}
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

    const result = suggestions.filter(suggestion => {
        const keep = count < maxSearchResults && suggestion.label.toLowerCase().includes(inputValue);

        if (keep) {
            count += 1;
        }

        return keep;
    });

    return result;
}

const styles = theme => ({
    container: {
        flexGrow: 1,
        position: 'relative',
        height: 250,
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

        return (
            <Autosuggest
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
                    value: this.props.value,
                    onChange: this.handleChangeInTextField,
                    helperText: this.props.helperText,
                    hintText: this.props.hintText,
                    error: this.props.error,
                }}
            />
        );
    }
}

AutoSuggest.propTypes = {
    // Style
    classes: PropTypes.object.isRequired,

    suggestions: PropTypes.array.isRequired,


    // Text field
    value: PropTypes.string,
    helperText: PropTypes.string,
    error: PropTypes.bool,
    hintText: PropTypes.string,
    onInputChange: PropTypes.func.isRequired,

    maxSearchResults: PropTypes.number,


    requiredFields: PropTypes.array,
    fullWidth: PropTypes.bool,


//     style={style.autoComplete}
// textFieldStyle={style.textField}
// floatingLabelText={this.title}
// floatingLabelFixed={true}
// fullWidth={this.props.fullWidth}
// disabled={this.props.disabled}
// searchText={this.state.value}
// onUpdateInput={(searchText) => super.handleChange(searchText)}
// onNewRequest={this.props.onNewRequest}
// multiLine={true}
// rowsMax={4}
// dataSource={this.props.dataSource}
// errorText={this.getErrorText()}
};

AutoSuggest.defaultProps = {
    maxSearchResults: 10,
};

/*
 * input type:
 * {
 *    value,
 *    text,
 *    info,
 * }
 */

export default withStyles(styles)(AutoSuggest);
