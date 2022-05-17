import * as React from 'react';
import { FC } from 'react';
import { Card as MuiCard, CardContent } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOnOutlined';
import MailIcon from '@material-ui/icons/MailOutline';
import LocalOfferIcon from '@material-ui/icons/LocalOfferOutlined';
import { FilterList, FilterListItem, FilterLiveSearch } from 'react-admin';
import {
    endOfYesterday,
    startOfWeek,
    subWeeks,
    startOfMonth,
    subMonths,
} from 'date-fns';

import segments from '../segments/data';
import { FullscreenExit } from '@material-ui/icons';

const Card = withStyles(theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    content:{
        display: 'flex',
    },
}))(MuiCard);


const useStyle = makeStyles(theme =>({
    content: {
        display: 'flex',
    },
}));


const Aside: FC = () => {
const classes = useStyle();
   return ( 
    <Card >
        <CardContent>      
            <FilterList
                label="resources.Users.filters.group"
                icon={<LocalOfferIcon />}
            >
                {segments.map(segment => (
                    <FilterListItem
                        label={segment.name}
                        key={segment.id}
                        value={{ groups: segment.id }}
                    />
                ))}
            </FilterList>
        </CardContent>
    </Card>);
};

export default Aside;
