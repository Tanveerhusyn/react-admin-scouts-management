import * as React from 'react';
import { FC } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { FieldProps } from 'react-admin';
import { User } from '../types';

interface Props extends FieldProps<User> {
    className?: string;
    size?: string;
   
}

const AvatarField: FC<Props> = ( {record, size = '25', className }) =>{
  
 console.log(record?.avatar?.src);

return record ? (
        <Avatar
            src={record.avatar.src}
            style={{ width: parseInt(size, 10), height: parseInt(size, 10) }}
            className={className}
        />
    ) : null;
}

export default AvatarField;
