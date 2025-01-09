import { deleteNoteFromLocalStorage } from './storage.js';

import Watch from './melanke-watchjs.js';
const { watch } = Watch;

const createExpandButton = (cardContent, content, maxLength) => {
    const expandButton = document.createElement('button');
    expandButton.innerText = 'Развернуть';
    expandButton.className = 'btn btn-link align-center ps-0';
    
    let isExpanded = false;
    expandButton.addEventListener('click', () => {
        if (isExpanded) {
            cardContent.innerHTML = content.substring(0, maxLength) + '...';
            expandButton.innerText = 'Развернуть';
        } else {
            cardContent.innerHTML = content;
            expandButton.innerText = 'Скрыть';
        }
        isExpanded = !isExpanded;
    });
    return expandButton;
}

const createNoteDOM = (title, content) => {
    const noteDOM = document.createElement('div');
    noteDOM.className = 'pb-3';
    
    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title font-weight-bold';
    cardTitle.innerText = title;
    noteDOM.appendChild(cardTitle);

    const cardContent = document.createElement('p');
    cardContent.className = 'card-text m-0';
    const maxLength = 150;

    if (content.length > maxLength) {
        cardContent.innerHTML = content.substring(0, maxLength) + '...';
        const expandButton = createExpandButton(cardContent, content, maxLength);
        noteDOM.appendChild(cardContent);
        noteDOM.appendChild(expandButton);
    } else {
        cardContent.innerHTML = content;
        noteDOM.appendChild(cardContent);
    }
    return noteDOM;
}

const createButton = (state, title, content) => {
    const buttons = document.createElement('div');
    buttons.className = 'd-flex row m-0';

    const editButton = document.createElement('button');
    editButton.className = 'btn btn-primary rounded-right-0 col-6';
    editButton.innerHTML = '<i class="bi bi-pencil"></i>';
    buttons.appendChild(editButton);

    editButton.addEventListener('click', () => {
        state.titleInput = title;
        state.noteInput = content;
        deleteNoteFromLocalStorage(state, {title, content});
        renderNotes(state);
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger rounded-left-0 col-6';
    deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
    buttons.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        if (confirm(`Вы точно хотите удалить заметку "${title}"?`)) {
            deleteNoteFromLocalStorage(state, {title, content});
            renderNotes(state);
        }
    });
    return buttons;
}

export const addNoteToDOM = (state, title, content) => {
    const notesContainer = document.getElementById('notesContainer');
    
    const noteDOM = createNoteDOM(title, content);
    const buttons = createButton(state, title, content);

    const col = document.createElement('div');
    col.className = 'col-md-6 col-xl-4 mb-4';
    const card = document.createElement('div');
    card.className = 'card p-3 h-100 justify-content-between';

    card.appendChild(noteDOM);
    card.appendChild(buttons);
    col.appendChild(card);
    notesContainer.prepend(col);
}

export const renderNotes = (state) => {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';

    state.notes.forEach(note => {
        addNoteToDOM(state, note.title, note.content);
    });
}

export const renderError = (errorMessage) => {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';

    const errorElement = document.createElement('div');
    errorElement.className = 'alert alert-danger col-12';
    errorElement.textContent = errorMessage;

    notesContainer.appendChild(errorElement);
}