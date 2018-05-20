import React from 'react';
import Badge from '@material-ui/core/Badge';
import {redirect} from "../../../util/history-util";
import ExitIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Colors from "../../../util/consts/colors";
import PropTypes from "prop-types";
import {CustomIconButton} from "../../../components/CustomComponents/CustomButtons";
import {withStyles} from '@material-ui/core/styles';

const styles = () => ({
    icon: {
        color: Colors.white,
        visibility: "visible",
    },
    hiddenBadge: {
        visibility: "hidden",
    }
});

class LeftIcons extends React.Component {

    render() {
        const style = {
            container: {
                marginTop: 3,
                display: "flex",
                marginLeft: -40,
            },
        };

        return (

            <div style={style.container}>

                <CustomIconButton
                    onClick={() => redirect('/actionRequired')}
                >
                    <Badge
                        hidden
                        badgeContent={this.props.notificationCount}
                        color="secondary"
                        className={this.props.notificationCount === 0 ? this.props.classes.hiddenBadge : null}
                    >
                        <NotificationsIcon
                            className={this.props.classes.icon}
                        />
                    </Badge>
                </CustomIconButton>

                <CustomIconButton
                    onClick={this.props.signOut}
                >
                    <ExitIcon
                        className={this.props.classes.icon}
                    />
                </CustomIconButton>
            </div>
        );
    }
}

LeftIcons.propTypes = {
    notificationCount: PropTypes.number,
    logOutLabel: PropTypes.string,
    isProduction: PropTypes.bool,
    signOut: PropTypes.func,
    classes: PropTypes.object,
};

export default withStyles(styles)(LeftIcons);
