import { getThemeFromStorage } from './storage.js';

export const initTheme = (state) => {
    const btnLight = document.querySelector('.btn-light');
    const btnDark = document.querySelector('.btn-dark');

    state.theme = getThemeFromStorage();

    if (state.theme === 'dark') {
        btnDark.classList.add('hide');
        btnLight.classList.remove('hide');
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    }

    btnLight.addEventListener('click', () => {
        btnLight.classList.add('hide');
        btnDark.classList.remove('hide');

        document.documentElement.removeAttribute('data-bs-theme');
        localStorage.setItem('theme', 'light');
        state.theme = 'light';
    });

    btnDark.addEventListener('click', () => {
        btnDark.classList.add('hide');
        btnLight.classList.remove('hide');

        document.documentElement.setAttribute('data-bs-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        state.theme = 'dark';
    });
}