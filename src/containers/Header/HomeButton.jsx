import React from 'react';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui-icons/Home';
import {redirect} from "../../util/history-util";
import Colors from "../../util/consts/colors";

class HomeButton extends React.Component {

    render() {
        const style = {
            homeIcon: {
                marginRight: -20,
                marginTop: 3
            },
        };

        return (
            <IconButton
                style={style.homeIcon}
                onClick={() => redirect('/')}
            >
                <HomeIcon color={Colors.white}/>
            </IconButton>
        );
    }
}

export default HomeButton;
