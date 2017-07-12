import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {black, grey900, purple800} from 'material-ui/styles/colors';

const muiTheme = {

    palette: {

    },

    isRtl:true,

    appBar: {
        height: 57,
        color: purple800
    },
    drawer: {
        width: 230,
        color: grey900
    },
    textField: {
        floatingLabelColor: black,
        // height:1000
    },

};

export default getMuiTheme(muiTheme);