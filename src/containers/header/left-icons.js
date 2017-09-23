import React from 'react';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import {white, red800} from 'material-ui/styles/colors';
import {connect} from "react-redux";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import {signOutRequest} from "../../store/firebase/actions";
import {getLabels} from "../../store/labels/reducer";
import {getFollowUpOrdersSummary} from "../../store/orders/reducer";
import * as _ from 'lodash';
import {withRouter} from "react-router";
import {redirect} from "../../util/history-util";
import MoreIcon from 'material-ui-icons/MoreVert';
import NotificationsIcon from 'material-ui-icons/Notifications';

class LeftIcons extends React.Component {

    render() {
        const style = {
            container: {
                marginTop: 3
            },
        };

        const now = new Date();
        const notificationCount = _.filter(this.props.followUpOrdersSummary,
            summary => new Date(summary.followUpDate) < now)
            .length;

        return (
            <div style={style.container}>
                <Badge
                    badgeContent={notificationCount === 0 ? "" : notificationCount}
                    style={{padding: 0}}
                    badgeStyle={{
                        backgroundColor: notificationCount === 0 ? null : red800,
                        color: white
                    }}
                >
                    <IconButton
                        onClick={() => redirect(this.props.history, '/followup')}
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
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).header,
        followUpOrdersSummary: getFollowUpOrdersSummary(state),
    };
}

export default withRouter(connect(mapStateToProps)(LeftIcons));
