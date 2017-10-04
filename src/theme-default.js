import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {purple800} from 'material-ui/styles/colors';

export default function getTheme(isRtl) {
    const muiTheme = {

        palette: {},

        isRtl: isRtl,

        appBar: {
            height: 57,
            color: purple800
        },
        textField: {
           // floatingLabelColor: black,
        },

    };
    return getMuiTheme(muiTheme);
}