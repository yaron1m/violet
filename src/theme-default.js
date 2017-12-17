import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Colors from "./util/consts/colors";

export default function getTheme(isRtl) {
    const muiTheme = {

        palette: {},

        isRtl: isRtl,

        appBar: {
            height: 57,
            color: Colors.purple
        },
        textField: {
           // floatingLabelColor: black,
        },

    };
    return getMuiTheme(muiTheme);
}