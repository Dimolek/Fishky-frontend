import React from 'react';
import MaterialTable from 'material-table';
import Notify from "./Notify";
import {toast} from "react-toastify";

export default function EditTranslationsTable(props) {

    const [state, setState] = React.useState({
        columns: [
            {title: 'Word', field: 'word'},
            {title: 'Translated', field: 'translated'}
        ],
        data: props.dictionary.translations
    });

    const [errorMessages, setErrorMessages] = React.useState({
        'emptyWord': '',
        'emptyTranslation': '',
    });

    const fieldsValid = (data, errs) => {
        let valid = true;
        let errorsCopy = errs;

        if (!data.word) {
            errorsCopy.emptyWord = 'Word cannot be empty';
            valid = false;
        } else if(data.word.length > 45) {
            errorsCopy.emptyWord = 'Word cannot be longer than 45 characters';
            valid = false;
        } else {
            errorsCopy.emptyWord = '';
        }

        if (!data.translated) {
            errorsCopy.emptyTranslation = 'Translation cannot be empty';
            valid = false;
        } else if(data.translated.length > 45) {
            errorsCopy.emptyTranslation = 'Translation cannot be longer than 45 characters';
            valid = false;
        } else {
            errorsCopy.emptyTranslation = '';
        }

        setErrorMessages(errorsCopy);
        return valid;
    };

    const axios = require('axios').default;
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('Token');

    const saveNewTranslation = newData => {

        if (fieldsValid(newData, errorMessages)) {
            axios.post("http://localhost:8080/addTranslation", {
                word: newData.word,
                translated: newData.translated,
                dictionaryId: props.dictionary.id
            }).then(function (response) {
                setState(prevState => {
                    const data = [...prevState.data];
                    data.push(response.data);
                    return {...prevState, data};
                });
            }).catch(function (error) {
                Notify(toast.TYPE.ERROR, "Cannot save data");
                console.log(error);
            });
        } else {
            Object.values(errorMessages).forEach(val => {
                val.length > 0 && (Notify(toast.TYPE.ERROR, val));
            });
        }

    };

    const deleteTranslation = oldData => {

        axios.post("http://localhost:8080/deleteTranslationById", {
            id: oldData.id
        }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    };

    const modifyTranslation = newData => {

        axios.put("http://localhost:8080/modifyTranslation", {
            id: newData.id,
            word: newData.word,
            translated: newData.translated,
            dictionaryId: props.dictionary.id
        }).then(function (response) {
            console.log(response.data, 'modify pierwszy then')
        }).catch(function (error) {
            console.log(error);
        });
    };

    return (
        <MaterialTable
            title={props.dictionary.name}
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            saveNewTranslation(newData);
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                console.log(oldData, newData, 'stara i nowa');
                                modifyTranslation(newData);
                                setState(prevState => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return {...prevState, data};
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            deleteTranslation(oldData);
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return {...prevState, data};
                            });
                        }, 600);
                    }),
            }}
        />
    );
}
