import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import {Controller, useForm} from 'react-hook-form'
import './styles.css'
import { Button } from '@mui/material'

export const UserForm = () => {
    
    const {
        handleSubmit,
        control,
        formState: { errors }
      } = useForm();

    const onSubmitForm = (data) => {
        console.log(data)
    }

    return (
        <Box 
            component="section"  
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                pr: 2,
                pl: 2
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 3
                }}
            >
                <header>
                    <h2>User Form</h2>
                </header>
                <Box
                    component="form"
                    className='user-form'
                    sx={{
                        '& .MuiTextField-root': { mb: 1, mr: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <Controller
                                name="name"
                                control={control}
                                defaultValue={""}
                                rules={{ required: "name is required" }}
                                render={({ field: { ref, ...field } }) => (
                                    <TextField
                                        {...field}
                                        inputRef={ref}
                                        id="name"
                                        required
                                        variant="outlined"
                                        error={!!errors.name}
                                        label="Name"
                                        helperText={errors.name && errors.name.message}
                                    />
                                )}
                            />

                        <Controller
                            name="username"
                            control={control}
                            defaultValue={""}
                            rules={{ required: "Username is required" }}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    inputRef={ref}
                                    id="username"
                                    required
                                    variant="outlined"
                                    error={!!errors.username}
                                    label="Username"
                                    helperText={errors.username && errors.username.message}
                                />
                            )}
                        />

                    </div>
                    <div>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue={""}
                            rules={{
                                required: "Email is required", 
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            }}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    inputRef={ref}
                                    id="email"
                                    required
                                    variant="outlined"
                                    error={!!errors.email}
                                    label="Email"
                                    helperText={errors.email && errors.email.message}
                                />
                            )}
                        />

                        <Controller
                            name="city"
                            control={control}
                            defaultValue={""}
                            rules={{ required: "City is required" }}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    inputRef={ref}
                                    id="city"
                                    required
                                    variant="outlined"
                                    error={!!errors.city}
                                    label="City"
                                    helperText={errors.city && errors.city.message}
                                />
                            )}
                        />
                    </div>
                </Box>
                <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        pt: 2
                    }}>
                    <Button size='small' sx={{mr: 1}} variant='contained' color="error" >Cancel</Button>
                    <Button size='small' variant='contained' color="success" onClick={handleSubmit(onSubmitForm)}>Submit</Button>
                </Box>
            </Paper>
        </Box>
      );
}