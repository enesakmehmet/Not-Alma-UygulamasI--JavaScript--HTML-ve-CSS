// Not Alma Uygulaması
const noteInput = document.getElementById('note-input');
const addNoteBtn = document.getElementById('add-note-btn');
const notesContainer = document.getElementById('notes-container');

// LocalStorage'dan notları al
function getNotes() {
  const notes = localStorage.getItem('notes');
  return notes ? JSON.parse(notes) : [];
}

// LocalStorage'a notları kaydet
function saveNotes(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Notları sayfada görüntüle
function renderNotes() {
  const notes = getNotes();
  notesContainer.innerHTML = ''; // Mevcut içeriği temizle
  notes.forEach((note, index) => {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');

    const noteText = document.createElement('p');
    noteText.textContent = note;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Sil';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => {
      deleteNote(index);
    };

    noteElement.appendChild(noteText);
    noteElement.appendChild(deleteBtn);
    notesContainer.appendChild(noteElement);
  });
}

// Yeni not ekle
addNoteBtn.addEventListener('click', () => {
  const note = noteInput.value.trim();
  if (note) {
    const notes = getNotes();
    notes.push(note);
    saveNotes(notes);
    renderNotes();
    noteInput.value = ''; // Giriş alanını temizle
  } else {
    alert('Lütfen bir not yazın!');
  }
});

// Not sil
function deleteNote(index) {
  const notes = getNotes();
  notes.splice(index, 1); // Notu kaldır
  saveNotes(notes);
  renderNotes();
}

// Sayfa yüklendiğinde notları görüntüle
document.addEventListener('DOMContentLoaded', renderNotes);
