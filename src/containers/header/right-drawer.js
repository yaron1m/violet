import React from 'react';
import Drawer from 'material-ui/Drawer';
import {spacing, typography} from 'material-ui/styles';
import {white, purple900} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Web from 'material-ui/svg-icons/av/web';
import {changeDrawerState} from "../../store/drawer/actions";
import {getLabels} from "../../store/labels/reducer";
import {isDrawerOpen} from "../../store/drawer/reducer";
import {getDispalyName} from "../../store/firebase/reducer";


class RightDrawer extends React.Component {

    closeDrawer(){
        this.props.dispatch(changeDrawerState());
    }


    render() {
        const styles = {
            logo: {
                cursor: 'pointer',
                fontSize: 22,
                color: typography.textFullWhite,
                lineHeight: `${spacing.desktopKeylineIncrement}px`,
                fontWeight: typography.fontWeightLight,
                backgroundColor: purple900,
                textAlign: "center",
                height: 64,
            },
            menuItem: {
                color: white,
                fontSize: 14
            },
            avatar: {
                div: {
                    padding: '15px 15px 20px 0',
                    backgroundImage: 'url(' + require('../../images/material_bg.png') + ')',
                    height: 45
                },
                icon: {
                    float: 'left',
                    display: 'block',
                    marginRight: 15,
                    boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
                },
                span: {
                    paddingTop: 12,
                    display: 'block',
                    color: 'white',
                    fontWeight: 300,
                    textShadow: '1px 1px #444'
                }
            }
        };

        return (
            <Drawer
                docked={true}
                open={this.props.isDrawerOpen}
            >

                <Link to="/"
                      onClick={this.closeDrawer.bind(this)}
                >
                    <div style={styles.logo}>
                        {this.props.labels.softwareName} {this.props.labels.version}
                    </div>
                </Link>

                <div style={styles.avatar.div}>
                    <Avatar src="http://www.material-ui.com/images/uxceo-128.jpg"
                            size={50}
                            style={styles.avatar.icon}/>
                    <span style={styles.avatar.span}>{this.props.displayName}</span>
                </div>

                <MenuItem
                    key={0}
                    style={styles.menuItem}
                    primaryText={this.props.labels.orderPage.title}
                    leftIcon={<Web/>}
                    containerElement={<Link to="/form"/>}
                    onClick={this.closeDrawer.bind(this)}
                />

                <MenuItem
                    key={1}
                    style={styles.menuItem}
                    primaryText={this.props.labels.OrganizationPage.title}
                    leftIcon={<Web/>}
                    containerElement={<Link to="/org"/>}
                    onClick={this.closeDrawer.bind(this)}
                />

            </Drawer>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state),
        isDrawerOpen: isDrawerOpen(state),
        displayName: getDispalyName(state),
    };
}
export default connect(mapStateToProps)(RightDrawer);
