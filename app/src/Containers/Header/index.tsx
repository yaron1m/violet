import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import SearchBoxContainer from './SearchBox/SearchBoxContainer';
import LeftIconsContainer from './LeftIcons/LeftIconsContainer';
import HomeButton from './HomeButton'
import Toolbar from '@material-ui/core/Toolbar';

export default class Header extends React.Component {

    render() {
        const style = {
            appBar: {
                position: 'fixed' as 'fixed',
                top: 0,
                maxHeight: 65,
                paddingBottom: 7,
                paddingLeft: 20,
                paddingRight: 20,
            },
        };

        return (
            <AppBar
                style={style.appBar}
            >
                <Toolbar>
                    <HomeButton/>
                    <SearchBoxContainer/>
                    <LeftIconsContainer/>
                </Toolbar>
            </AppBar>
        );
    }
}