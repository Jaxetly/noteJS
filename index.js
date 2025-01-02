import { sendNoteToServer, getNoteFromServer } from '/src/api.js';
import { deleteNoteFromLocalStorage, setNotesToLocalStorage } from '/src/storage.js';
import { renderNotes, addNoteToDOM } from '/src/render.js';
import { initTheme } from '/src/theme.js';

const addFormListener = (state) => {
    const noteForm = document.getElementById('noteForm');
    const noteTitle = document.getElementById('noteTitle');
    const noteInput = document.getElementById('noteInput');

    noteForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = noteTitle.value;
        const content = noteInput.value;

        state.notes.push({ title, content });
        setNotesToLocalStorage(state.notes);
        addNoteToDOM(state, title, content);
        
        sendNoteToServer(state.notes); // Имитация отправки новых заметок на сервер

        noteTitle.value = '';
        noteInput.value = '';
    });
}

export const init = () => {
    let state = {
        notes: JSON.parse(localStorage.getItem('notes')) || [],
        theme: 'light',
    }

    addFormListener(state); //Обработчик события для формы
    
    getNoteFromServer(state); //Имитация получения данных с сервера, там и рендерим

    initTheme(state); //Светлая и темная тема
}