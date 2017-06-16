import React from 'react';
import TextField from 'material-ui/TextField';
import {white, purple500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import labels from '../lables.json';


const SearchBox = () => {
  const styles = {
    iconButton: {
      float: 'right',
      paddingTop: 17
    },
    textField: {
      color: white,
      backgroundColor: purple500,
      borderRadius: 2,
      height: 35,
      paddingRight:10,
    },
    inputStyle: {
      webkitTextFillColor: white,
      paddingRight: 5
    },
    hintStyle: {
      height: 16,
      paddingLeft: 5,
      color: white
    }
  };

  return (
    <div>
      <IconButton style={styles.iconButton} >
        <Search color={white} />
      </IconButton>
      <TextField
        hintText={labels.header.search}
        underlineShow={false}
        fullWidth={true}
        style={styles.textField}
        inputStyle={styles.inputStyle}
        hintStyle={styles.hintStyle}
      />
    </div>
  );
};

export default SearchBox;
