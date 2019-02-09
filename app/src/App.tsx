import React from 'react';
import Header from './containers/Header';
import LoginPage from './Pages/LoginPage/LoginPageContainer';
import AppDialog from './containers/Messages/AppDialogContainer';
import AppSnackbar from './containers/Messages/AppSnackBarContainer';
import {theme} from './ThemeDefault';
import Colors from "./Util/Constants/Colors";
import {MuiThemeProvider} from '@material-ui/core/styles';
import RTL from "./jss-rtl";

export default class App extends React.Component<AppProps> {

    appBody() {
        if (this.props.isLoggedIn)
            return this.props.children;

        if (this.props.isLoggedIn === undefined) {
            return <div/>;
        }
        return <LoginPage/>;
    }

    render() {
        const styles = {
            app: {
                maxWidth: 1200,
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: 80,
            },
            container: {
                marginLeft: 20,
                marginRight: 20,
            },
            footer: {
                marginBottom: 5,
                marginTop: 10,
                textAlign: "center" as 'center',
                fontSize: 10,
                color: Colors.textGray,
            }
        };


        return (
            <MuiThemeProvider theme={theme}>
                <RTL>
                    <div dir={this.props.rtl ? "rtl" : ""}>

                        <Header/>

                        <div style={styles.app}>
                            <div style={styles.container}>
                                {this.appBody()}
                            </div>
                        </div>

                        <div style={styles.footer}>
                            Copyright v4.0.0 © {(new Date()).getFullYear()} C-Point LTD - All Rights Reserved
                        </div>

                        <AppDialog/>
                        <AppSnackbar/>
                    </div>
                </RTL>
            </MuiThemeProvider>
        );
    }
}

interface AppProps {
    isLoggedIn?: boolean;
    rtl?: boolean;
    children: React.ReactNode;
}
