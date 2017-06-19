import React from 'react';
import Drawer from 'material-ui/Drawer';
import {spacing, typography} from 'material-ui/styles';
import {white, purple900} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import labels from '../lables.json';

const RightDrawer = (props) => {
    let { navDrawerOpen } = props;

    const thisLabels = labels.drawer;


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
                padding: '15px 0 20px 15px',
                backgroundImage:  'url(' + require('../images/material_bg.png') + ')',
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
            openSecondary={true}
            docked={true}
            open={navDrawerOpen}>
          <div style={styles.logo}>
              {thisLabels.softwareName} {thisLabels.version}
          </div>
          <div style={styles.avatar.div}>
            <Avatar src="http://www.material-ui.com/images/uxceo-128.jpg"
                    size={50}
                    style={styles.avatar.icon}/>
            <span style={styles.avatar.span}>{props.username}</span>
          </div>
          <div>
              {props.menus.map((menu, index) =>
                  <MenuItem
                      key={index}
                      style={styles.menuItem}
                      primaryText={menu.text}
                      leftIcon={menu.icon}
                      // containerElement={<Link to={menu.link}/>}
                  />
              )}
          </div>
        </Drawer>
    );
};

export default RightDrawer;
