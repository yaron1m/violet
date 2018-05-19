import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Colors from "./util/consts/colors";
import {createMuiTheme} from '@material-ui/core/styles';

export default function getTheme(isRtl) {
    const muiTheme = {

        palette: {},

        isRtl: isRtl,

        appBar: {
            height: 57,
            color: Colors.purple
        },
        textField: {
            floatingLabelColor: Colors.textGray,
        },

    };
    return getMuiTheme(muiTheme);
}

export const theme = createMuiTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
});