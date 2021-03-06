import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import Colors from "../../../Util/Constants/Colors";
import AutoSuggest, {ISuggestion} from "../../../Components/AutoSuggest";
import {SearchSuggestion} from "./SearchBoxContainer";

export default class SearchBox extends React.Component<SearchBoxProps> {

    state = {
        searchText: "",
    };

    handleRequest(suggestion: ISuggestion) {
        this.setState({
            searchText: ""
        });

        this.props.onSuggestionSelected(suggestion);
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
                display: "flex" as "flex",
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
                    onSuggestionSelected={this.handleRequest.bind(this)}
                    fullWidth
                    hintText="חיפוש..."
                    maxSearchResults={10}
                    inputTextColor={Colors.white}
                />
            </div>
        );
    }
}

interface SearchBoxProps {
    suggestions: ISuggestion[];
    onSuggestionSelected: (suggestion: SearchSuggestion) => void;
    renderSuggestion: (suggestion: SearchSuggestion) => React.ReactNode;
}
