document.addEventListener('DOMContentLoaded', function() {
    const addNoteButton = document.getElementById('add-note-button');
    const noteInput = document.getElementById('note-input');
    const notesContainer = document.getElementById('notes-container');

    addNoteButton.addEventListener('click', addNote);

    function addNote() {
        const noteText = noteInput.value.trim();
        if (noteText === '') {
            alert('Please enter a note.');
            return;
        }

        const note = {
            text: noteText,
            date: new Date().toLocaleString()
        };

        saveNoteToLocalStorage(note);
        displayNotes();
        noteInput.value = '';
    }

    function saveNoteToLocalStorage(note) {
        const notes = getNotesFromLocalStorage();
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function getNotesFromLocalStorage() {
        const notes = localStorage.getItem('notes');
        return notes ? JSON.parse(notes) : [];
    }

    function displayNotes() {
        notesContainer.innerHTML = '';
        const notes = getNotesFromLocalStorage();

        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'papper';
            noteElement.innerHTML = `
                <div class="note-date">${note.date}</div>
                <div class="note-text">${note.text}</div>
            `;
            notesContainer.appendChild(noteElement);
        });
    }

    displayNotes();
});
