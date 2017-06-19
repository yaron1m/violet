import React from 'react';
import {white, purple600} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import labels from '../lables.json';
import AutoComplete from 'material-ui/AutoComplete';

const SearchBox = () => {
    const styles = {
        iconButton: {
            float: 'right',
            paddingTop: 21,
        },
        textField: {
            backgroundColor: purple600,
            borderRadius: 2,
            height: 35,
            paddingRight: 10,
            color:white,
        },
        white: {
            WebkitTextFillColor: "inherit",
            color:white,
        },
        hintStyle: {
            height: 16,
            //paddingLeft: 5,
            color:white,
        },
    };

    const dataSource = ["asdasd", "מכבי", "רפאל"];

    return (
        <div className="this is search box">
            <IconButton style={styles.iconButton}>
                <Search color={white}/>
            </IconButton>
            <AutoComplete
                dataSource={dataSource}
                // onUpdateInput = {this.onUpdateInput}
                hintText={labels.header.search}
                underlineShow={false}
                fullWidth={true}
                inputStyle={styles.white}
                textFieldStyle={styles.textField}
                hintStyle={styles.hintStyle}
            />
        </div>
    );
};

export default SearchBox;
