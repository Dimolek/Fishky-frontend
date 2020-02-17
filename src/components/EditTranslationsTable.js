import React from 'react';
import MaterialTable from 'material-table';

export default function EditTranslationsTable(props) {

    const [state, setState] = React.useState({
        columns: [
            {title: 'Word', field: 'word'},
            {title: 'Translated', field: 'translated'}
        ],
        data: props.dictionary.translations
    });

    const axios = require('axios').default;
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('Token');

    const saveNewTranslation = newData => {

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
            console.log(error);
        });
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
