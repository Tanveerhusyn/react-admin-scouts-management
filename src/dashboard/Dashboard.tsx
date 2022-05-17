import React, {
    useState,
    useEffect,
    useCallback,
    FC,
    CSSProperties,
} from 'react';
import { useVersion, useDataProvider } from 'react-admin';
import { useMediaQuery, Theme,Avatar } from '@material-ui/core';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector,TimelineContent,TimelineOppositeContent,TimelineDot} from '@material-ui/lab';
import { subDays } from 'date-fns';

import Welcome from './Welcome';
import MonthlyRevenue from './MonthlyRevenue';
import NbNewOrders from './NbNewOrders';
import PendingOrders from './PendingOrders';
import PendingReviews from './PendingReviews';
import NewUsers from './NewUsers';
import OrderChart from './OrderChart';
import ScoutsFilter from './ScoutsFilter';
import Scouts from '../layout/Scout.png';
import PersonIcon from '@material-ui/icons/Person';

import { User, Order, Review } from '../types';
import segments from '../visitors/segments';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

interface OrderStats {
    revenue: number;
    nbNewOrders: number;
    pendingOrders: Order[];
}

interface UserData {
    [key: string]: User;
}

interface State {
    nbNewOrders?: number;
    nbPendingReviews?: number;
    pendingOrders?: Order[];
    pendingOrdersUsers?: UserData;
    pendingReviews?: Review[];
    pendingReviewsUsers?: UserData;
    recentOrders?: Order[];
    revenue?: string;
}

const styles = {
    
    flex: {marginTop: 20, display: 'flex', border: 'solid black'},
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '0.5em' },
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em' },
};

const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

