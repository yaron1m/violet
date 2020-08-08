import React from "react";
import Badge from "@material-ui/core/Badge";
import {redirect} from "../../../Util/HistoryUtil";
import ExitIcon from "@material-ui/icons/ExitToApp";
import PieChartIcon from "@material-ui/icons/PieChart";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Colors from "../../../Util/Constants/Colors";
import {CustomIconButton} from "../../../Components/CustomComponents/CustomButtons";
import {Path} from "../../../Pages/Path";

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
            transform: "rotate(180deg)",
        },
        hiddenBadge: {
            visibility: "hidden" as "hidden",
        }
    };

    return (

        <div style={style.container}>
            <CustomIconButton
                onClick={props.goToBiScreen}
            >
                <PieChartIcon style={style.icon}/>
            </CustomIconButton>

            <CustomIconButton
                onClick={() => redirect(Path.actionRequired)}
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
    isProduction: boolean;
    signOut: () => void;
    goToBiScreen: () => void;
}