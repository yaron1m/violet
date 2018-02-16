import React from 'react';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import {redirect} from "../../../util/history-util";
import MoreIcon from 'material-ui-icons/MoreVert';
import NotificationsIcon from 'material-ui-icons/Notifications';
import Colors from "../../../util/consts/colors";

class LeftIcons extends React.Component {

    render() {
        const style = {
            container: {
                marginTop: 3
            },
        };

        return (
            <div style={style.container}>
                <Badge
                    badgeContent={this.props.notificationCount === 0 ? "" : this.props.notificationCount}
                    style={{padding: 0}}
                    badgeStyle={{
                        backgroundColor: this.props.notificationCount === 0 ? null : Colors.red,
                        color: Colors.white
                    }}
                >
                    <IconButton
                        onClick={() => redirect('/actionRequired')}
                    >
                        <NotificationsIcon color={Colors.white}/>
                    </IconButton>
                </Badge>

                <IconMenu
                    iconButtonElement={
                        <IconButton>
                            <MoreIcon color={this.props.isProduction ? Colors.white : Colors.red}/>
                        </IconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                >
                    <MenuItem
                        primaryText={this.props.logOutLabel}
                        onClick={this.props.signOut}
                    />
                </IconMenu>
            </div>
        );
    }
}

export default LeftIcons;