const Dashboard: FC = () => {
    const classes = useStyles();
    const [state, setState] = useState<State>({});
    const [count, setcount] = useState<State>({});
    const [user, setUser] = useState<User[]>([]);
    let val = 0;
    const version = useVersion();
    const dataProvider = useDataProvider();
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('md')
    );

    

    const fetchOrders = useCallback(async () => {
        const aMonthAgo = subDays(new Date(), 30);
        const { data: recentOrders } = await dataProvider.getList<Order>(
            'commands',
            {
                filter: { date_gte: aMonthAgo.toISOString() },
                sort: { field: 'date', order: 'DESC' },
                pagination: { page: 1, perPage: 50 },
            }
        );
    
        const aggregations = recentOrders
            .filter(order => order.status !== 'cancelled')
            .reduce(
                (stats: OrderStats, order) => {
                    if (order.status !== 'cancelled') {
                        stats.revenue += order.total;
                        stats.nbNewOrders++;
                    }
                    if (order.status === 'ordered') {
                        stats.pendingOrders.push(order);
                    }
                    return stats;
                },
                {
                    revenue: 0,
                    nbNewOrders: 0,
                    pendingOrders: [],
                }
            );
        setState(state => ({
            ...state,
            recentOrders,
            revenue: aggregations.revenue.toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            nbNewOrders: aggregations.nbNewOrders,
            pendingOrders: aggregations.pendingOrders,
        }));
        const { data: Users } = await dataProvider.getMany<User>(
            'Users',
            {
                ids: aggregations.pendingOrders.map(
                    (order: Order) => order.User_id
                ),
            }
        );
        setState(state => ({
            ...state,
            pendingOrdersUsers: Users.reduce(
                (prev: UserData, User) => {
                    prev[User.id] = User; // eslint-disable-line no-param-reassign
                    return prev;
                },
                {}
            ),
        }));
    }, [dataProvider]);

    const fetchUsers = useCallback(async () => {
        const { data: Users } = await dataProvider.getList<User>(
            'Users',
            {
                filter: {},
                sort: { field: 'DOB', order: 'DESC' },
                pagination: { page: 1, perPage: 100 },
            }
        );

        // Users.filter((segment) => (
        //     console.log("I dont know:",segment)
        // ));
        setUser(Users);
        },[dataProvider]);

    
    const fetchReviews = useCallback(async () => {
        const { data: reviews } = await dataProvider.getList<Review>(
            'reviews',
            {
                filter: { status: 'pending' },
                sort: { field: 'date', order: 'DESC' },
                pagination: { page: 1, perPage: 100 },
            }
        );
        const nbPendingReviews = reviews.reduce((nb: number) => ++nb, 0);
        const pendingReviews = reviews.slice(0, Math.min(10, reviews.length));
        setState(state => ({ ...state, pendingReviews, nbPendingReviews }));
        const { data: Users } = await dataProvider.getMany<User>(
            'Users',
            {
                ids: pendingReviews.map(review => review.User_id),
            }
        );
        setState(state => ({
            ...state,
            pendingReviewsUsers: Users.reduce(
                (prev: UserData, User) => {
                    prev[User.id] = User; // eslint-disable-line no-param-reassign
                    return prev;
                },
                {}
            ),
        }));
    }, [dataProvider]);

    useEffect(() => {
        fetchUsers();
        fetchOrders();
        fetchReviews();
    }, [version]); // eslint-disable-line react-hooks/exhaustive-deps

    user.map((value)=>{
        
        val++;
    });
    console.log("Vlaue",val.toString());
    const {
        nbNewOrders,
        nbPendingReviews,
        pendingOrders,
        pendingOrdersUsers,
        pendingReviews,
        pendingReviewsUsers,
        revenue,
        recentOrders,
    } = state;
    return isXSmall ? (
        <div>
            <div style={styles.flexColumn as CSSProperties}>
                <Welcome />
               
                <MonthlyRevenue value={revenue} />
                <VerticalSpacer />
                <NbNewOrders value={nbNewOrders} />
                <VerticalSpacer />
                <PendingOrders
                    orders={pendingOrders}
                    Users={pendingOrdersUsers}
                />
            </div>
        </div>
    ) : isSmall ? (
        <div style={styles.flexColumn as CSSProperties}>
            <div style={styles.singleCol}>
                {/* <Welcome /> */}
            </div>
            <div style={styles.flex}>
                <MonthlyRevenue value={revenue} />
                <Spacer />
                <NbNewOrders value={nbNewOrders} />
            </div>
            <div style={styles.singleCol}>
                <OrderChart orders={recentOrders} />
            </div>
            <div style={styles.singleCol}>
                <PendingOrders
                    orders={pendingOrders}
                    Users={pendingOrdersUsers}
                />
            </div>
        </div>
    ) : (
        <>
            
            <Welcome />
            
            <div style={{marginTop: 20, display: 'flex', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px', padding: '20px', backgroundColor: '#f7e6ff'}}>
            <ScoutsFilter value = {val.toString()} segment = "Girl Guide" icon = {PersonIcon} path = '/Users' title = "Gril Guides"/>
                        <Spacer />
                        <ScoutsFilter value = {val.toString()} segment = "Shaheen" icon = {PersonIcon} path = '/Users' title = "Shaheen"/>
                        <Spacer />
                        <ScoutsFilter value = {val.toString()} segment = "Rover" icon = {PersonIcon} path = '/Users' title = "Rover"/>
                        <Spacer />
                        <ScoutsFilter value = {val.toString()} segment = "Boy Scout" icon = {PersonIcon} path = '/Users' title = "Scouts"/>
                        
            </div>
            <div style = {{marginLeft: '60rem', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px', marginTop: '2rem'}}>
           <Timeline>
               {
                   user.map((data)=>(
                    <TimelineItem>
                      <TimelineOppositeContent>
                        <Typography variant="body2" color="textSecondary">
                          {data.first_name} {data.last_name}
                        </Typography>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot>
                          <Avatar src = {data.avatar.src} />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                       <Typography>{data.birthday}</Typography>
                      </TimelineContent>
                    </TimelineItem>
                   ))
               }
           </Timeline>
            </div>
        </>
    );
};

export default Dashboard;
