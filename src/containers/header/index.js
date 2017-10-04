import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui-icons/Home';
import {white} from 'material-ui/styles/colors';
import SearchBox from './search-box';
import {connect} from "react-redux";
import {getLabels} from "../../store/labels/reducer";
import {getFollowUpOrdersSummary} from "../../store/orders/reducer";
import {withRouter} from "react-router";
import {redirect} from "../../util/history-util";
import LeftIcons from './left-icons';

class Header extends React.Component {

    render() {
        const style = {
            appBar: {
                position: 'fixed',
                top: 0,
                overflow: 'hidden',
                maxHeight: 65,
                paddingBottom: 7,
                paddingLeft: 20,
                paddingRight: 20,
            },
            homeIcon: {
                marginRight: -20,
                marginTop: 3
            },
        };

        return (
            <AppBar
                style={style.appBar}
                title={<SearchBox/>}
                iconElementLeft={
                    <IconButton
                        style={style.homeIcon}
                        onClick={() => redirect(this.props.history, '/')}
                    >
                        <HomeIcon color={white}/>
                    </IconButton>
                }
                iconElementRight={
                    <LeftIcons/>
                }
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).header,
        followUpOrdersSummary: getFollowUpOrdersSummary(state),
    };
}

export default withRouter(connect(mapStateToProps)(Header));
