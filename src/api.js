import { renderNotes, renderError } from './render.js';

//POST запрос
const rowNotesServer = async (notes) => {
    const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(notes),
    });

    if (!response.ok) {
        throw new Error('Network error');
    }

    return response.json();
}

export const sendNotesToServer = (state) => {
    rowNotesServer(state.notes)
        .then(data => {
            console.log('Заметки успешно отправлены на сервер:', data);
        })
        .catch(error => {
            renderError(`Ошибка при отправки заметок на сервер: ${error}`);
            console.log('Ошибка при отправки заметок на сервер:', error);
        });
}

export const getNotesFromServer = (state) => {
    rowNotesServer(state.notes)
        .then(data => {
            state.notes = JSON.parse(data.data);
            console.log('Заметки успешно получены с сервера:', data);
            renderNotes(state); // Отрисовка
        })
        .catch(error => {
            renderError(`Ошибка при получении заметок с сервера: ${error}`);
            console.log('Ошибка при получении заметок с сервера:', error);
        });
}