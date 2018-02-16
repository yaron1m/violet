import React from 'react';
import AppBar from 'material-ui/AppBar';
import SearchBoxContainer from './SearchBox/SearchBoxContainer';
import LeftIconsContainer from './LeftIcons/LeftIconsContainer';
import HomeButton from './HomeButton'

export default class Header extends React.Component {

    render() {
        const style = {
            appBar: {
                position: 'fixed',
                top: 0,
                overflow: 'hidden',
                maxHeight: 65,
                paddingBottom: 7,
                paddingLeft: 20,
                paddingRight: 20,
            },
        };

        return (
            <AppBar
                style={style.appBar}
                iconElementLeft={<HomeButton/>}
                title={<SearchBoxContainer/>}
                iconElementRight={<LeftIconsContainer/>}
            />
        );
    }
}