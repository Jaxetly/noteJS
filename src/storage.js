import { sendNoteToServer } from './api.js';

export const deleteNoteFromLocalStorage = (state, deletableNote) => {
    let notes = state.notes;
    notes = notes.filter(note => note.title !== deletableNote.title || note.content !== deletableNote.content);
    state.notes = notes;
    localStorage.setItem('notes', JSON.stringify(notes));
    sendNoteToServer(state.notes);
}

export const setNotesToLocalStorage = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes));
}

export const getThemeFromStorage = () => {
    return localStorage.getItem('theme') || 'light';
}