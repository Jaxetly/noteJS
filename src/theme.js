import { getThemeFromStorage, setThemeToStorage } from './storage.js';

import Watch from './melanke-watchjs.js';
const { watch } = Watch;

export const initTheme = (state) => {
    const btnLight = document.querySelector('.btn-light');
    const btnDark = document.querySelector('.btn-dark');

    btnLight.addEventListener('click', () => {
        state.theme = 'light';
    });

    btnDark.addEventListener('click', () => {
        state.theme = 'dark';
    });

    watch(state, 'theme', () => {
        setThemeToStorage(state.theme);
        document.documentElement.setAttribute('data-bs-theme', state.theme);

        if (state.theme === 'light') {
            btnLight.classList.add('hide');
            btnDark.classList.remove('hide');
        } else {
            btnDark.classList.add('hide');
            btnLight.classList.remove('hide');
        }
    });

    state.theme = getThemeFromStorage();
}