import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hook'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo, useState } from 'react'
import { startCreatingUserWithEmailPassword } from '../../store/auth'

const formData = {
    email: '',
    password: '',
    displayName: ''
}

const formValidations = {
    email: [ (value) => value.includes('@'), 'El correo debe contener @'],
    password: [ (value) => value.length >= 6, 'La contraseña debe ser mayor a 6 letras'],
    displayName: [ (value) => value.length >= 1, 'El nombre es requerido.'],
  }

export const RegisterPage = () => {

    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false);
  
    const { status, errorMessage } = useSelector( state => state.auth );
    const isCheckingAuthentication = useMemo( () => status === 'checking', [status]);
  
    const { 
      formState, displayName, email, password, onInputChange,
      isFormValid, displayNameValid, emailValid, passwordValid, 
    } = useForm( formData, formValidations );
  
    const onSubmit = ( event ) => {
      event.preventDefault();
      setFormSubmitted(true);
  
      if ( !isFormValid ) return;
  
      dispatch( startCreatingUserWithEmailPassword(formState) );
    }
    
  return (
    <AuthLayout title='Crear Cuenta'>
        <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
                <Grid container>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField
                            label="Full name"
                            type="text"
                            placeholder="Full Name"
                            fullWidth
                            name='displayName'
                            value={ displayName }
                            onChange={ onInputChange }
                            error={ !!displayNameValid && formSubmitted }
                            helperText={ displayNameValid }
                        >
                        </TextField>
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="email@google.com"
                            fullWidth
                            name='email'
                            value={ email }
                            onChange={ onInputChange }
                            error={ !!emailValid && formSubmitted }
                            helperText={ emailValid }
                        >
                        </TextField>
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="Password"
                            fullWidth
                            name='password'
                            value={ password }
                            onChange={ onInputChange }
                            error={ !!passwordValid && formSubmitted }
                            helperText={ passwordValid }
                        >
                        </TextField>
                    </Grid>

                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                        <Grid 
                            item 
                            xs={ 12 }
                            display={ !!errorMessage ? '': 'none' }
                        >
                            <Alert severity='error'>{ errorMessage }</Alert>
                        </Grid>
                    
                        <Grid item xs={ 12 }>
                            <Button 
                                disabled={ isCheckingAuthentication }
                                type='submit'
                                variant="contained" 
                                fullWidth
                            >
                                Crear Cuenta
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{ mr:1 }}>¿Ya tienes cuenta?</Typography>
                        <Link component={ RouterLink } color='inherit' to='/auth/login'>
                            Ingresar
                        </Link>
                    </Grid>

                </Grid>
            </form>
    </AuthLayout>
  )
}