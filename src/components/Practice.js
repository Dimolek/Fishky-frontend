import React from 'react';
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import DictionariesTable from "./BrowseDictionaries/DictionariesTable";
import AskUser from "./AskUser";


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

    React.useEffect(() => {

        axios.get("http://localhost:8080/findUsersDictionaries?id=2")
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
                <DictionariesTable dictionaries={usersDictionaries} chooseDictionary={chooseDictionary}/>
                <Button onClick={e => {console.log(usersDictionaries)}}>
                    dunno
                </Button>
                {isPracticing && <AskUser dictionary={dictionary}/>}
            </div>
        </div>
    );
}

export default Practice;