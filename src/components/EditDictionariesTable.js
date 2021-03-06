import React from 'react';
import MaterialTable from 'material-table';
import {toast} from 'react-toastify';
import Notify from "./Notify";

export default function EditDictionariesTable(props) {

    const [state, setState] = React.useState({
        columns: [
            {title: 'Name', field: 'name'},
            {title: 'Language', field: 'language'}
        ],
        data: props.dictionaries
    });

    const [errorMessages, setErrorMessages] = React.useState({
        'emptyName': '',
        'emptyLanguage': '',
    });

    const [currentDictionaryId, setCurrentDictionaryId] = React.useState(0);

    const axios = require('axios').default;
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('Token');

    const fieldsValid = (data, errs) => {
        let valid = true;
        let errorsCopy = errs;

        if (!data.name) {
            errorsCopy.emptyName = 'Name cannot be empty';
            valid = false;
        } else if(data.name.length > 45) {
            errorsCopy.emptyName = 'Name cannot be longer than 45 characters';
            valid = false;
        } else {
            errorsCopy.emptyName = '';
        }

        if (!data.language) {
            errorsCopy.emptyLanguage = 'Language cannot be empty';
            valid = false;
        } else if(data.language.length > 45) {
            errorsCopy.emptyLanguage = 'Language cannot be longer than 45 characters';
            valid = false;
        } else {
            errorsCopy.emptyLanguage = '';
        }

        setErrorMessages(errorsCopy);
        return valid;
    };

    const saveNewDictionary = newData => {

        if (fieldsValid(newData, errorMessages)) {
            axios.post("http://localhost:8080/addDictionary", {
                name: newData.name,
                language: newData.language,
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

    const deleteDictionary = oldData => {

        axios.post("http://localhost:8080/deleteDictionaryById", {
            id: oldData.id
        }).then(function (response) {
            if (currentDictionaryId === oldData.id) props.setTranslationsLoaded(false);
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    };

    const modifyDictionary = newData => {

        axios.put("http://localhost:8080/modifyDictionary", {
            id: newData.id,
            name: newData.name,
            language: newData.language,
            userId: newData.userId
        }).then(function (response) {
            if (currentDictionaryId === newData.id) props.setTranslationsLoaded(false);
            console.log(response.data, 'modify pierwszy then')
        }).catch(function (error) {
            console.log(error);
        });
    };

    const loadTranslations = dictionaryId => {

        props.setTranslationsLoaded(false);
        console.log(dictionaryId);

        axios.get("http://localhost:8080/findDictionaryById?id=".concat(dictionaryId))
            .then(function (response) {
                console.log(response.data);
                setCurrentDictionaryId(dictionaryId);
                props.setDictionary(response.data);
                props.setTranslationsLoaded(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <MaterialTable
            title="Your dictionaries"
            columns={state.columns}
            data={state.data}
            onRowClick={(e, r) => {
                loadTranslations(r.id);
            }}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            saveNewDictionary(newData);
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                modifyDictionary(newData);
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
                            deleteDictionary(oldData);
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
