import React from 'react';
import Badge from '@material-ui/core/Badge';
// import IconMenu from "@material-ui/core/IconMenu";
import {redirect} from "../../../util/history-util";
import ExitIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import Colors from "../../../util/consts/colors";
import PropTypes from "prop-types";
import {CustomIconButton} from "../../../components/CustomComponents/CustomButtons";
// import CustomMenuItem from "../../../components/CustomComponents/CustomMenuItem";
import {flexStyle} from "../../../components/CustomComponents/CustomPaper";

class LeftIcons extends React.Component {

    render() {
        const style = {
            container: {
                marginTop: 3,
                ...flexStyle
            },
        };

        //TODO add badge color
        //TODO add icon color
        return (
            <div style={style.container}>
                <Badge
                    badgeContent={this.props.notificationCount === 0 ? "" : this.props.notificationCount}
                    style={{padding: 0}}
                    color="secondary"
                    // badgeStyle={{
                    //     backgroundColor: this.props.notificationCount === 0 ? null : Colors.red,
                    //     color: Colors.white
                    // }}
                >
                    <CustomIconButton
                        onClick={() => redirect('/actionRequired')}
                    >
                        <NotificationsIcon
                            //color={Colors.white}
                        />
                    </CustomIconButton>
                </Badge>

                <CustomIconButton
                    onClick={this.props.signOut}
                >
                    <ExitIcon
                        //color={this.props.isProduction ? Colors.white : Colors.red}
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
};

export default LeftIcons;
