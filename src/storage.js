import { sendNotesToServer } from './api.js';

export const deleteNoteFromLocalStorage = (state, deletableNote) => {
    let notes = state.notes;
    notes = notes.filter(note => note.title !== deletableNote.title || note.content !== deletableNote.content);
    state.notes = notes;
    setNotesToLocalStorage(notes);
    sendNotesToServer(state.notes);
}

export const setNotesToLocalStorage = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes));
}

export const getThemeFromStorage = () => {
    return localStorage.getItem('theme') || 'light';
}

export const setThemeToStorage = (theme) => {
	localStorage.setItem('theme', theme);
}