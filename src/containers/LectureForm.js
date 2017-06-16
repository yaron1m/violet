import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
// import IconButton from 'material-ui/IconButton';
// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import Menu from 'material-ui/svg-icons/navigation/menu';
// import ViewModule from 'material-ui/svg-icons/action/view-module';
import {white} from 'material-ui/styles/colors';
// import SearchBox from '../components/SearchBox';
import globalStyles from '../styles';
import labels from '../lables.json';
import {typography} from 'material-ui/styles';



class Header extends React.Component {

    render() {

        const style = {
            paper: {
                padding: 20,
                marginTop: 20,
            },
            pageTitle: {
                fontSize: 24,
                fontWeight: typography.fontWeightLight,
                marginBottom: 20
            }
        };

        return (
            <div>
                <span style={style.pageTitle}>{labels.lectureForm.title}</span>

                <Paper style={style.paper}>
                    <h3 style={globalStyles.title}>Hello</h3>

                    {/*<Divider/>*/}
                    {/*{props.children}*/}

                    {/*<div style={globalStyles.clear}/>*/}

                </Paper>
            </div>
        );
    }
}

Header.propTypes = {
    styles: PropTypes.object,
    handleChangeRequestNavDrawer: PropTypes.func
};

export default Header;
