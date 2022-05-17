import * as React from 'react';
import { useFilePicker } from 'use-file-picker';
import { FC } from 'react';
import {
    DateInput,
    Edit,
    EditProps,
    NullableBooleanInput,
    TextInput,
    PasswordInput,
    Toolbar,
    useTranslate,
    FormWithRedirect,
    required,
    email,
    useRedirect,
    ImageInput,
    ImageField,
    FieldProps,
    useListContext,
} from 'react-admin';
import { Box, Card, Paper,CardContent, Typography, Button, Fab,IconButton,Dialog} from '@material-ui/core';
import { LaptopWindows, Print } from '@material-ui/icons';

import Aside from './Aside';
import AvatarField from './AvatarField';
import FullNameField from './FullNameField';
import SegmentsInput from './SegmentsInput';
import { validatePasswords } from './VisitorCreate';
import { User } from '../types';
import classNames from 'classnames';

const VisitorEdit: FC<EditProps> = props => {
    return (
        <Edit
            title={<VisitorTitle />}
            aside={<Aside />}
            component="div"
            {...props}
        >
            <VisitorForm />
        </Edit>
    );
};



const VisitorTitle: FC<FieldProps<User>> = ({ record }) =>
    record ? <FullNameField record={record} size="32" /> : null;



const VisitorForm = (props: any) => {
    console.log("Edit",props);
    const translate = useTranslate();
       
   

    const handleClick = (e:any)=>{
        return(
            <Dialog open>
            <ImageInput  source="avatar" label="Related pictures" accept="image/*" placeholder={<p>Drop your file here</p>}>
                  <ImageField source="src" title="title" />
              </ImageInput>
              </Dialog>
        );
    };
    
    const handlePrint = ()=>{
        window.print();
    }

    return (
        <FormWithRedirect
            {...props}
            validate={validatePasswords}
            
            render={(formProps: any) => (

                <Paper elevation = {3} style ={{marginTop: 20}}>
                    <form>
                        <CardContent>
                        <IconButton onClick = {handlePrint}>
                          <Print/>
                         </IconButton>
                            <Box display={{ md: 'block', lg: 'flex' }} >
                                <Box flex={2} mr={{ md: 0, lg: '1em' }}>
                                    <Typography variant="h6" gutterBottom>
                                       Identity
                                    </Typography>
                                   <IconButton onClick ={handleClick}>
                                     <AvatarField  {...formProps} size = {150} marginTop = {10} />
                                   </IconButton>
                                    <Box display={{ xs: 'block', sm: 'flex' }} marginTop = {5}>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                contentEditable = {false}
                                                source="first_name"
                                                resource="Users"
                                                validate={requiredValidate}
                                                fullWidth
                                                variant="outlined"
                                            />
                                        </Box>
                                        <Box
                                            flex={1}
                            
                                            mr={{ xs: 0, sm: '0.5em' }}
                                            
                                        >
                                        
                                        
                        
                                            <TextInput
                                                // display = "flex"
                                                // type = "file"
                                                // accept="image/*"
                                                source="avatar.src"
                                                resource="Users"
                                                validate={requiredValidate}
                                                fullWidth
                                                variant="outlined"
                                            />
                                        
                                            
                                        </Box>
                                        <Box
                                            flex={1}
                                            ml={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                source="last_name"
                                                resource="Users"
                                                validate={requiredValidate}
                                                fullWidth
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Box>
                                    <TextInput
                                        type="email"
                                        source="email"
                                        resource="Users"
                                        validate={[email(), required()]}
                                        fullWidth
                                        variant="outlined"
                                    />
                                    <Box display={{ xs: 'block', sm: 'flex' }}>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <DateInput
                                                source="birthday"
                                                resource="Users"
                                                fullWidth
                                                helperText={false}
                                                variant="outlined"
                                            />
                                        </Box>
                                        <Box
                                            flex={2}
                                            ml={{ xs: 0, sm: '0.5em' }}
                                        />
                                    </Box>

                                    <Box mt="1em" />

                                  
                                    <TextInput
                                        source="father_name"
                                        resource="Users"
                                        multiline
                                        fullWidth
                                        helperText={false}
                                        variant="outlined"
                                    />
                                    <Box display={{ xs: 'block', sm: 'flex' }}>
                                        <Box
                                            flex={2}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                source="city"
                                                resource="Users"
                                                fullWidth
                                                helperText={false}
                                                variant="outlined"
                                            />
                                        </Box>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                source="cnic"
                                                resource="Users"
                                                fullWidth
                                                helperText={false}
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Box>

                                    <Box mt="1em" />

                                  
                                    <Box display={{ xs: 'block', sm: 'flex' }}>
                                        
                                </Box>
                                <Box
                                    flex={1}
                                    ml={{ xs: 0, lg: '1em' }}
                                    mt={{ xs: '1em', lg: 0 }}
                                >
                                    
                                    <div style ={{marginTop: 215}}>
                                        <SegmentsInput fullWidth variant="outlined"/>
                                    </div>
                                   
                                </Box>
                            </Box>
                            </Box>
                        </CardContent>
                        <Toolbar
                            record={formProps.record}
                            basePath={formProps.basePath}
                            undoable={true}
                            invalid={formProps.invalid}
                            handleSubmit={formProps.handleSubmit}
                            saving={formProps.saving}
                            resource="Users"
                        />
                    </form>
                </Paper>
            )}
        />
    );
};

const requiredValidate = [required()];

export default VisitorEdit;
