import React, {PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/svg-icons/navigation/menu';
import ViewModule from 'material-ui/svg-icons/action/view-module';
import {white} from 'material-ui/styles/colors';
import SearchBox from './SearchBox';

class Header extends React.Component {

  render() {
    const {styles, handleChangeRequestNavDrawer} = this.props;

    const style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57,
        paddingLeft:24 ,
        paddingRight: 0
      },
      menuButton: {
        marginLeft: 10
      },
      iconsRightContainer: {
        marginLeft: 20
      }
    };

    return (
        <div>
            <AppBar
              style={{...styles, ...style.appBar}}
              title={
                <SearchBox />
              }
               iconElementLeft={
                   <IconButton style={style.menuButton}
                               //onClick={handleChangeRequestNavDrawer}
                       >
                     <Menu color={white} />
                   </IconButton>
               }
            //   iconElementRight={
            //     <div style={style.iconsRightContainer}>
            //       <IconMenu color={white}
            //                 iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            //                 anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            //                 targetOrigin={{horizontal: 'right', vertical: 'top'}}
            //       >
            //         <MenuItem primaryText="Sign out"/>
            //       </IconMenu>
            //     </div>
            //   }
            />
          </div>
      );
  }
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func
};

export default Header;
