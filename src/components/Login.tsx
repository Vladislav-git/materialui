import React, {useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";
import { TextField, Button, Grid, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { borders } from '@material-ui/system';
import { useUpdateC } from '../context/Context'
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


function Login() {

    const classes = useStyles();
    let history = useHistory();
    const [loginForm, setLoginForm] = useState({})
    const {updateData}:any = useUpdateC();

    const sendForm = (loginForm:any) => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/login',
            data: loginForm
        })
            .then(resp => {
                if (resp.data.msg === 'user valid') {
                    updateData(resp.data.user, resp.data)
                    history.push('/main')
                } else {
                    alert(resp.data)
                }
        })
    }
    
    return (
        
        <div className={classes.Main}>
            <h1 className={classes.H1}>Login</h1>
            <FormControl variant='outlined' className={classes.Form}>
                <Grid
                container
                className={classes.Container}>
                    <Grid item>
                        <TextField
                        className={classes.Input}
                        required
                        label='Email'
                        variant='outlined'
                        onChange={(email) => setLoginForm({...loginForm, email})}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                        className={classes.Input}
                        required
                        label='Password'
                        variant='outlined'
                        onChange={(password) => setLoginForm({...loginForm, password})}
                        />
                    </Grid>
                </Grid>
                <Button onSubmit={() => sendForm(loginForm)} disableTouchRipple={true} className={classes.Button} >Submit</Button>
            </FormControl>
        </div>
    );
}

export default Login;