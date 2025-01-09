import { sendNotesToServer } from './api.js';

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