import * as React from 'react';
import { FC } from 'react';
import {
    List,
    ListProps,
    Datagrid,
    TextField,
    DateField,
    ReferenceField,
    NumberField,
    DateInput,
    TextInput
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

import FullNameField from '../visitors/FullNameField';
import AddressField from '../visitors/AddressField';
import InvoiceShow from './InvoiceShow';

const listFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
    <TextInput label="Title" source="title" defaultValue="Hello, World!" />
];

const useStyles = makeStyles(theme => ({
    hiddenOnSmallScreens: {
        display: 'table-cell',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
}));

const InvoiceList: FC<ListProps> = props => {
    const classes = useStyles();
    return (
        <List
            {...props}
            // filters={listFilters}
            perPage={25}
            sort={{ field: 'date', order: 'desc' }}
        >
            <Datagrid rowClick="expand" expand={<InvoiceShow />}>
                <TextField source="id" />
                <DateField source="date" />
                {/* <ReferenceField source="User_id" reference="Users">
                    <FullNameField />
                </ReferenceField> */}
                <ReferenceField
                    source="User_id"
                    reference="Users"
                    link={false}
                    label="resources.invoices.fields.address"
                    cellClassName={classes.hiddenOnSmallScreens}
                    headerClassName={classes.hiddenOnSmallScreens}
                >
                    <AddressField />
                </ReferenceField>
                <ReferenceField source="command_id" reference="commands">
                    <TextField source="reference" />
                </ReferenceField>
                <NumberField source="total_ex_taxes" />
                <NumberField source="delivery_fees" />
                <NumberField source="taxes" />
                <NumberField source="total" />
            </Datagrid>
        </List>
    );
};

export default InvoiceList;
