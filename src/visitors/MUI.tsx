import * as React from 'react';
import { useCallback, useState, useEffect } from 'react';
import {
    BooleanField,
    Datagrid,
    DateField,
    DateInput,
    List,
    ListProps,
    NullableBooleanInput,
    NumberField,
    SearchInput,
    ShowButton,
    EditButton,
    TextInput,
    TextField,
    RecordContext,
    DeleteButton,
    useDataProvider,
    useVersion,
   
} from 'react-admin';
import { useMediaQuery, Theme} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Print } from '@material-ui/icons';

import MUIDataTable from "mui-datatables";
import { Avatar, Card, Box, CardContent, Typography, IconButton } from '@material-ui/core';

import SegmentsField from './SegmentsField';
import SegmentInput from './SegmentInput';
import UserLinkField from './UserLinkField';
import ColoredNumberField from './ColoredNumberField';
import MobileGrid from './MobileGrid';
import VisitorListAside from './VisitorListAside';
import { ReactElement } from 'react';
import { AnyAaaaRecord } from 'dns';
import VisitorView from './VisitorView';
import { User } from '../types';
import { userInfo } from 'os';

interface UserData {
    [key: string]: User;
}

const visitorFilters = [
    <SearchInput source="q" alwaysOn />,
    <SegmentInput />,
];

const handlePrint = (e:any)=>{
    window.print();
    
}

const useStyles = makeStyles(theme => ({
    nb_commands: { color: 'purple' },
    hiddenOnSmallScreens: {
        display: 'table-cell',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },

    },

   
}));



        


const Mui = (props: ListProps): ReactElement => {
    const dataProvider = useDataProvider();
    const version = useVersion();
    const [user, setUser] = useState<User[]>([]);
    const [Data, setData]  = useState([]);
    const fetchUsers = useCallback(async () => {
        const { data: Users } = await dataProvider.getList<User>(
            'Users',
            {
                filter: {},
                sort: { field: 'DOB', order: 'DESC' },
                pagination: { page: 1, perPage: 100 },
            }
        );

        
        setUser(Users);
        console.log("Hello:",Users);
        },[dataProvider]);

        useEffect(() => {
            
            fetchUsers();
        }, [version]);
 
   
    const classes = useStyles();
    const isXsmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
       
    );
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
   
    

    const columns = [
        {
          name: "avatar",
          label: "Avatar",
          options: {
           filter: true,
           sort: false,
           customBodyRender: (value:any) => {
             console.log("Avatar:",value);
             return(
               <Avatar src = {value.src} />
             )
             }
           
          }
         },
        {
         name: "first_name",
         label: "First Name",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "last_name",
         label: "Last Name",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
         name: "father_name",
         label: "Father Name",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
          name: "",
          label: "Delete",
          options: {
           filter: false,
           sort: false,
           customBodyRenderLite: (value:any) => {
             console.log("record",props);
             const u = user[value];
             return(
               <UserLinkField {...props}/>
             )
             }
           
          }
         },
        
       ];
       console.log("MUI",user);

    return (
        <MUIDataTable
        title={"Database"}
        data={user}
        columns={columns}
        
      />
    );
};

export default Mui;