import React from 'react';
import Badge from 'material-ui/Badge';
import IconMenu from "material-ui/IconMenu";
import {redirect} from "../../../util/history-util";
import MoreIcon from 'material-ui-icons/MoreVert';
import NotificationsIcon from 'material-ui-icons/Notifications';
import Colors from "../../../util/consts/colors";
import PropTypes from "prop-types";
import {CustomIconButton} from "../../../components/CustomComponents/CustomButtons";
import CustomMenuItem from "../../../components/CustomComponents/CustomMenuItem";

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
                    <CustomIconButton
                        onClick={() => redirect('/actionRequired')}
                    >
                        <NotificationsIcon color={Colors.white}/>
                    </CustomIconButton>
                </Badge>

                <IconMenu
                    iconButtonElement={
                        <CustomIconButton>
                            <MoreIcon color={this.props.isProduction ? Colors.white : Colors.red}/>
                        </CustomIconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                >
                    <CustomMenuItem
                        primaryText={this.props.logOutLabel}
                        onClick={this.props.signOut}
                    />
                </IconMenu>
            </div>
        );
    }
}

LeftIcons.propTypes = {
    notificationCount: PropTypes.number,
    logOutLabel: PropTypes.string,
    isProduction: PropTypes.bool,
    signOut: PropTypes.func,
};

export default LeftIcons;
