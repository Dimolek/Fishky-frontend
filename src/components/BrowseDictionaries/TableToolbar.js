import {lighten, makeStyles} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography/Typography";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CheckIcon from '@material-ui/icons/Check';
import React from "react";

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export default function EnhancedTableToolbar(props) {
    const classes = useToolbarStyles();
    const { selected, dictionaries } = props;
    const axios = require('axios').default;

    const getChosenDictionary = id => {
        axios.get("http://localhost:8080/findDictionaryById?id=".concat(id))
            .then(function (response) {
                shuffleArray(response.data.translations);
                props.chooseDictionary(response.data, true);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleExecute = event => {
        let selectedDictionary = {};

        dictionaries.map(dictionary => {
            if (dictionary.name === selected)
                selectedDictionary = dictionary;
        });
        getChosenDictionary(selectedDictionary.id);
        props.setSelected('none');
    };

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: selected !== 'none',
            })}
        >
            <Typography className={classes.title} variant="h6" id="tableTitle">
                Your dictionaries
            </Typography>

            {selected !== 'none' ? (
                <Tooltip title="Click to practice">
                    <IconButton aria-label="execute" onClick={handleExecute}>
                        <CheckIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Choose dictionary">
                    <IconButton aria-label="check">
                        <CheckIcon color='disabled'/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};