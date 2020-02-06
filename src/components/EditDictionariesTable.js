import React from 'react';
import MaterialTable from 'material-table';

export default function EditDictionariesTable(props) {

    const [state, setState] = React.useState({
        columns: [
            {title: 'Name', field: 'name'},
            {title: 'Language', field: 'language'}
        ],
        data: props.dictionaries
    });

    const axios = require('axios').default;

    const saveNewDictionary = newData => {

        axios.post("http://localhost:8080/addDictionary", {
            name: newData.name,
            language: newData.language,
            userId: 2
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

    const loadTranslations = dictionaryId => {

        props.setTranslationsLoaded(false);
        console.log(dictionaryId);

        axios.get("http://localhost:8080/findDictionaryById?id=".concat(dictionaryId))
            .then(function (response) {
                console.log(response.data);
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
