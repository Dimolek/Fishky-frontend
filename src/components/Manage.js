import React from 'react';
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography/Typography";


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

function Manage() {
    const classes = useStyles();

    return (
        <div className={classes.background}>
            <div className={classes.content}>
                <Typography variant="h1">
                    Fishky
                </Typography>
                <Typography variant='h3'>
                    Manage
                </Typography>
            </div>
        </div>
    );
}
export default Manage;