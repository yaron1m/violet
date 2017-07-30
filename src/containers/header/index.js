import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import {white} from 'material-ui/styles/colors';
import SearchBox from './search-box';
import MoreIcon from 'material-ui/svg-icons/navigation/more-vert';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {changeDrawerState} from "../../store/appearance/actions";
import {connect} from "react-redux";
import {isDrawerOpen} from "../../store/appearance/reducer";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import {signOutRequest} from "../../store/firebase/actions";
import {getLabels} from "../../store/labels/reducer";

class Header extends React.Component {

    render() {
        const style = {
            appBar: {
                position: 'fixed',
                top: 0,
                overflow: 'hidden',
                maxHeight: 65,
                paddingBottom: 7,
                paddingLeft: 20 + (this.props.isDrawerOpen ? this.props.muiTheme.drawer.width : 0),
                paddingRight: 20,
            },
            menuButton: {
                marginRight: -20,
                marginTop: 3
            },
            iconsRightContainer: {
                marginTop: 3
            },
        };

        return (
            <AppBar
                style={style.appBar}
                title={<SearchBox/>}
                iconElementLeft={
                    <IconButton style={style.menuButton}
                                onClick={() => this.props.dispatch(changeDrawerState())}
                    >
                        <Menu color={white}/>
                    </IconButton>
                }
                iconElementRight={
                    <div style={style.iconsRightContainer}>
                        <IconMenu
                            iconButtonElement={<IconButton><MoreIcon color={white}/></IconButton>}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        >
                            <MenuItem
                                primaryText={this.props.labels.logOut}
                                onClick={() => this.props.dispatch(signOutRequest())}

                            />
                        </IconMenu>
                    </div>
                }
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).header,
        isDrawerOpen: isDrawerOpen(state),
    };
}

export default connect(mapStateToProps)(muiThemeable()(Header));
