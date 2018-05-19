import React from 'react';
import HomeIcon from 'material-ui-icons/Home';
import {redirect} from "../../util/history-util";
import Colors from "../../util/consts/colors";
import {CustomIconButton} from "../../components/CustomComponents/CustomButtons";

class HomeButton extends React.Component {

    render() {
        const style = {
            homeIcon: {
                marginRight: -20,
                marginTop: 3
            },
        };

        return (
            <CustomIconButton
                style={style.homeIcon}
                onClick={() => redirect('/')}
            >
                <HomeIcon color={Colors.white}/>
            </CustomIconButton>
        );
    }
}

export default HomeButton;
