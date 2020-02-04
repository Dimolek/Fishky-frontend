import {makeStyles} from "@material-ui/core";
import React from "react";

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
}));

function AskUser(props) {
    const classes = useStyles();
    const {dictionary} = props;

    return (
        <div className={classes.content}>
            {dictionary.name}
            {dictionary.language}
        </div>
    );
}

export default AskUser;