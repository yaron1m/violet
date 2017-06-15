import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue600, grey900, purple800} from 'material-ui/styles/colors';

const themeDefault = getMuiTheme({
  palette: {
  },
  appBar: {
    height: 57,
    color: purple800
  },
  drawer: {
    width: 230,
    color: grey900
  },
  raisedButton: {
    primaryColor: blue600,
  }
});


export default themeDefault;