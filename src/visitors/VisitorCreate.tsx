import * as React from 'react';
import { FC } from 'react';
import {
    Create,
    CreateProps,
    DateInput,
    SimpleForm,
    TextInput,
    useTranslate,
    PasswordInput,
    required,
    email,
    List,
    ImageInput,
    ImageField,
    useRedirect,
} from 'react-admin';
import { AnyObject } from 'react-final-form';
import VisitorListAside from './VisitorListAside';
import { Typography, Box, Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';
import { Dialog } from '@material-ui/core';
import SegmentsInput from './SegmentsInput';

export const styles: Styles<Theme, any> = {
    root: {display: 'flex',
justifyContent: 'space-between'},
    create: {
        maxWidth: 400,
    },
    avatar: {display: 'inline-block'},
    first_name: { display: 'inline-block' },
    last_name: { display: 'inline-block' ,marginLeft: 32 },
    email: {maxWidth: 300,},
    address: { display: 'inline-block' },
    zipcode: { display: 'inline-block' },
    city: { display: 'inline-block', marginLeft: 32 },
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    password: { display: 'inline-block' },
    confirm_password: { display: 'inline-block', marginLeft: 32 },
};

const useStyles = makeStyles(styles);



export const validatePasswords = ({
    password,
    confirm_password,
}: AnyObject) => {
    const errors = {} as any;

    if (password && confirm_password && password !== confirm_password) {
        errors.confirm_password = [
            'resources.Users.errors.password_mismatch',
        ];
    }

    return errors;
};

const VisitorCreate: FC<CreateProps> = props => {
    const classes = useStyles(props);
    const redirect = useRedirect();

    const handleClose = () => {
        redirect('/Users');
    };


    const convertFileToBase64 = (file:any) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

       const r = reader.readAsDataURL(file.rawFile);
       console.log(r);
    });

    return (
        <div  className ={classes.root}>
     <Dialog open onClose={handleClose}>
        <Create {...props}>
            <SimpleForm validate={validatePasswords}>
                <SectionTitle label="Identity" />
                
                <ImageInput  source="avatar" label="Related pictures" accept="image/*" placeholder={<p>Drop your file here</p>}>
                    <ImageField source="src" title="title" />
                </ImageInput>
                    
                
                <TextInput
                    autoFocus
                    source="first_name"
                    formClassName={classes.first_name}
                    validate={requiredValidate}
                    variant="outlined"
                />
                <TextInput
                    
                    source="last_name"
                    formClassName={classes.last_name}
                    validate={requiredValidate}
                    variant="outlined"
                />
                <TextInput
                    source="father_name"
                    formClassName={classes.address}
                    multiline
                    fullWidth
                    variant="outlined"
                    helperText={false}
                />
                <TextInput
                    type="email"
                    source="email"
                    validation={{ email: true }}
                    fullWidth
                    variant="outlined"
                    formClassName={classes.email}
                    validate={[required(), email()]}
                />
                <DateInput source="birthday" variant="outlined" />
                <Separator />
                 
                <TextInput
                    source="cnic"
                    variant="outlined"
                    formClassName={classes.zipcode}
                    helperText={false}
                />
                <TextInput
                    source="Education"
                    variant="outlined"
                    formClassName={classes.city}
                    helperText={false}
                />
                <Separator />
                <SegmentsInput fullWidth variant="outlined"/>
                
                
            </SimpleForm>
        </Create>
        </Dialog>
        </div>
    );
};

const requiredValidate = [required()];

const SectionTitle = ({ label }: { label: string }) => {
    const translate = useTranslate();

    return (
        <Typography variant="h6" gutterBottom>
            {translate(label)}
        </Typography>
    );
};

const Separator = () => <Box pt="1em" />;

export default VisitorCreate;
