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
            },
            menuButton: {
                marginLeft: 10,
                marginTop: 3
            },
            iconsRightContainer: {
                marginRight: 20,
                marginTop: 3
            },
            title: {
                paddingLeft: 50,
            }
        };

        return (
            <div>
                <AppBar className="this is app bar"
                        style={{...styles, ...style.appBar}}
                        title={
                            <SearchBox />
                        }
                        titleStyle={style.title}
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
            </div>
        );
    }
}

export default Header;
