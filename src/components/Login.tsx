import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { TextField, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useUpdateC, useC } from '../context/Context'
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
        display: 'flex',
        flexDirection: 'column',
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


function Login() {

    const classes = useStyles();
    let history = useHistory();
    const [loginForm, setLoginForm] = useState({email: '', password: ''})
    const {context}:any = useC()
    const {updateData}:any = useUpdateC();

    const sendForm = (loginForm:any) => {
        axios({
            method: 'post',
            url: 'http://192.168.31.181:8000/login',
            data: loginForm
        })
            .then(resp => {
                if (resp.data.msg === 'ok') {
                    updateData(resp.data)
                    history.push('/main')
                } else {
                    console.log(loginForm)
                    alert(resp.data)
                }
        })
    }
    
    return (
        
        <div className={classes.Main}>
            <h1 className={classes.H1}>Login</h1>
            <form className={classes.Form}>
                <Grid
                container
                className={classes.Container}>
                    <Grid item>
                        <TextField
                        className={classes.Input}
                        required
                        label='Email'
                        variant='outlined'
                        onChange={event => setLoginForm({...loginForm, email: event.target.value})}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                        className={classes.Input}
                        required
                        label='Password'
                        variant='outlined'
                        onChange={event => setLoginForm({...loginForm, password: event.target.value})}
                        />
                    </Grid>
                </Grid>
                <Button onClick={() => sendForm(loginForm)} disableTouchRipple={true} className={classes.Button} >Submit</Button>
            </form>
        </div>
    );
}

export default Login;