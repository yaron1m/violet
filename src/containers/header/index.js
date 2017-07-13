import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import {white} from 'material-ui/styles/colors';
import SearchBox from './search-box';
import SaveIcon from 'material-ui/svg-icons/content/save';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import PrintIcon from 'material-ui/svg-icons/action/print';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {changeDrawerState} from "../../actions/action-drawer";
import {connect} from "react-redux";

class Header extends React.Component {

    render() {
        const style = {
            appBar: {
                position: 'fixed',
                top: 0,
                overflow: 'hidden',
                maxHeight: 65,
                paddingBottom: 7,
                paddingLeft: 20 + (this.props.drawerOpen.isOpen ? this.props.muiTheme.drawer.width : 0),
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
                style={style.appBar}
                title={<SearchBox /> }
                iconElementLeft={
                    <IconButton style={style.menuButton}
                               onClick={()=>this.props.dispatch(changeDrawerState())}
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

function mapStateToProps(state) {
    return {
        drawerOpen: state.drawerOpen,
    };
}

export default connect(mapStateToProps)(muiThemeable() (Header));
