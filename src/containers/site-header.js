import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import {white} from 'material-ui/styles/colors';
import SearchBox from './search-box';
import SaveIcon from 'material-ui/svg-icons/content/save';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import PrintIcon from 'material-ui/svg-icons/action/print';

class Header extends React.Component {

    render() {
        const {styles, handleChangeRequestNavDrawer} = this.props;

        const style = {
            appBar: {
                position: 'fixed',
                top: 0,
                overflow: 'hidden',
                maxHeight: 65,
                paddingBottom: 7,
                // paddingLeft: 20,
                paddingRight: 20,
            },
            menuButton: {
                marginRight: -20,
                marginTop: 3
            },
            iconsRightContainer: {
                //marginLeft: 20,
                marginTop: 3
            },
        };

        return (
            <AppBar
                style={{...styles, ...style.appBar}}
                title={<SearchBox /> }
                iconElementLeft={
                    <IconButton style={style.menuButton}
                                onClick={handleChangeRequestNavDrawer}
                    >
                        <Menu color={white}/>
                    </IconButton>
                }
                iconElementRight={
                    <div style={style.iconsRightContainer}>
                        <IconButton><SaveIcon color={white}/></IconButton>
                        <IconButton><ClearIcon color={white}/></IconButton>
                        <IconButton><PrintIcon color={white}/></IconButton>
                    </div>
                }
            />
        );
    }
}

export default Header;
