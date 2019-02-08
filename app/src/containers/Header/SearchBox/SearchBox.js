import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Colors from "../../../util/Constants/Colors";
import PropTypes from 'prop-types';
import AutoSuggest from "../../../Components/AutoSuggest";

export default class SearchBox extends React.Component {

    state = {
        searchText: "",
    };

    handleRequest(chosenRequest) {
        this.setState({
            searchText: ""
        });

        this.props.onSuggestionSelected(chosenRequest);
    }

    render() {
        const styles = {
            iconButton: {
                margin: "7px 5px 0px 5px",
            },
            container: {
                width: "100%",
                backgroundColor: Colors.lightPurple,
                borderRadius: 2,
                height: 35,
                paddingLeft: 10,
                display: "flex",
            },
        };

        return (
            <div style={styles.container}>
                <SearchIcon style={styles.iconButton}/>

                <AutoSuggest
                    suggestions={this.props.suggestions}
                    renderSuggestion={this.props.renderSuggestion}
                    value={this.state.searchText}
                    onInputChange={searchText => this.setState({searchText})}
                    fullWidth
                    hintText={this.props.hintText}
                    onSuggestionSelected={this.handleRequest.bind(this)}
                    maxSearchResults={10}
                    inputTextColor={Colors.white}
                />
            </div>
        );
    }
}

SearchBox.propTypes = {
    hintText: PropTypes.string.isRequired,
    suggestions: PropTypes.array,
    onSuggestionSelected: PropTypes.func,
    renderSuggestion: PropTypes.func,
};
