import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './components/Header';
// import LeftDrawer from './components/LeftDrawer';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import ThemeDefault from './theme-default';
import LectureForm from './containers/LectureForm/LectureForm';
// import Web from 'material-ui/svg-icons/av/web';


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

    // handleChangeRequestNavDrawer() {
    //     this.setState({
    //         navDrawerOpen: !this.state.navDrawerOpen
    //     });
    // }

    render() {
        let { navDrawerOpen } = this.state;
        const paddingRightDrawerOpen = 236;

        const styles = {
            header: {
                paddingLeft: navDrawerOpen ? paddingRightDrawerOpen : 0
            },
            container: {
                margin: '80px 20px 20px 15px',
                paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingRightDrawerOpen : 0
            }
        };

        return (
            <MuiThemeProvider muiTheme={ThemeDefault}>
                <div>
                    <Header styles={styles.header}
                            //handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}
                    />

                    {/*<LeftDrawer navDrawerOpen={navDrawerOpen}*/}
                                {/*menus={{ text: 'DashBoard', icon: <Web/>, link: '/dashboard' }}*/}
                                {/*username="User Admin"/>*/}


                    <div className="AppContainer" style={styles.container}>
                        <LectureForm/>
                    </div>

                </div>
            </MuiThemeProvider>
        );
    }
}


export default withWidth()(App);
