import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './containers/header';
import RightDrawer from './containers/header/right-drawer';
import LoginPage from './containers/pages/login-page';
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
            <MuiThemeProvider muiTheme={ThemeDefault}>
                <div>
                    <Header/>

                    <RightDrawer/>

                    <div style={styles.container}>
                        {this.appBody()}
                    </div>

                    <div style={styles.footer}>Copyright © 2017 C-Point LTD - All Rights Reserved</div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;