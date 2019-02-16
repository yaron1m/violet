import Colors from './Util/Constants/Colors';
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
    typography: {
        useNextVariants: true,
    }
});
