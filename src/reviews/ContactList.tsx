import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LocalPhone from '@material-ui/icons/LocalPhone';
import Email from '@material-ui/icons/Email';
import Smartphone from '@material-ui/icons/Smartphone';
import LocationOn from '@material-ui/icons/LocationOn';
import Work from '@material-ui/icons/Work';
import Language from '@material-ui/icons/Language';
import Divider from '@material-ui/core/Divider';
import { useMediaQuery, Theme} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRecordContext, useListContext, ListProps } from 'react-admin';
import { ReactElement } from 'react';
import amber from '@material-ui/core/colors/amber';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/deepPurple';
import teal from '@material-ui/core/colors/teal';
import brown from '@material-ui/core/colors/brown';
import red from '@material-ui/core/colors/red';

const drawerWidth = 240;
const drawerHeight = 630;

const optionsOpt = [
  'Block Contact',
  'Delete Contact',
  'Option 1',
  'Option 2',
  'Option 3',
];

const ITEM_HEIGHT = 48;


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: drawerHeight,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        [theme.breakpoints.up('sm')]: {
          display: 'flex',
        },
        borderRadius: 2,
        boxShadow: theme.shadows[2]
      },
      addBtn: {
        position: 'fixed',
        bottom: 30,
        right: 30,
        zIndex: 100
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: theme.palette.secondary.main,
        height: 64,
        display: 'flex',
        justifyContent: 'center',
        '& $avatar': {
          marginRight: 10
        },
        '& h2': {
          flex: 1
        },
        '& $button': {
          color: theme.palette.common.white
        }
      },
      button: {
        [theme.breakpoints.down('sm')]: {
          display: 'none'
        },
      },
      online: {
        background: '#CDDC39'
      },
      bussy: {
        background: '#EF5350'
      },
      idle: {
        background: '#FFC107'
      },
      offline: {
        background: '#9E9E9E'
      },
      status: {
        padding: '2px 6px',
        '& span': {
          borderRadius: '50%',
          display: 'inline-block',
          marginRight: 2,
          width: 10,
          height: 10,
          border: `1px solid ${theme.palette.common.white}`
        }
      },
      appBarShift: {
        marginLeft: 0,
        width: '100%',
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.up('md')]: {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
        },
      },
      drawerPaper: {
        [theme.breakpoints.up('sm')]: {
          width: drawerWidth,
        },
        position: 'relative',
        paddingBottom: 65,
        height: drawerHeight,
      },
      clippedRight: {},
      toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        position: 'relative',
        '&$clippedRight': {
          marginTop: 66
        }
      },
      content: {
        flexGrow: 1,
        paddingTop: 64,
        backgroundColor: theme.palette.background.paper,
      },
      detailPopup: {
        [theme.breakpoints.down('xs')]: {
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1200,
          width: '100%',
          overflow: 'auto',
          height: 'calc(100% - 50px)'
        }
      },
      title: {
        display: 'flex',
        flex: 1,
        '& svg': {
          marginRight: 5
        }
      },
      flex: {
        flex: 1,
      },
      searchWrapper: {
        fontFamily: theme.typography.fontFamily,
        position: 'relative',
        borderRadius: 2,
        display: 'block',
        background: theme.palette.grey[100]
      },
      search: {
        width: 'auto',
        height: '100%',
        top: 0,
        left: 20,
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      input: {
        font: 'inherit',
        padding: `${20}px ${20}px ${20}px ${5 * 6}px`,
        border: 0,
        display: 'block',
        verticalAlign: 'middle',
        whiteSpace: 'normal',
        background: 'none',
        margin: 0, // Reset for Safari
        color: 'inherit',
        width: '100%',
        '&:focus': {
          outline: 0,
        },
      },
      bottomFilter: {
        position: 'absolute',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: 240,
        },
        zIndex: 2000,
        bottom: 0,
        left: 0,
        background: theme.palette.grey[100],
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        borderRight: `1px solid ${theme.palette.grey[300]}`,
      },
      avatar: {},
      userName: {
        textAlign: 'left'
      },
      cover: {
        padding: 20,
        height: 130,
        position: 'relative',
        background: ' #e6e6e6',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        '& $avatar': {
          boxShadow: theme.shadows[4],
          width: 100,
          height: 100,
          marginRight: 20
        },
      },
      opt: {
        position: 'absolute',
        top: 10,
        right: 10,
      },
      favorite: {
        color: amber[500]
      },
      redIcon: {
        background: red[50],
        '& svg': {
          color: red[500]
        }
      },
      brownIcon: {
        background: brown[50],
        '& svg': {
          color: brown[500]
        }
      },
      tealIcon: {
        background: teal[50],
        '& svg': {
          color: teal[500]
        }
      },
      blueIcon: {
        background: blue[50],
        '& svg': {
          color: blue[500]
        }
      },
      amberIcon: {
        background: amber[50],
        '& svg': {
          color: amber[500]
        }
      },
      purpleIcon: {
        background: purple[50],
        '& svg': {
          color: purple[500]
        }
      },
      field: {
        width: '100%',
        marginBottom: 20,
        '& svg': {
          color: theme.palette.grey[400],
          fontSize: 18,
        }
      },
      uploadAvatar: {
        width: '100%',
        height: '100%',
        background: theme.palette.grey[200],
        boxShadow: theme.shadows[4],
      },
      selected: {
        background: theme.palette.secondary.light,
        borderLeft: `2px solid ${theme.palette.secondary.main}`,
        paddingLeft: 22,
        '& h3': {
          color: theme.palette.secondary.dark
        }
      },
      hiddenDropzone: {
        display: 'none'
      },
      avatarWrap: {
        width: 100,
        height: 100,
        margin: '10px auto 30px',
        position: 'relative'
      },
      buttonUpload: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      },
      navIconHide: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
          display: 'none'
        }

    },

   
}));

