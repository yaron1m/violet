import React from 'react';
import Badge from '@material-ui/core/Badge';
import {redirect} from "../../../util/HistoryUtil";
import ExitIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Colors from "../../../util/Constants/Colors";
import {CustomIconButton} from "../../../Components/CustomComponents/CustomButtons";

export default function LeftIcons(props: LeftIconsProps) {
    const style = {
        container: {
            marginTop: 3,
            display: "flex",
            marginLeft: -40,
        },
        icon: {
            color: Colors.white,
            visibility: "visible" as "visible",
        },
        flippedIcon: {
            color: Colors.white,
            "-webkit-transform": "scaleX(-1)" as "scaleX(-1)"
        },
        hiddenBadge: {
            visibility: "hidden" as "hidden",
        }
    };

    return (

        <div style={style.container}>

            <CustomIconButton
                onClick={() => redirect('/actionRequired')}
            >
                <Badge
                    hidden
                    badgeContent={props.notificationCount}
                    color="secondary"
                    style={props.notificationCount === 0 ? style.hiddenBadge : undefined}
                >
                    <NotificationsIcon style={style.icon}/>
                </Badge>
            </CustomIconButton>

            <CustomIconButton
                onClick={props.signOut}
            >
                <ExitIcon style={style.flippedIcon}/>
            </CustomIconButton>
        </div>
    );
}

interface LeftIconsProps {
    notificationCount: number;
    logOutLabel: string;
    isProduction: boolean;
    signOut: () => void;
    classes: object;
}