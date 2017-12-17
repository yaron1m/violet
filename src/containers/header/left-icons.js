import React from 'react';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import {connect} from "react-redux";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import {signOutRequest} from "../../store/firebase/actions";
import {getLabels} from "../../store/labels/reducer";
import {getActionRequiredOrders, getFollowUpOrdersSummary} from "../../store/orders/selectors";
import {withRouter} from "react-router";
import {redirect} from "../../util/history-util";
import MoreIcon from 'material-ui-icons/MoreVert';
import NotificationsIcon from 'material-ui-icons/Notifications';
import Colors from "../../util/consts/colors";

class LeftIcons extends React.Component {

    render() {
        const style = {
            container: {
                marginTop: 3
            },
        };

        const notificationCount = this.props.actionRequiredOrders.length;

        return (
            <div style={style.container}>
                <Badge
                    badgeContent={notificationCount === 0 ? "" : notificationCount}
                    style={{padding: 0}}
                    badgeStyle={{
                        backgroundColor: notificationCount === 0 ? null : Colors.red,
                        color: Colors.white
                    }}
                >
                    <IconButton
                        onClick={() => redirect(this.props.history, '/actionRequired')}
                    >
                        <NotificationsIcon color={Colors.white}/>
                    </IconButton>
                </Badge>
                <IconMenu
                    iconButtonElement={
                        <IconButton>
                            <MoreIcon color={process.env.NODE_ENV === "production" ? Colors.white : Colors.red}/>
                        </IconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                >
                    <MenuItem
                        primaryText={this.props.labels.logOut}
                        onClick={() => this.props.dispatch(signOutRequest())}
                    />
                </IconMenu>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).header,
        followUpOrdersSummary: getFollowUpOrdersSummary(state),
        actionRequiredOrders: getActionRequiredOrders(state),
    };
}

export default withRouter(connect(mapStateToProps)(LeftIcons));