const ContactList = (props:ListProps): ReactElement => {
    
    const classes = useStyles();
    const isXsmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
       
    );
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
    return (
      <main className={classNames(classes.content)}>
        <section className={classes.cover}>
          <div className={classes.opt}>
            <IconButton className={classes.favorite} aria-label="Favorite" >
              {<StarBorder />}
            </IconButton>
            <IconButton aria-label="Edit" >
              <Edit />
            </IconButton>
            <IconButton
              aria-label="More"
              aria-owns={'long-menu'}
              aria-haspopup="true"
              className={classes.button}
             
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              open={false}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200,
                },
              }}
            >
              {optionsOpt.map(option => {
                if (option === 'Delete Contact') {
                  return (
                    <MenuItem key={option}  >
                      {option}
                    </MenuItem>
                  );
                }
                return (
                  <MenuItem key={option} selected={option === 'Edit Profile'}>
                    {option}
                  </MenuItem>
                );
              })}
            </Menu>
          </div>
          <Avatar alt={ 'name'} src={'avatar'} className={classes.avatar} />
          <Typography variant="h3" className={classes.userName}>
            { 'name'}
            <Typography variant="caption">
              { 'title'}
            </Typography>
          </Typography>
        </section>
      <div>
        <List
         
        >
             <ListItem>
              <Avatar className={classes.blueIcon}>
                <LocalPhone />
              </Avatar>
              <ListItemText primary={'phone'} secondary="Phone" />
            </ListItem>
            <Divider  />
            <ListItem>
              <Avatar className={classes.amberIcon}>
                <Smartphone />
              </Avatar>
              <ListItemText primary={'phone'}  secondary="Secondary Phone" />
            </ListItem>
            <Divider  />
            <ListItem>
              <Avatar className={classes.tealIcon}>
                <Email />
              </Avatar>
              <ListItemText primary={'phone'}  secondary="Personal Email" />
            </ListItem>
            <Divider  />
            <ListItem>
              <Avatar className={classes.brownIcon}>
                <Work />
              </Avatar>
              <ListItemText primary={'phone'} secondary="Company Email" />
            </ListItem>
            <Divider  />
            <ListItem>
              <Avatar className={classes.redIcon}>
                <LocationOn />
              </Avatar>
              <ListItemText primary={'phone'}  secondary="Address" />
            </ListItem>
            <Divider  />
            <ListItem>
              <Avatar className={classes.purpleIcon}>
                <Language />
              </Avatar>
              <ListItemText primary={'phone'}  secondary="Website" />
            </ListItem>
             
        </List>
        </div>
        </main>
    );
};

export default ContactList;