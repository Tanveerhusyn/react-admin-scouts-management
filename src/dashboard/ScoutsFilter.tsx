import * as React from 'react';
import { FC } from 'react';
import DollarIcon from '@material-ui/icons/AttachMoney';
import { useTranslate } from 'react-admin';
import { stringify } from 'query-string';
import CardWithIcon from './CardWithIcon';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core';
interface Props {
    value?: string;
    segment?: string;
    icon?:  any;
    path?: string;
    title?: string;
    
}

const ScoutsFilter: FC<Props> = ({ value, segment, icon, path , title }) => {
    const translate = useTranslate();
    
    return (
        <Button
          style = {{width: '18rem'}}
          component={Link}
          to={{
            pathname: path,
            search: stringify({
                filter: JSON.stringify({ groups: segment?.toString() }),
            }),
        }}
        >
        <CardWithIcon
            to = ''
            icon={icon}
            title={title}
            subtitle={value}
        />
        </Button>
    );
};

export default ScoutsFilter;
