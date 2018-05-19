import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Colors from "../../../util/consts/colors";
import PropTypes from 'prop-types';
import {CustomIconButton} from "../../../components/CustomComponents/CustomButtons";
import CustomAutoSuggest from "../../../components/CustomComponents/OrderPrint/CustomAutoSuggest";
import {flexStyle} from "../../../components/CustomComponents/CustomPaper";

export default class SearchBox extends React.Component {

    constructor() {
        super();
        this.state = {
            searchText: "",
        };
    }

    handleRequest(chosenRequest, index) {
        if (index === -1) {
            return; //TODO handle enter press
        }
        this.setState({searchText: ""});

        this.props.handleRequest(chosenRequest);
    }

    render() {
        const styles = {
            iconButton: {
                float: 'left',
                margin: "-5px -5px 0 -10px",
                display: this.state.searchText === "" ? "inline-block" : "none",
            },
            autoComplete: {
                top: -14,
                marginLeft: 5,
            },
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
            input: {
                WebkitTextFillColor: "inherit",
                color: Colors.white,
            },
            hintStyle: {
                color: Colors.white,
            },
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

                <CustomAutoSuggest
                    suggestions={this.props.dataSource}
                    hintText={this.props.hintText}
                    handleRequest={this.props.handleRequest}
                    maxSearchResults={10}
                />
            </div>
        );
    }
}

SearchBox.propTypes = {
    hintText: PropTypes.string.isRequired,
    dataSource: PropTypes.array,
    handleRequest: PropTypes.func,
};
