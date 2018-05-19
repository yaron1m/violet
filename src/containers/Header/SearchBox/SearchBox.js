import React from 'react';
import SearchIcon from 'material-ui-icons/Search';
import AutoComplete from 'material-ui/AutoComplete';
import Colors from "../../../util/consts/colors";
import PropTypes from 'prop-types';
import {CustomIconButton} from "../../../components/CustomComponents/CustomButtons";

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
                backgroundColor: Colors.lightPurple,
                borderRadius: 2,
                height: 35,
                paddingLeft: 10,
                marginRight: 10,
                marginTop: 15,
            },
            input: {
                WebkitTextFillColor: "inherit",
                color: Colors.white,
            },
            hintStyle: {
                color: Colors.white,
            },
        };

        return (
            <div style={styles.container}>
                <CustomIconButton style={styles.iconButton}>
                    <SearchIcon color={Colors.white}/>
                </CustomIconButton>

                <AutoComplete
                    dataSource={this.props.dataSource}
                    hintText={this.props.hintText}
                    searchText={this.state.searchText}
                    filter={AutoComplete.caseInsensitiveFilter}

                    onNewRequest={this.handleRequest.bind(this)}
                    onUpdateInput={(searchText) => this.setState({searchText: searchText})}

                    maxSearchResults={10}
                    underlineShow={false}
                    fullWidth={true}

                    inputStyle={styles.input}
                    style={styles.autoComplete}
                    hintStyle={styles.hintStyle}
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
