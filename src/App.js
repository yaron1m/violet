import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './containers/site-header';
import RightDrawer from './containers/right-drawer';
import withWidth, {LARGE} from 'material-ui/utils/withWidth';
import ThemeDefault from './theme-default';
import Data from './data';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navDrawerOpen: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.width !== nextProps.width) {
            this.setState({navDrawerOpen: nextProps.width === LARGE});
        }
    }

    handleChangeRequestNavDrawer() {
        this.setState({
            navDrawerOpen: !this.state.navDrawerOpen
        });
    }

    render() {
        const styles = {
            container: {
                margin: '80px 20px 20px 15px',
            }
        };

        return (
            <MuiThemeProvider muiTheme={ThemeDefault}>
                <div>
                    <Header
                        navDrawerOpen={this.state.navDrawerOpen}
                        handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}
                    />

                    <RightDrawer
                        navDrawerOpen={this.state.navDrawerOpen}
                        menus={Data.menus}
                        userName="User Admin"
                    />

                    <div className="AppContainer" style={styles.container}>
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}


export default withWidth()(App);
