import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import {redirect} from "../../util/HistoryUtil";
import {CustomIconButton} from "../../Components/CustomComponents/CustomButtons";
import Colors from "../../util/Constants/Colors";
import {withStyles} from "@material-ui/core/styles/index";
import PropTypes from "prop-types";

const styles = () => ({
    icon: {
        color: Colors.white,
    },
});

class HomeButton extends React.Component {

    render() {
        const style = {
            homeIcon: {
                marginRight: -40,
                marginTop: 3
            },
        };

        return (
            <CustomIconButton
                style={style.homeIcon}
                onClick={() => redirect('/')}
            >
                <HomeIcon
                    className={this.props.classes.icon}
                />
            </CustomIconButton>
        );
    }
}

HomeButton.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(HomeButton);
