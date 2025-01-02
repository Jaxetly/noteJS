import { renderNotes, renderError } from './render.js';

//POST запрос
export const sendNoteToServer = async (notes) => {
    try {
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

        const data = await response.json();
        console.log('Заметка успешно отправлена на сервер:', data);
    } catch (error) {
        console.error('Ошибка при отправке заметки на сервер:', error);
    }
}

const getRowNotesServer = async (notes) => {
    const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(notes),
    });

    if (!response.ok) {
        renderError('Network error');
        throw new Error('Network error');
    }
    return response.json();
}

export const getNoteFromServer = (state) => {
    getRowNotesServer(state.notes)
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