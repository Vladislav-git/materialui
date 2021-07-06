import React, {useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";
import { TextField, Button, Grid, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Form: {
        width: '70%',
        alignItems: 'center',
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
    const [registerForm, setRegisterForm] = useState({})



    const sendForm = (registerForm:any) => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/register',
            data: registerForm
        })
            .then(resp => {
                if (resp.data === 'user created') {
                    history.push('/login')
                } else {
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
                        onChange={(firstName) => setRegisterForm({...registerForm, firstName})}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                        className={classes.Input}
                        required
                        label='Secondname'
                        variant='outlined'
                        onChange={(secondName) => setRegisterForm({...registerForm, secondName})}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                        className={classes.Input}
                        required
                        label='Email'
                        variant='outlined'
                        onChange={(email) => setRegisterForm({...registerForm, email})}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                        className={classes.Input}
                        required
                        label='Password'
                        variant='outlined'
                        onChange={(password) => setRegisterForm({...registerForm, password})}
                        />
                    </Grid>
                    <Grid item>
                        <RadioGroup className={classes.Group} aria-label="user" name="user" value='user'>
                            <FormControlLabel onChange={(role) => setRegisterForm({...registerForm, role})} value="user" control={<Radio color='default' />} label="User" />
                            <FormControlLabel onChange={(role) => setRegisterForm({...registerForm, role})} value="admin" control={<Radio color='default' />} label="Admin" />
                        </RadioGroup>
                    </Grid>
                </Grid>
                <Button onSubmit={() => sendForm(registerForm)} className={classes.Button} >Submit</Button>
            </form>
        </div>
    );
}

export default Register;