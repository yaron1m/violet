import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './containers/header';
import RightDrawer from './containers/header/right-drawer';
import ThemeDefault from './theme-default';

class App extends React.Component {

    render() {
        const styles = {
            container: {
                margin: '80px 20px 20px 15px',
            }
        };

        return (
            <MuiThemeProvider muiTheme={ThemeDefault}>
                <div>
                    <Header/>

                    <RightDrawer />

                    <div style={styles.container}>
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}


export default App;
