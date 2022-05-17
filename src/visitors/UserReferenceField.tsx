import * as React from 'react';
import { FC } from 'react';
import { ReferenceField, ReferenceFieldProps } from 'react-admin';

import FullNameField from './FullNameField';

const UserReferenceField: FC<
    Omit<ReferenceFieldProps, 'reference' | 'children' | 'source'> & {
        source?: string;
    }
> = props => (
    <ReferenceField source="User_id" reference="Users" {...props}>
        <FullNameField />
      
    </ReferenceField>
);

UserReferenceField.defaultProps = {
    source: 'User_id',
    addLabel: true,
};

export default UserReferenceField;
