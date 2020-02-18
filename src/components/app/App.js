import React from 'react';
import './App.css';
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography/Typography";
import logo from "../../images/logo.png";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    background: {
        width: "100%",
        height:"100%",
        minHeight: "100vh",
        backgroundColor:"#0D870B",
    },
    content: {
        textAlign: 'center',
    },
    image: {
        padding: theme.spacing(4)
    },
    text: {
        paddingLeft: theme.spacing(20),
        paddingRight: theme.spacing(20)
    }
}));

function App() {
    const classes = useStyles();

    return (
        <div className={classes.background}>
            <div className={classes.content}>
                <div className={classes.image}>
                    <img src={logo} alt="logo"/>
                </div>
                <Typography variant='h4' className={classes.text}>
                    An Internet application to help you train your language skills by imitating flashcards (Polish: fiszki).
                    Create an account to start creating your own dictionaries and start practising!
                </Typography>
            </div>
        </div>
    );
}

export default App;
