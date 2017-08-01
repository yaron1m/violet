import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './containers/header';
import RightDrawer from './containers/header/right-drawer';
import LoginPage from './containers/pages/login-page';
import AppDialog from './containers/messages/app-dialog';
import AppSnackbar from './containers/messages/app-snackbar';
import ThemeDefault from './theme-default';


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
            container: {
                margin: '80px 20px 20px 15px',
            },
            footer: {
                marginBottom: 5,
                textAlign: "center",
                fontSize: 10,
                color: "gray"
            }
        };


        return (
            <MuiThemeProvider muiTheme={ThemeDefault(this.props.rtl)}>
                <div dir={this.props.rtl? "rtl" : ""}>
                    <Header/>

                    <RightDrawer/>

                    <div style={styles.container}>
                        {this.appBody()}
                    </div>

                    <div style={styles.footer}>Copyright © 2017 C-Point LTD - All Rights Reserved</div>

                    <AppDialog/>
                    <AppSnackbar/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;