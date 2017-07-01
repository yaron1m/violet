import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import {white} from 'material-ui/styles/colors';
import SearchBox from './search-box';
import {IconMenu, MenuItem} from "material-ui";
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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

                                <IconMenu color={white}
                                          iconButtonElement={
                                              <IconButton><MoreVertIcon color={white}/></IconButton>
                                          }
                                          targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                >
                                    <MenuItem primaryText="Sign out"/>
                                </IconMenu>
                            </div>
                        }
                />
            </div>
        );
    }
}

export default Header;
