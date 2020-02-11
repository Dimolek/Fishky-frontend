import React from 'react';
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography/Typography";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    background: {
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        backgroundColor: "#0D870B",
    },
    content: {
        fontFamily: "Arial",
        textAlign: 'center',
        fontSize: 40,
        padding: theme.spacing(3),
        fontWeight: 600,
    },
    paper: {
        spacingTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
        borderRadius: '22px',
        paddingRight: '25px',
        paddingLeft: '25px',
        paddingBottom: '15px',
        paddingTop: '5px'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#D13434"
    }
}));

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#0D870B',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#0D870B',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#000000',
            },
            '&:hover fieldset': {
                borderColor: '#0D870B',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#0D870B',
            },
        },
    },
})(TextField);

const handleSubmit = event => {
    const axios = require('axios').default;

    axios.post("http://localhost:8080/addUser", {
        //todo
    }).then(function (response) {
        console.log('sukces');
    }).catch(function (error) {
        console.log(error);
    });
}

function Register() {
    const classes = useStyles();

    return (
        <div className={classes.background}>
            <Container component="main" maxWidth="xs" style={{'paddingTop': 70}}>
                <CssBaseline/>
                <Paper elevation={12} className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create account
                    </Typography>
                    <form className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <CssTextField
                                    className={classes.margin}
                                    autoComplete="Username"
                                    name="username"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoFocus
                                />
                                {/* <TextField
                                        autoComplete="Username"
                                        name="username"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        autoFocus
                                        //value={this.state.userName}
                                        //onChange={this.handleUserName}
                                    />*/}
                            </Grid>
                            <Grid item xs={12}>
                                <CssTextField
                                    className={classes.margin}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                />
                                {/*<TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        //value={this.state.password}
                                        //onChange={this.handlePassword}
                                    />*/}
                            </Grid>
                            <Grid item xs={12}>
                                <CssTextField
                                    className={classes.margin}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confirmpassword"
                                    label="Confirm Password"
                                    type="confirmpassword"
                                    id="confirmpassword"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}
                        >
                            Register
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="/Login" variant="body2">
                                    Already have an account? Sign in!
                                </Link>
                            </Grid>
                        </Grid>
                    </form>

                </Paper>
            </Container>
        </div>
    );
}

export default Register;