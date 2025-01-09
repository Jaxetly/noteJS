import { sendNotesToServer, getNotesFromServer } from './api.js';
import { deleteNoteFromLocalStorage, setNotesToLocalStorage } from './storage.js';
import { renderNotes, addNoteToDOM } from './render.js';
import { initTheme } from './theme.js';

import Watch from './melanke-watchjs.js';
const { watch } = Watch;

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
        
        sendNotesToServer(state.notes); // Имитация отправки новых заметок на сервер

        state.titleInput = '';
        state.noteInput = '';
    });

    noteTitle.addEventListener('input', () => {
    	state.titleInput = noteTitle.value;
    });
    noteInput.addEventListener('input', () => {
    	state.noteInput = noteInput.value;
    });

    watch(state, 'titleInput', () => {
    	noteTitle.value = state.titleInput;
    });
    watch(state, 'noteInput', () => {
    	noteInput.value = state.noteInput;
    });
}

export const init = () => {
    let state = {
        notes: JSON.parse(localStorage.getItem('notes')) || [],
        theme: 'light',
        titleInput: "",
        noteInput: "",
    }

    addFormListener(state); //Обработчик события для формы
    
    getNotesFromServer(state); //Имитация получения данных с сервера, там и рендерим

    initTheme(state); //Светлая и темная тема
}

init();