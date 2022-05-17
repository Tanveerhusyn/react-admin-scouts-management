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
    Filter,
   
} from 'react-admin';
import { useMediaQuery, Theme,IconButton, Avatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Print } from '@material-ui/icons';



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

import Animation from './Animation.svg';
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


const VisitorFilters = (props:any) =>(
    <Filter {...props}>
        <TextInput label="Search" source="q"  />
        <TextInput label="Name" source="first_name" alwaysOn />
        <TextInput label="Father Name" source="father_name"/>
        <SegmentInput/>
        <DateInput label ="DOB" source = "birthday"/>
    </Filter>
);
        


const VisitorGrid = (props: ListProps): ReactElement => {
    const dataProvider = useDataProvider();
    const version = useVersion();
    const [user, setUser] = useState({});
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

    console.log("Users",user);
   
    const classes = useStyles();
    const isXsmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
       
    );
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
    return (
        <div style = {{backgroundColor: 'white'}}>
         
        <List
            {...props}        
            sort={{ field: 'last_seen', order: 'DESC' }}
            perPage={25}
            filters = {<VisitorFilters/>}
            
        >
            {isXsmall ? (
                <MobileGrid />
            ) : (
                <div>
                   
                <Datagrid optimized expand = {<VisitorView/>}>
                    <UserLinkField />
                    <TextField source = "father_name" label ="Father Name"/>
                    <DateField source="birthday" />
                    <TextField source="city" label="city"/>
                    <TextField source ="cnic"/>
                    <TextField source="email"/>
                    <SegmentsField
                        cellClassName={classes.hiddenOnSmallScreens}
                        headerClassName={classes.hiddenOnSmallScreens}
                    />
                    <EditButton/>
                    <DeleteButton/>
                </Datagrid>
                </div>
            )}
          
        </List>

        </div>
    );
};

export default VisitorGrid;