//POST запрос
const sendNoteToServer = async (notes) => {
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
};

const getNoteFromServer = async (state) => {
    try {
        const response = await fetch('https://httpbin.org/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state.notes),
        });

        if (!response.ok) {
            throw new Error('Network error');
        }
        const data = await response.json();
        state.notes = JSON.parse(data.data);
        console.log('Заметки успешно получены с сервера:', data);

        renderNotes(state); //Отрисовка
        return response;
    } catch (error) {
        renderNotes(state);
        console.error('Ошибка при получении заметок с сервер:', error);
    }
};

// Функция для загрузки заметок из LocalStorage
const loadNotes = (state) => {
    const notes = state.notes;
    notes.forEach(note => {
        addNoteToDOM(state, note.title, note.content);
    });
}

// Функция для рендеринга заметок
const renderNotes = (state) => {
    notesContainer.innerHTML = '';
    loadNotes(state);
}

// Функция для добавления заметки в DOM
const addNoteToDOM = (state, title, content) => {
    const noteText = document.createElement('div');
    noteText.className = 'pb-3';
    
    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title font-weight-bold';
    cardTitle.innerText = title;
    noteText.appendChild(cardTitle);

    const cardContent = document.createElement('p');
    cardContent.className = 'card-text m-0';
    const maxLength = 150; // Максимальная длина текста для отображения

    if (content.length > maxLength) {
        cardContent.innerHTML = content.substring(0, maxLength) + '...';
        
        const expandButton = document.createElement('button');
        expandButton.innerText = 'Развернуть';
        expandButton.className = 'btn btn-link align-center ps-0';
        noteText.appendChild(cardContent);
        noteText.appendChild(expandButton);

        let isExpanded = false; // Состояние развернутости

        expandButton.addEventListener('click', () => {
            if (isExpanded) {
                cardContent.innerHTML = content.substring(0, maxLength) + '...';
                expandButton.innerText = 'Развернуть';
            } else {
                cardContent.innerHTML = content; // Полный текст
                expandButton.innerText = 'Скрыть';
            }
            isExpanded = !isExpanded; // Переключаем состояние
        });
    } else {
        cardContent.innerHTML = content; // Полный текст, если он короткий
        noteText.appendChild(cardContent);
    }

    const buttons = document.createElement('div');
    buttons.className = 'd-flex row m-0';

    const editButton = document.createElement('button');
    editButton.className = 'btn btn-primary rounded-right-0 col-6';
    editButton.innerHTML = '<i class="bi bi-pencil"></i>';
    buttons.appendChild(editButton);

    editButton.addEventListener('click', () => {
        state.noteTitle.value = title;
        state.noteInput.value = content;
        deleteNoteFromLocalStorage(state, title);
        renderNotes(state);
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger rounded-left-0 col-6';
    deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
    buttons.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        if (confirm(`Вы точно хотите удалить заметку "${title}"?`)) {
            deleteNoteFromLocalStorage(state, title);
            renderNotes(state);
        }
    });

    const col = document.createElement('div');
    col.className = 'col-md-6 col-xl-4 mb-4';
    const card = document.createElement('div');
    card.className = 'card p-3 h-100 justify-content-between';

    card.appendChild(noteText);
    card.appendChild(buttons);
    col.appendChild(card);
    notesContainer.prepend(col);
}

// Функция для удаления заметки из LocalStorage
const deleteNoteFromLocalStorage = (state, title) => {
    let notes = state.notes;
    notes = notes.filter(note => note.title !== title);
    state.notes = notes;
    localStorage.setItem('notes', JSON.stringify(notes));
    sendNoteToServer(state.notes);
}

const addFormListener = (state) => {
    state.noteForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = state.noteTitle.value;
        const content = state.noteInput.value;

        state.notes.push({ title, content });
        localStorage.setItem('notes', JSON.stringify(state.notes));
        addNoteToDOM(state, title, content);
        
        sendNoteToServer(state.notes); // Имитация отправки новых заметок на сервер

        state.noteTitle.value = '';
        state.noteInput.value = '';
    });
}

const initTheme = (state) => {
    const btnLight = document.querySelector('.btn-light');
    const btnDark = document.querySelector('.btn-dark');

    state.theme = localStorage.getItem('theme') || 'light';
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

export const init = () => {
    let state = {
        notes: JSON.parse(localStorage.getItem('notes')) || [],
        noteForm: document.getElementById('noteForm'),
        notesContainer: document.getElementById('notesContainer'),
        noteTitle: document.getElementById('noteTitle'),
        noteInput: document.getElementById('noteInput'),
        theme: 'light',
    }

    addFormListener(state); //Обработчик события для формы
    
    getNoteFromServer(state); //Имитация получения данных с сервера, там и рендерим

    initTheme(state); //Светлая и темная тема    
}