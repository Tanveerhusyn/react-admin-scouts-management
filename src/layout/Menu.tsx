import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import LabelIcon from '@material-ui/icons/Label';
import DashboardIcon from '@material-ui/icons/Dashboard'
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Card, Typography, CardMedia, CardContent, IconButton } from '@material-ui/core';
import {
    useTranslate,
    DashboardMenuItem,
    MenuItemLink,
    MenuProps,
    setSidebarVisibility,
} from 'react-admin';



import visitors from '../visitors';
import orders from '../orders';
import invoices from '../invoices';
import products from '../products';
import categories from '../categories';
import reviews from '../reviews';
import SubMenu from './SubMenu';
import { AppState } from '../types';

import amber from '@material-ui/core/colors/amber';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/deepPurple';
import teal from '@material-ui/core/colors/teal';
import brown from '@material-ui/core/colors/brown';
import red from '@material-ui/core/colors/red';
import Scout from './Scout.png';

type MenuName = 'menuCatalog' | 'menuSales' | 'menuUsers';



const Menu = ({ dense = false }: MenuProps) => {
    
    const classes = useStyles();

    
    return (
        <div className={classes.root}>
            {''}
            {/* <DashboardMenuItem  /> */}
         
            
            <MenuItemLink
            to="/"
            primaryText={'Dashboard'}
            leftIcon={<DashboardIcon />}
            exact
            
        />
            {/* <SubMenu
                handleToggle={() => handleToggle('menuSales')}
                isOpen={state.menuSales}
                name="pos.menu.sales"
                icon={<orders.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/commands`}
                    primaryText={translate(`resources.commands.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<orders.icon />}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/invoices`}
                    primaryText={translate(`resources.invoices.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<invoices.icon />}
                    dense={dense}
                />
            </SubMenu> */}
            {/* <SubMenu
                handleToggle={() => handleToggle('menuCatalog')}
                isOpen={state.menuCatalog}
                name="pos.menu.catalog"
                icon={<products.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/products`}
                    primaryText={translate(`resources.products.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<products.icon />}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/categories`}
                    primaryText={translate(`resources.categories.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<categories.icon />}
                    dense={dense}
                />
            </SubMenu> */}
            {/* <SubMenu
                handleToggle={() => handleToggle('menuUsers')}
                isOpen={state.menuUsers}
                name="pos.menu.Users"
                icon={<visitors.icon />}
                dense={dense}
            > */}
                <MenuItemLink
                    to={`/Users`}
                    primaryText={"Users"}
                    leftIcon={<visitors.icon/>}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/segments`}
                    primaryText={"Segments"}
                    leftIcon={<LabelIcon />}
                    dense={dense}
                />
            {/* </SubMenu> */}
            
            
            <MenuItemLink
                to={`/reviews`}
                primaryText={"Reviews"}
                leftIcon={<reviews.icon /> }
                dense={dense}
            />
           
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        
        paddingTop: '40px',
        zIndex: -1,
        width: '200px',
        backgroundColor: '#FFFFFF',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
        marginRight: '5px',
        paddingBottom: '400px',
        
    },
    card:{
        display: 'flex',
    },
  
    details: {
        display: 'flex',
        flexDirection: 'column',
      },
      content: {
        flex: '1 0 auto',
      },
      cover: {
        width: 151,
      },
      controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
      playIcon: {
        height: 38,
        width: 38,
      },
    purpleIcon: {
        background: purple[50],
        '& svg': {
          color: purple[500]
        }
      },
      
      redIcon: {
        background: red[100],
        '& svg': {
          color: red[500]
        }},
    


}));

export default Menu;
