import * as React from 'react';
import {
    BooleanField,
    DeleteButton,
    Datagrid,
    DateField,
    DateInput,
    List,
    Filter,
    ListProps,
    NullableBooleanInput,
    NumberField,
    SearchInput,
    ShowButton,
    EditButton,
    TextInput,
    TextField,
    RecordContext,
    useShowController,
   
} from 'react-admin';
import { useMediaQuery, Theme,IconButton} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Print } from '@material-ui/icons';


import { useRecordContext, useListContext } from 'react-admin';

import SegmentsField from './SegmentsField';
import SegmentInput from './SegmentInput';
import UserLinkField from './UserLinkField';
import ColoredNumberField from './ColoredNumberField';
import MobileGrid from './MobileGrid';
import VisitorListAside from './VisitorListAside';
import { ReactElement } from 'react';
import { AnyAaaaRecord } from 'dns';
import { User } from '../types';


const VisitorFilters = (props:any) =>(
    <Filter {...props}>
        <TextInput label="Search" source="q"  />
        <TextInput label="Name" source="first_name" alwaysOn />
        <TextInput label="Father Name" source="father_name"/>
        <SegmentInput/>
        <DateInput label ="DOB" source = "birthday"/>
    </Filter>
);

const handlePrint = (e:any)=>{
    window.print();
    
}

const useStyles = makeStyles(theme => ({
    nb_commands: { color: 'purple' },
    root:{
        marginTop: '150px',
        padding: '20px',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
    },
    hiddenOnSmallScreens: {
        display: 'table-cell',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },

    },

   
}));

const VisitorList = (props:ListProps): ReactElement => {
    
    const classes = useStyles();
    const isXsmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
       
    );
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
    return (
        <List
            
            {...props}        
            sort={{ field: 'last_seen', order: 'DESC' }}
            perPage={25}
            filters = {<VisitorFilters/>}
            className = {classes.root}
        >
            {isXsmall ? (
                <MobileGrid />
            ) : (
                <div >
                   <IconButton onClick = {handlePrint}>
                       <Print/>
                   </IconButton>
                <Datagrid optimized rowClick="edit" >
                    <UserLinkField />
                    <TextField source = "father_name" label ="Father Name"/>
                    <DateField source="birthday" />
                    <TextField source ="cnic"/>
                    <TextField source="email"/>
                    <SegmentsField
                        cellClassName={classes.hiddenOnSmallScreens}
                        headerClassName={classes.hiddenOnSmallScreens}
                    />
                    <DeleteButton/>
                </Datagrid>
                </div>
            )}
          
        </List>
    );
};

export default VisitorList;