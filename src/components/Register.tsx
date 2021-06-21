import React, {useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";
import { TextField, Button, Grid, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
    },
    Form: {
        flex: 1,
        alignItems: 'center',        
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
        flexDirection: 'row'
    }
  }))

function Register() {

    const classes = useStyles();
    let history = useHistory();
    const [registerForm, setRegisterForm] = useState({})
    
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
                        <FormControl className={classes.Select} component="fieldset">
                            <FormLabel component="legend">Role</FormLabel>
                            <RadioGroup className={classes.Group} aria-label="user" name="user" value='user'>
                                <FormControlLabel value="user" control={<Radio />} label="User" />
                                <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button disableTouchRipple={true} className={classes.Button} >Submit</Button>
            </form>
        </div>
    );
}

export default Register;