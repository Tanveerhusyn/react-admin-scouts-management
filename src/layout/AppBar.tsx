import * as React from 'react';
import { forwardRef } from 'react';
import { AppBar, UserMenu, MenuItemLink, useTranslate } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Avatar,Button } from '@material-ui/core';

import Logo from './Logo';
import Animation from '../visitors/Animation.svg';
import Scout from './Scout.png';

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        backgroundColor: '#9900cc',
        color: 'white',
        
    },
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    
    },
    main:{
        fontWeight:400,
        fontSize:7.056,
        fontFamily:"Permanent Marker",
        letterSpacing:0,
        wordSpacing:0,
        strokeWidth:0.265,
        fill:"#ffffff",
        
    },
    spacer: {
        flex: 0.5,
    },
});

const ConfigurationMenu = forwardRef<any, any>((props, ref) => {
    const translate = useTranslate();
    return (
        <MenuItemLink
            ref={ref}
            to="/configuration"
            primaryText={"Configuration"}
            leftIcon={<SettingsIcon />}
            onClick={props.onClick}
            sidebarIsOpen = {false}
        />
    );
});

const CustomUserMenu = (props: any) => (
    <UserMenu {...props}>
        <ConfigurationMenu />
    </UserMenu>
);

const CustomAppBar = (props: any) => {
    const classes = useStyles();
    
    return (
    
        <AppBar {...props}  container = {Fragment} elevation={1}  userMenu={<CustomUserMenu /> } className = {classes.root} >
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />

          
           
          
            <span className={classes.spacer} />
        </AppBar>
        
    );
};

export default CustomAppBar;
