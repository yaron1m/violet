import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Colors from "../../../util/consts/colors";
import PropTypes from 'prop-types';
import {CustomIconButton} from "../../../components/CustomComponents/CustomButtons";
import AutoSuggest from "../../../components/AutoSuggest";
import {flexStyle} from "../../../components/CustomComponents/CustomPaper";

export default class SearchBox extends React.Component {

    constructor() {
        super();
        this.state = {
            searchText: "",
        };
    }

    handleRequest(chosenRequest) {
        this.setState({searchText: ""});

        this.props.onSuggestionSelected(chosenRequest);
    }

    render() {
        const styles = {
            iconButton: {
                float: 'left',
                margin: "-5px -5px 0 -10px",
                display: this.state.searchText === "" ? "inline-block" : "none",
            },
            // autoComplete: {
            //     top: -14,
            //     marginLeft: 5,
            // },
            container: {
                width: "100%",
                backgroundColor: Colors.lightPurple,
                borderRadius: 2,
                height: 35,
                paddingLeft: 10,
                marginRight: 10,
                marginTop: 15,
                ...flexStyle
            },
            // input: {
            //     WebkitTextFillColor: "inherit",
            //     color: Colors.white,
            // },
            // hintStyle: {
            //     color: Colors.white,
            // },
        };
        //TODO add icon color
        //TODO render each suggestion with the component I created in the container
        return (
            <div
                style={styles.container}
            >
                <CustomIconButton style={styles.iconButton}>
                    <SearchIcon
                        // color={Colors.white}
                    />
                </CustomIconButton>

                <AutoSuggest
                    suggestions={this.props.suggestions}
                    value={this.state.searchText}
                    onInputChange={searchText => this.setState({searchText})}
                    fullWidth
                    hintText={this.props.hintText}
                    onSuggestionSelected={this.handleRequest.bind(this)}
                    maxSearchResults={10}
                />
            </div>
        );
    }
}

SearchBox.propTypes = {
    hintText: PropTypes.string.isRequired,
    suggestions: PropTypes.array,
    onSuggestionSelected: PropTypes.func,
};
