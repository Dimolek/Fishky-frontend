import React from 'react';
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";


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

    const [usersDictionaries, setUsersDictionaries] = React.useState([]);
    React.useEffect(() => {
        async function fetchData() {
            const request = new Request('http://localhost:8080/findUsersDictionaries?id=2', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect: 'manual',
            });
            const response = await fetch(request);
            const data = await response.json();
            setUsersDictionaries(data);
        };
        fetchData();
    }, []);
        /*async function fetchData()  {
            const res = await fetch("http://localhost:8080/findUsersDictionaries?id=2");
            res
                .json()
                .then(res => setUsersDictionaries(res))
                .catch(err => console.log(err));
        };
        fetchData();
    }, [])*/

    return (
        <div className={classes.background}>
            <div className={classes.content}>
                <Typography variant="h1">
                    Fishky
                </Typography>
                <Typography variant='h3'>
                    Practice
                </Typography>
                <Button onClick={e => {console.log(usersDictionaries)}}>

                </Button>
            </div>
        </div>
    );
}
export default Practice;