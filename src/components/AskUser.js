import {makeStyles} from "@material-ui/core";
import React from "react";
import Radio from "@material-ui/core/Radio/Radio";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button/Button";
import {shuffleArray} from "./BrowseDictionaries/TableToolbar";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        fontFamily: "Arial",
        textAlign: 'center',
        fontSize: 25,
        padding: theme.spacing(3),
        fontWeight: 300,
        justifyContent: 'center',
    },
    radioGroup: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        display: 'inline-block'
    },
    button: {
        background: "#D13434",
        color: 'white',
        marginTop: theme.spacing(2)
    }
}));

function AskUser(props) {
    const classes = useStyles();
    const {dictionary} = props;
    const [index, setIndex] = React.useState(props.index);
    const [selectedValue, setSelectedValue] = React.useState('baseLanguage');


    const handleRadioChange = event => {
        setSelectedValue(event.target.value);
    };

    const handleClick = event => {
        if (index === dictionary.translations.length - 1) {
            shuffleArray(dictionary.translations);
            setIndex(0);
        } else setIndex(index + 1);
    };

    return (
        <div className={classes.content}>
            <RadioGroup className={classes.radioGroup} defaultValue="baseLanguage" aria-label="language" name="radios" row>
                <FormControlLabel
                    value="baseLanguage"
                    control={<Radio
                        checked={selectedValue === 'baseLanguage'}
                        onChange={handleRadioChange}
                        value="baseLanguage"
                        name="baseLanguage"
                        inputProps={{'aria-label': 'baseLanguage'}}/>}
                    label="base language"/>
                <FormControlLabel
                    value="secondLanguage"
                    control={<Radio
                        checked={selectedValue === 'secondLanguage'}
                        onChange={handleRadioChange}
                        value="secondLanguage"
                        name="secondLanguage"
                        inputProps={{'aria-label': 'secondLanguage'}}/>}
                    label="second language"/>

            </RadioGroup>
            <Paper className={classes.text} elevation={5}>
                {selectedValue === 'baseLanguage'
                    ? dictionary.translations[index].word
                    : dictionary.translations[index].translated}
            </Paper><br/>
            <Button className={classes.button} color="secondary" variant='contained' onClick={handleClick}>
                Next word
            </Button>
        </div>
    );
}

export default AskUser;