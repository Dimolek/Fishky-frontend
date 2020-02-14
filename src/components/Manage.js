import React from 'react';
import {makeStyles} from "@material-ui/core";
import EditDictionariesTable from "./EditDictionariesTable";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import EditTranslationsTable from "./EditTranslationsTable";


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
    }
}));

function Manage() {
    const classes = useStyles();
    const axios = require('axios').default;
    const [usersDictionaries, setUsersDictionaries] = React.useState([]);
    const [dictionary, setDictionary] = React.useState([]);
    const [dictionariesLoaded, setDictionariesLoaded] = React.useState(false);
    const [translationsLoaded, setTranslationsLoaded] = React.useState(false);

    React.useEffect(() => {

        axios.defaults.headers.get['Authorization'] =  sessionStorage.getItem('token');
        axios.get("http://localhost:8080/findUsersDictionaries?id=2")
            .then(function (response) {
                setUsersDictionaries(response.data);
                console.log(response.data);
                setDictionariesLoaded(true);
            })
            .catch(function (error) {
                console.log(error);
            });


    }, []);

    return (
        <div className={classes.background}>
            <div className={classes.content}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        {dictionariesLoaded && <Paper elevation={10}>
                            <EditDictionariesTable
                                dictionaries={usersDictionaries}
                                setDictionary={setDictionary}
                                setTranslationsLoaded={setTranslationsLoaded}
                            />
                        </Paper>}
                    </Grid>
                    <Grid item xs={6}>
                        {translationsLoaded && <Paper elevation={10}>
                            <EditTranslationsTable dictionary={dictionary}/>
                        </Paper>}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Manage;