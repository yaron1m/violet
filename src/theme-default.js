import Colors from "./util/consts/colors";
import {createMuiTheme} from '@material-ui/core/styles';

export const theme = createMuiTheme({
    direction: 'rtl',
    palette: {
        primary: {
            light: '#757ce8',
            main: Colors.purple,
            dark: '#002884',
            contrastText: '#ffffff',
        },
    },
});
