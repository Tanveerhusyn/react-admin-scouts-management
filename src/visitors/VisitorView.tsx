import React, { useState } from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CssBaseline from '@material-ui/core/CssBaseline';
import { User, Invoice } from '../types';
import { Avatar, Card, Box, CardContent, Typography, IconButton, Menu} from '@material-ui/core';
import { useShowController,
    ReferenceField,useListContext, TextField,DeleteButton} from 'react-admin';
import AvatarField from './AvatarField';
import { DirectionsBusTwoTone } from "@material-ui/icons";
import { isDate } from "util";
import UserLinkField from './UserLinkField';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
import { ListProps , EditButton} from 'react-admin';
import { ReactElement } from 'react';
import FullNameField from "./FullNameField";
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
        width: '60%',
        marginLeft: '12rem',
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
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
      list:{
        display: 'inline-grid',
        gridColumnGap: '40px',
        gridTemplateColumns: 'auto auto auto auto',
        
      },
      cover: {
        padding: 20,
        height: 130,
        position: 'relative',
        background: '#cccccc',
        color: 'white',
        width: '94.5%',
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

export default function VisitorView(props:any) {
  const classes = useStyles();
    const { record } = useShowController<User>(props);
  //   const { data, ids } = useListContext<User>();
  // const [responsive, setResponsive] = useState("vertical");
  // const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  // const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");

  // const t = Object.values(data);
 
  // const [Data, setData] = useState(t);

  
  
   return (
    <main className={classNames(classes.content)}>
      <section className={classes.cover}>
        <div className={classes.opt}>
          <IconButton className={classes.favorite} aria-label="Favorite" >
            {<StarBorder />}
          </IconButton>
          <EditButton/>
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
        <Avatar alt={ 'name'} src={record?.avatar.src} className={classes.avatar} />
        <Typography variant="h3" className={classes.userName}>
          { record?.first_name} {record?.last_name}
          <Typography variant="caption">
            { record?.birthday}
          </Typography>
        </Typography>
      </section>
    <div >
      <List
       className = {classes.list}
      >
           <ListItem>
            <Avatar className={classes.blueIcon} style = {{marginRight: '10px'}}>
              <LocalPhone />
            </Avatar>
            <ListItemText primary={`${record?.first_name} ${record?.last_name}`} secondary="Full Name" />
          </ListItem>
          <Divider  />
          <ListItem>
            <Avatar className={classes.amberIcon} style = {{marginRight: '10px'}}>
              <Smartphone />
            </Avatar>
            <ListItemText primary={`${record?.last_name}`}  secondary="Last Name" />
          </ListItem>
          <Divider  />
          <ListItem>
            <Avatar className={classes.tealIcon} style = {{marginRight: '10px'}}>
              <Email />
            </Avatar>
            <ListItemText primary={record?.father_name}  secondary="Father Name" />
          </ListItem>
          <Divider  />
          <ListItem>
            <Avatar className={classes.brownIcon} style = {{marginRight: '10px'}}>
              <Work />
            </Avatar>
            <ListItemText primary={record?.cnic} secondary="Cnic" />
          </ListItem>
          <Divider  />
          <ListItem>
            <Avatar className={classes.redIcon} style = {{marginRight: '10px'}}>
              <LocationOn />
            </Avatar>
            <ListItemText primary={record?.birthday}  secondary="Birthday" />
          </ListItem>
          <Divider  />
          <ListItem>
            <Avatar className={classes.purpleIcon} style = {{marginRight: '10px'}}>
              <Language />
            </Avatar>
            <ListItemText primary={record?.groups}  secondary="segment" />
          </ListItem>
           
      </List>
      </div>
      </main>
  );
}


