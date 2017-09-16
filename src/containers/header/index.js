import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import Menu from 'material-ui/svg-icons/navigation/menu';
import {white, red800} from 'material-ui/styles/colors';
import SearchBox from './search-box';
import MoreIcon from 'material-ui/svg-icons/navigation/more-vert';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {changeDrawerState} from "../../store/appearance/actions";
import {connect} from "react-redux";
import {isDrawerOpen} from "../../store/appearance/reducer";
import IconMenu from "material-ui/IconMenu";
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import MenuItem from "material-ui/MenuItem";
import {signOutRequest} from "../../store/firebase/actions";
import {getLabels} from "../../store/labels/reducer";
import {getOrders} from "../../store/orders/reducer";
import * as _ from 'lodash';
import {withRouter} from "react-router";

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

        const now = new Date();
        const notificationCount = _.filter(this.props.orders,
            order => order.followUpRequired && new Date(order.followUpDate) < now)
            .length;

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
                        <Badge
                            badgeContent={notificationCount === 0 ? "" : notificationCount}
                            style={{padding: 0}}
                            badgeStyle={{
                                backgroundColor: notificationCount === 0 ? null : red800,
                                color: "white"
                            }}
                        >
                            <IconButton
                                onClick={() => this.props.history.location.pathname !== '/followup' ?
                                    this.props.history.push('/followup') : null}
                            >
                                <NotificationsIcon color={process.env.NODE_ENV === "production" ? white : red800}/>
                            </IconButton>
                        </Badge>
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
        orders: getOrders(state),
    };
}

export default withRouter(connect(mapStateToProps)(muiThemeable()(Header)));
