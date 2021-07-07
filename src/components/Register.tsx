import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { TextField, Button, Grid, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    Input: {
      height: '10%',
      width: '40%',
      marginTop: '3%'
    },
    Container: {
        flexDirection: 'column',
    },
    Button: {
        marginTop: '5%',
        width: '40%',
        backgroundColor: '#4287f5',
        color: 'white'
    },
    Main: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Form: {
        width: '70%',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 5,
        borderColor: 'black'        
    },
    Item: {
        flexDirection: 'row'
    },
    H1: {
        marginTop: '5%'
    },
    Select: {
        marginTop: '5%',
    },
    Group: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3%'
    }
  }))

function Register() {

    const classes = useStyles();
    let history = useHistory();
    const [registerForm, setRegisterForm] = useState({firstName: '', lastName: '', email: '', password: '', role: 'user'})



    const sendForm = (registerForm:any) => {
        axios({
            method: 'post',
            url: 'http://192.168.31.181:8000/register',
            data: registerForm,
            headers: {"Accept": "application/json"}
        })
            .then(resp => {
                if (resp.data === 'user saved' || resp.data === 'user already registered') {
                    history.push('/login')
                } else {
                    console.log(resp.data)
                    alert(resp.data)
                }
        })
    }
    
    return (
        
        <div className={classes.Main}>
            <h1 className={classes.H1}>Registration</h1>
            <form className={classes.Form}>
                <Grid
                container
                className={classes.Container}>
                    <Grid
                    item
                    className={classes.Item}>
                        <TextField
                        className={classes.Input}
                        required
                        label='Firstname'
                        variant='outlined'
                        onChange={event => setRegisterForm({...registerForm, firstName: event.target.value})}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                        className={classes.Input}
                        required
                        label='Lastname'
                        variant='outlined'
                        onChange={event => setRegisterForm({...registerForm, lastName: event.target.value})}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                        className={classes.Input}
                        required
                        label='Email'
                        variant='outlined'
                        onChange={event => setRegisterForm({...registerForm, email: event.target.value})}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                        className={classes.Input}
                        required
                        label='Password'
                        variant='outlined'
                        onChange={event => setRegisterForm({...registerForm, password: event.target.value})}
                        />
                    </Grid>
                    <Grid item>
                        <RadioGroup className={classes.Group} aria-label="user" name="user" value={registerForm.role} onChange={event => setRegisterForm({...registerForm, role: event.target.value})}>
                            <FormControlLabel value="user" control={<Radio color='default' />} label="User" />
                            <FormControlLabel value="admin" control={<Radio color='default' />} label="Admin" />
                        </RadioGroup>
                    </Grid>
                </Grid>
                <Button onClick={() => sendForm(registerForm)} className={classes.Button} >Submit</Button>
            </form>
        </div>
    );
}

export default Register;