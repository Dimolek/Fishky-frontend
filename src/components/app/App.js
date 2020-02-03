import React from 'react';
import './App.css';
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography/Typography";
import placeholder from "../../images/placeholder.jpg";


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
        fontFamily:"Arial",
        textAlign: 'center',
        fontSize: 40,
        padding: theme.spacing(3),
        fontWeight: 600,
    },
}));

function App() {
    const classes = useStyles();

    return (
        <div className={classes.background}>
            <div className={classes.content}>
                <Typography variant="h1">
                    Fishky
                </Typography>
                <img src={placeholder} alt="placeholder" />
                <Typography variant='h3'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci. Nam congue, pede vitae dapibus aliquet, elit magna vulputate arcu, vel tempus metus leo non est. Etiam sit amet lectus quis est congue mollis. Phasellus congue lacus eget neque. Phasellus ornare, ante vitae consectetuer consequat, purus sapien ultricies dolor, et mollis pede metus eget nisi. Praesent sodales velit quis augue. Cras suscipit, urna at aliquam rhoncus, urna quam viverra nisi, in interdum massa nibh nec erat.
                </Typography>
            </div>
        </div>
    );
}

export default App;
