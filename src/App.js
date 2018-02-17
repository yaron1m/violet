import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './containers/Header';
import LoginPage from './containers/pages/login-page';
import AppDialog from './containers/Messages/AppDialogContainer';
import AppSnackbar from './containers/Messages/AppSnackBarContainer';
import ThemeDefault from './theme-default';
import Colors from "./util/consts/colors";

class App extends React.Component {

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
                textAlign: "center",
                fontSize: 10,
                color: Colors.textGray,
            }
        };


        return (
            <MuiThemeProvider muiTheme={ThemeDefault(this.props.rtl)}>
                <div dir={this.props.rtl ? "rtl" : ""}>
                    <Header/>

                    <div style={styles.app}>
                        <div style={styles.container}>
                            {this.appBody()}
                        </div>
                    </div>

                    <div style={styles.footer}>Copyright v1.1.5 © 2018 C-Point LTD - All Rights Reserved</div>

                    <AppDialog/>
                    <AppSnackbar/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;