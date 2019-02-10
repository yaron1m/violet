import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import {redirect} from "../../Util/HistoryUtil";
import {CustomIconButton} from "../../Components/CustomComponents/CustomButtons";
import Colors from "../../Util/Constants/Colors";
import {Path} from '../../Pages/Path';

export default function HomeButton() {
    const style = {
        homeIcon: {
            marginRight: -40,
            marginTop: 3,
            color:
            Colors.white,
        },
    };

    return (
        <CustomIconButton
            style={style.homeIcon}
            onClick={() => redirect(Path.root)}
        >
            <HomeIcon/>
        </CustomIconButton>
    );
}