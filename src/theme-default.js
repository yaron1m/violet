import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {black, grey900, purple800} from 'material-ui/styles/colors';


export default function getTheme(isRtl) {
    const muiTheme = {

        palette: {},

        isRtl: isRtl,

        appBar: {
            height: 57,
            color: purple800
        },
        drawer: {
            width: 230,
            color: grey900
        },
        textField: {
           // floatingLabelColor: black,
        },

    };
    return getMuiTheme(muiTheme);
}