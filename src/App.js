import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './containers/Header';
import LoginPage from './containers/Pages/LoginPage/LoginPageContainer';
import AppDialog from './containers/Messages/AppDialogContainer';
import AppSnackbar from './containers/Messages/AppSnackBarContainer';
import ThemeDefault from './theme-default';
import Colors from "./util/consts/colors";
import PropTypes from 'prop-types';

export default class App extends React.Component {

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

                    <div style={styles.footer}>Copyright v1.2.1 © {(new Date()).getFullYear()} C-Point LTD - All Rights Reserved</div>

                    <AppDialog/>
                    <AppSnackbar/>
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    isLoggedIn: PropTypes.bool,
    rtl: PropTypes.bool,
    children: PropTypes.array,
};