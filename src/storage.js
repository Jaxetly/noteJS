import { sendNotesToServer } from './api.js';

export const deleteNote = (state, deletableNote) => {
    let notes = state.notes;
    notes = notes.filter(note => note.title !== deletableNote.title || note.content !== deletableNote.content);
    state.notes = notes;
}

export const getNotesFromLocalStorage = () => {
	return JSON.parse(localStorage.getItem('notes')) || [];
};

export const setNotesToLocalStorage = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes));
}

export const getThemeFromStorage = () => {
    return localStorage.getItem('theme') || 'light';
}

export const setThemeToStorage = (theme) => {
	localStorage.setItem('theme', theme);
}