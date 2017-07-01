import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './containers/site-header';
import RightDrawer from './containers/right-drawer';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import ThemeDefault from './theme-default';
import LectureForm from './containers/LectureForm/lecture-form';
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
        let {navDrawerOpen} = this.state;
        const paddingRightDrawerOpen = 236;

        const styles = {
            header: {
                paddingRight: navDrawerOpen ? paddingRightDrawerOpen : 0
            },
            container: {
                margin: '80px 20px 20px 15px',
                paddingRight: navDrawerOpen && this.props.width !== SMALL ? paddingRightDrawerOpen : 0
            }
        };

        return (
            <MuiThemeProvider muiTheme={ThemeDefault}>
                <div>
                    <Header styles={styles.header}
                            handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}
                    />

                    <RightDrawer navDrawerOpen={navDrawerOpen}
                                 menus={Data.menus}
                                 userName="User Admin"
                    />


                    <div className="AppContainer" style={styles.container}>
                        <LectureForm/>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}


export default withWidth()(App);
