import * as React from 'react';
import { FC } from 'react';
import { Link, FieldProps } from 'react-admin';

import FullNameField from './FullNameField';
import { User } from '../types';
import VisitorShow from './VisitorShow';
import VisitorEdit from './VisitorEdit';

const UserLinkField: FC<FieldProps<User>> = props =>
    props.record ? (
        <Link to={`/Users/${props.record.id}`}>
            <FullNameField {...props}/>
        </Link>
    ) : null;

UserLinkField.defaultProps = {
    source: 'User_id',
    addLabel: true,
};

export default UserLinkField;
