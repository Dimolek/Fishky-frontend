import React from 'react';
import {makeStyles} from "@material-ui/core";
import DictionariesTable from "./BrowseDictionaries/DictionariesTable";
import AskUser from "./AskUser";
import Paper from "@material-ui/core/Paper/Paper";


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

function Practice() {
    const classes = useStyles();
    const axios = require('axios').default;
    const [usersDictionaries, setUsersDictionaries] = React.useState([]);
    const [dictionary, setDictionary] = React.useState({});
    const [isPracticing, setIsPracticing] = React.useState(false);
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {

        axios.defaults.headers.common['Authorization'] =  sessionStorage.getItem('Token');
        axios.get("http://localhost:8080/findUsersDictionaries")
            .then(function (response) {
                setUsersDictionaries(response.data);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const chooseDictionary = (dictionary, isPracticing) => {
        setDictionary(dictionary);
        setIsPracticing(isPracticing);
    };

    return (
        <div className={classes.background}>
            <div className={classes.content}>
                <Paper elevation={10} >
                    <DictionariesTable dictionaries={usersDictionaries} chooseDictionary={chooseDictionary}/>
                </Paper>
                <Paper elevation={15}>
                    {isPracticing && <AskUser dictionary={dictionary} index={index}/>}
                </Paper>
            </div>
        </div>
    );
}

export default Practice;