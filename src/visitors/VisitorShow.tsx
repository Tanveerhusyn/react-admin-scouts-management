import * as React from 'react';
import { FC } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
    useShowController,
    ReferenceField,
    TextField,
    FieldProps,
    Show, SimpleShowLayout, DateField, RichTextField
} from 'react-admin';

import Basket from '../orders/Basket';
import { User, Invoice } from '../types';

// const UserField: FC<FieldProps<User>> = ({ record }) => 
// record ? (
     
//         <Typography>
//             {record.first_name} {record.last_name}
//             <br />
//             {record.address}
//             <br />
//             {record.city}, {record.zipcode}
//         </Typography>
//     ) : null;



const VisitorShow = (props: any) => {
   
    const { record } = useShowController<User>(props);
    const classes = useStyles();

    if (!record) return null;
    return (
        <Card className={classes.root}>
        <CardContent>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>
                        Tanveer Hussain {record.first_name}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom align="right">
                        Invoice {record.last_name}
                    </Typography>
                </Grid>
            </Grid>
            </CardContent>
            </Card>
    );
};

export default VisitorShow;

const useStyles = makeStyles({
    root: { width: 600, margin: 'auto' },
    spacer: { height: 20 },
    invoices: { margin: '10px 0' },
});
