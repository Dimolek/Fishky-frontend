import React from 'react';
import {makeStyles} from "@material-ui/core";
import EditDictionariesTable from "./EditDictionariesTable";
import Grid from "@material-ui/core/Grid/Grid";


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
    }
}));

function Manage() {
    const classes = useStyles();

    return (
        <div className={classes.background}>
            <div className={classes.content}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <EditDictionariesTable/>
                    </Grid>
                    <Grid item xs={6}>
                        <EditDictionariesTable/>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
export default Manage;